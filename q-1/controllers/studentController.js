const Students = require('../model/student');
const { StatusCodes } = require('http-status-codes');
const Cryptr = require('cryptr');
const cryptr = new Cryptr(process.env.CRYPTR_SECRET);

const getAllStudents = async (req, res) => {
    //token portion ... -InProgress
    const data = await Students.find({});
    res.status(StatusCodes.OK).json({ data });
}

const creatStudent = async (req, res) => {
    const encPassword = cryptr.encrypt(req.body.password);
    req.body.password = encPassword;
    const data = await Students.create(req.body);
    res.status(StatusCodes.CREATED).json({ data });
}
module.exports = { getAllStudents, creatStudent }