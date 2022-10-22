const router = require("express").Router()
const multer = require("multer")
const path = require("path")

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, path.join(__dirname, "../public/uploads/gallery"))
//     },
//     filename: function (req, file, cb) {
// if (file.mimetype !== "jpg" || file.mimetype !== "jpeg") {
//     cb(new Error("Invalid MimeType"))
// }
//             cb(null, Date.now() + "_" + file.originalname)
//     }
// })
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../public/uploads/profile"))
    },
    filename: function (req, file, cb) {
        console.log(file);
        if (file.mimetype !== "jpg" || file.mimetype !== "jpeg") {
            return cb("Invalid File Format")
        }
        cb(null, Date.now() + "_" + file.originalname)
    }
})

const upload = multer({ storage: storage })

router.get("/", (req, res) => {
    res.render("index")
})

//upload.array("file control name", number of max images)
router.post("/multipleUpload", upload.array("multipleImage", 3), (req, res) => {
    res.redirect("/")
})
router.post("/", upload.single("singleImage"), (req, res) => {
    res.redirect("/")
})

module.exports = router