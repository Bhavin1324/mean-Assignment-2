const router = require("express").Router();
const { getStudents } = require("../controllers/studentController");
router.route("/").get(getStudents);
module.exports = router;