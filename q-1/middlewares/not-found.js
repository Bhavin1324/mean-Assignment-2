const path = require('path');
const { StatusCodes } = require('http-status-codes')
const FileNotFound = (req, res) => {
    res.status(StatusCodes.NOT_FOUND).sendFile(path.join(__dirname, '../public/not-found.html'));

}
module.exports = FileNotFound;