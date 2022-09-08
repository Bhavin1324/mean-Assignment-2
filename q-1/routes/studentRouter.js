const express = require('express');
const { getAllStudents, creatStudent } = require('../controllers/studentController');
const auth = require('../middlewares/auth');
const router = express.Router();
router.route('/').get(auth,getAllStudents).post(creatStudent);
module.exports = router;
