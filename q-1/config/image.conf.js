const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // console.log(file);
        cb(null, path.join(__dirname, "../public/uploads"));
    },
    filename: function (req, file, cb) {
        if (file.mimetype === "image/jpg" || file.mimetype === "image/png" || file.mimetype === "image/jpeg")
            cb(null, `${Date.now()}_${file.originalname}`);
        else
            cb(new Error("Invalid file format"));
    }
})
const multerUpload = multer({ storage: storage });
module.exports = { multerUpload }