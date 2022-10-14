const express = require('express');
const { getAllStudents, creatStudent, loginUser } = require('../controllers/studentController');
const auth = require('../middlewares/auth');
const router = express.Router();
router.route('/').get(auth, getAllStudents).post(auth, creatStudent);
router.route('/login').post(loginUser);
module.exports = router;
