const express = require('express');
const { getAllStudents, creatStudent } = require('../controllers/studentController');
const router = express.Router();
router.route('/').get(getAllStudents).post(creatStudent);
module.exports = router;
