const jwt = require("jsonwebtoken");

function authentication(req,res,next) {
    const authHeader = req.headers.authorization;

    if(!authHeader){
        return res.status(401).json({
            msg:"Unauthorize"
        })
    }

    const token = authHeader.split(" ")[1];

    try{
        const decode = jwt.verify(token, process.env.SECURITYKEY);
        req.user = decode;
        next();
    }

    catch(err){
        return res.status(401).json({
            msg:"invalid or expireToken"
        })
    }
}

module.exports = authentication