const CustomAPIError = require("./custom-error");
const { StatusCodes } = require('http-status-codes');
class UnAuthenticated extends CustomAPIError {
    constructor(message) {
        super(message)
        this.status = StatusCodes.UNAUTHORIZED;
    }
}
module.exports = UnAuthenticated;