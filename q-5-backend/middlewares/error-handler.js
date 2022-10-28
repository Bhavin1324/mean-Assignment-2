const { CustomAPIError } = require('../errors');
const { StatusCodes } = require('http-status-codes');
const customErrorhandler = (err, req, res, next) => {
    if (err instanceof CustomAPIError) {
        return res.status(err.statusCode).json({ error: err.message })
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ data: { error: `Internal server error` } });
}
module.exports = customErrorhandler;
