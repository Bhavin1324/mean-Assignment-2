const jwt = require("jsonwebtoken")
const { UnAuthenticated } = require("../errors");
const auth = (req, res, next) => {
    const reqHeader = req.headers;
    if (!reqHeader || !reqHeader.authorization.startsWith('Bearer')) {
        throw new UnAuthenticated("Unauthenticated User");
    }
    token = reqHeader.authorization.split(' ')[1];
    try {

        decode = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decode.email;
        next();
    }

    catch (err) {
        console.log(err);
        throw new UnAuthenticated("Unauthenticated user")
    }

}
module.exports = auth