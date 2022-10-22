const Students = require('../model/student');
const { StatusCodes } = require('http-status-codes');
const Cryptr = require('cryptr');
const { BadRequest, AlreadyExsit, UnAuthenticated } = require('../errors');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const cryptr = new Cryptr(process.env.CRYPTR_SECRET);

const getAllStudents = async (req, res) => {

    const data = await Students.find({});
    return res.status(StatusCodes.OK).json({ data: data, email: req.user });
}

const creatStudent = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new BadRequest("Invalid Login Credetials")
    }
    const userAlreadyExist = await Students.find({ email: email });
    if (!(_.isEmpty(userAlreadyExist))) {
        throw new AlreadyExsit("User is already registered");
    }
    const token = jwt.sign({ email: email }, process.env.JWT_SECRET, { expiresIn: "30d" });
    const encPassword = cryptr.encrypt(req.body.password);
    req.body.password = encPassword;

    //Check if student already exist or not
    const data = await Students.create(req.body);
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
    const token = jwt.sign({ id: new Date().getTime().toString(), email: email }, process.env.JWT_SECRET, { expiresIn: '30d' })
    res.status(StatusCodes.OK).json({ data: `User successfully logged in`, token: token })
}
module.exports = { getAllStudents, creatStudent, loginUser }