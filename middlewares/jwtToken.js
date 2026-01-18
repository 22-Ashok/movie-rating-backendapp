const jwt = require("jsonwebtoken");

function tokenGen(data){
    const token = jwt.sign(data,process.env.SECURITYKEY,{expiresIn:'7d'})
    return token;
}

module.exports = tokenGen