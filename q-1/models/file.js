const mongoose = require("mongoose");
const fileSchema = new mongoose.Schema({
    singleFile: {
        type: String
    },
    multiFiles: {
        type: Object
    }
}, { timestamps: true });
module.exports = mongoose.model("Files", fileSchema);