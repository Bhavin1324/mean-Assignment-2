const router = require("express").Router()
const { multerUpload } = require("../config/image.conf");
const { uploadMultipleFiles, uploadSingleFile } = require("../controllers/commonController");
router.get("/", (req, res) => {
    res.render("index", { err: "", res: "" });
})
router.route("/single").post(multerUpload.single("image"), uploadSingleFile);
router.route("/multi").post(multerUpload.array("images", 5), uploadMultipleFiles);

module.exports = router;