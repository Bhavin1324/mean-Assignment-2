const { UnAuthenticated } = require("../errors");
const jwt = require("jsonwebtoken")
const auth = (req, res, next) => 
{
    try{
        const reqHeader = req.headers;
    if (!reqHeader || !reqHeader.authorization.startsWith('Bearer')) {
        throw new UnAuthenticated("Unauthenticated User");
    }
    token =  reqHeader.authorization.split(' ')[1];
    decode = jwt.verify(token,process.env.JWT_SECRET);
    next();
    }
    catch(err){
        console.log(err);
    }
    
}
module.exports = auth