const Students = require('../model/student');
const { StatusCodes } = require('http-status-codes');
const Cryptr = require('cryptr');
const BadRequest = require('../errors');
const jwt = require('jsonwebtoken');
const cryptr = new Cryptr(process.env.CRYPTR_SECRET);

const getAllStudents = async (req, res) => {
    
    const data = await Students.find({});
    return res.status(StatusCodes.OK).json({ data: data, decode: decode });
}

const creatStudent = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new BadRequest("Innvalid credetials")
    }
    const token = jwt.sign({ email:email }, process.env.JWT_SECRET, { expiresIn: "30d" });
    console.log(token)
    const encPassword = cryptr.encrypt(req.body.password);
    req.body.password = encPassword;
    const data = await Students.create(req.body);
    return res.status(StatusCodes.CREATED).json({ data: data, token: token });
}
module.exports = { getAllStudents, creatStudent }