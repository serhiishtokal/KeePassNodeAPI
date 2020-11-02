
const jwt = require('jsonwebtoken')
const {
    ACCESS_TOKEN_SECRET,
    ACCESS_TOKEN_LIFE,
    REFRESH_TOKEN_SECRET,
    REFRESH_TOKEN_LIFE
}=require('../config/crypt.config')

createAccessToken=(payload)=>{
    return jwt.sign(payload, ACCESS_TOKEN_SECRET, {
        algorithm: "HS256",
        expiresIn: ACCESS_TOKEN_LIFE
    })
}

createRefreshToken=(payload)=>{
    return jwt.sign(payload, REFRESH_TOKEN_SECRET, {
        algorithm: "HS256",
        expiresIn: REFRESH_TOKEN_LIFE
    })
}



module.exports={
    createAccessToken,
    createRefreshToken
}