const Files = require("../models/file");
const uploadSingleFile = async (req, res) => {
    if (!req.file) {
        return res.render("index", { err: "Please select the files for upload", res: "" })
    }
    /* const data = await Files.create({ singleFile: `uploads/${req.file.filename}` })
    console.log(data); */
    res.render("index", { err: "", res: { path: `uploads/${req.file.filename}`, mark: "single" } })
}
const uploadMultipleFiles = async (req, res) => {
    if (req.files.length === 0) {
        return res.render("index", { err: "Please select the files for upload", res: "" });
    }
    let files = [];
    for (let file of req.files) {
        files.push(`uploads/${file.filename}`);
    }
    /* const data = await Files.create({ multiFiles: files });
    console.log(data); */
    res.render("index", { err: "", res: { path: files, mark: "multi" } });
}

module.exports = { uploadSingleFile, uploadMultipleFiles };