const {getAccessTokenPayload,getRefreshTokenPayload} = require("../services/jwt.service");

verifyAccessToken = (req, res, next) => {

  const accessToken=req.cookies.accessToken;
  if(!accessToken)
  {
    return res.status(403).send("Forbidden! Wrong access token")
  }
  //validate access token
  let payload
  try {
    payload=getAccessTokenPayload(accessToken)
  }catch (e){
    return res.status(400).send("Wrong token")
  }
  req.username=payload.username
  next()
};


verifyRefreshToken = (req, res, next) => {

  const refreshToken=req.cookies.refreshToken;
  if(!refreshToken)
  {
    return res.status(403).send("Forbidden! Wrong refresh token")
  }
  //validate access token
  let payload
  try {
    payload=getRefreshTokenPayload(refreshToken)
  }catch (e){
    return res.status(403).send("Forbidden! Wrong refresh token")
  }
  req.username=payload.username
  req.refreshToken=refreshToken
  next()
};

const verifyAuthJwt = {
  verifyAccessToken: verifyAccessToken,
  verifyRefreshToken
}
module.exports = verifyAuthJwt
