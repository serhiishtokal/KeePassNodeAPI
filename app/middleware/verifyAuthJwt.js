
const {getAccessTokenPayload} = require("../services/jwt.service");

verifyToken = (req, res, next) => {

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

const verifyAuthJwt = {
  verifyToken: verifyToken,
}
module.exports = verifyAuthJwt
