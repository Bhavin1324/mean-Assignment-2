const express = require('express');
const { renderDashboard, creatStudent, loginUser, renderLoginPage, renderInsert, renderSingleStudent } = require('../controllers/studentController');
const auth = require('../middlewares/auth');
const router = express.Router();

router.route('/dashboard').get(auth, renderDashboard);
router.route('/').get(renderLoginPage).post(loginUser);
router.route('/insert').get(renderInsert).post(auth, creatStudent);
router.route('/update/:id').get(auth, renderSingleStudent)

module.exports = router;
