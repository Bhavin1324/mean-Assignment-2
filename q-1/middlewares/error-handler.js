const { CustomAPIError } = require('../errors');
const { StatusCodes } = require('http-status-codes');
const customErrorhandler = (err, req, res, next) => {
    if (err instanceof CustomAPIError) {
        console.log("inside error")
        console.log(`Message ${err.message} StatusCode ${err.status}`)
        return res.status(err.status).json({ error: err.message })
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Internal Server Error`);
}
module.exports = customErrorhandler;
