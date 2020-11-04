
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

getPayload=(token,tokenSecret)=>{
    try {
        console.log(tokenSecret)
        console.log(token)
        // Parse the JWT string and store the result in `payload`.
        // Note that we are passing the key in this method as well. This method will throw an error
        // if the token is invalid (if it has expired according to the expiry time we set on sign in),
        // or if the signature does not match
        const payload = jwt.verify(token, tokenSecret)
        return payload
    } catch (e) {
        console.log("Wrong token ", token)
        throw new Error(e)
    }
}

getAccessTokenPayload= (accessToken)=>{
    return getPayload(accessToken, ACCESS_TOKEN_SECRET)
}

getRefreshTokenPayload=(refreshToken)=>{
    return getPayload(refreshToken, REFRESH_TOKEN_SECRET)
}


/*const token=jwt.sign({name:"aaaa"}, "qwerty", {
    algorithm: "HS256",
    expiresIn: "300s"
})

try{
    const payload=getPayload(token,"qwerty")
}catch (e){
    console.log(e)
}*/


module.exports={
    createAccessToken,
    createRefreshToken,
    getAccessTokenPayload,
    getRefreshTokenPayload
}