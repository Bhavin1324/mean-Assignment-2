const Student = require("../models/student");
const getStudents = async (req, res) => {
    const data = await Student.find({});
    res.render("students", data);
}
module.exports = { getStudents };