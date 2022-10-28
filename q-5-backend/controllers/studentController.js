const Students = require('../model/student');
const { StatusCodes } = require('http-status-codes');
const Cryptr = require('cryptr');
const { BadRequest, AlreadyExsit, UnAuthenticated, NotFound } = require('../errors');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const cryptr = new Cryptr(process.env.CRYPTR_SECRET);

const getAllStudents = async (req, res) => {
    const data = await Students.find({});
    return res.status(StatusCodes.OK).json({ data: { students: data, currentUser: req.user.name, currentEmail: req.user.email } });
}

const creatStudent = async (req, res) => {
    const { email, password, name } = req.body;
    if (!email || !password || !name) {
        throw new BadRequest("Insufficient registration credentials");
    }
    //Checking if student already exist or not
    const userAlreadyExist = await Students.find({ email: email });
    if (!(_.isEmpty(userAlreadyExist))) {
        throw new AlreadyExsit("User is already registered");
    }
    const encPassword = cryptr.encrypt(req.body.password);
    req.body.password = encPassword;

    const data = await Students.create(req.body);
    const token = jwt.sign({ id: data._id, email: email, name: name }, process.env.JWT_SECRET, { expiresIn: "30d" });
    return res.status(StatusCodes.CREATED).json({ data: data, token: token });
}

const loginUser = async (req, res) => {
    let { email, password } = req.body;
    if (!email || !password) {
        throw new BadRequest("Invalid Login Credetials")
    }
    const userAlreadyExist = await Students.find({ email: email });
    if (_.isEmpty(userAlreadyExist)) {
        throw new UnAuthenticated("Unregistered user trying to login");
    }
    const decExistPass = cryptr.decrypt(userAlreadyExist[0].password)
    if (!(userAlreadyExist[0].email === email && decExistPass === password)) {
        throw new BadRequest("Invalid email and password");
    }
    const token = jwt.sign({ id: userAlreadyExist[0]._id, email: email, name: userAlreadyExist[0].name }, process.env.JWT_SECRET, { expiresIn: '30d' })
    res.status(StatusCodes.OK).json({ data: { name: userAlreadyExist[0].name, email: userAlreadyExist[0].email }, token: token })
}

const getSingleStudent = async (req, res) => {
    const { id } = req.params;
    const data = await Students.findById({ _id: id });
    if (!data) {
        throw new NotFound("Unable to find student with id" + id);
    }
    return res.status(StatusCodes.OK).json({ data: { student: data } });
}

const updateStudent = async (req, res) => {
    const { id } = req.params;
    const { password } = req.body;
    req.body.password = cryptr.encrypt(password);
    const data = await Students.findOneAndUpdate({ _id: id }, req.body, { runValidators: true, new: true });
    if (!data) {
        throw new NotFound("Unable to find student with id" + id);
    }
    return res.status(StatusCodes.OK).json({ data: { students: data, performedBy: req.user.name, performedByEmail: req.user.email } });
}

const deleteStudent = async (req, res) => {
    const { id } = req.params;
    const data = await Students.findOneAndDelete({ _id: id });
    if (!data) {
        throw new NotFound("Unable to find student with id" + id);
    }
    return res.status(StatusCodes.OK).json({ data: { students: data, performedBy: req.user.name, performedByEmail: req.user.email } });
}
module.exports = { getAllStudents, creatStudent, loginUser, getSingleStudent, updateStudent, deleteStudent }