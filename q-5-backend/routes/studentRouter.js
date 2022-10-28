const express = require('express');
const { getAllStudents, creatStudent, loginUser, getSingleStudent, updateStudent, deleteStudent } = require('../controllers/studentController');
const auth = require('../middlewares/auth');
const router = express.Router();
router.route('/').get(auth, getAllStudents).post(creatStudent);
router.route('/login').post(loginUser);
router.route('/:id').get(auth, getSingleStudent).patch(auth, updateStudent).delete(auth, deleteStudent);
module.exports = router;
