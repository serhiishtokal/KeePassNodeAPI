const {verifySignUp, verifyReqHelper, verifySignIn} = require("../middleware");
const controller = require("../controllers/auth.controller");


module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        )
        next()
    })


    /*const reqb={
      username: "",
      email: "",
      password: "",
      storeMethod: "SHA512 || HMAC"
  }*/
    app.post(
        "/api/auth/signup",
        [
            verifyReqHelper.checkInBodyFieldEmpty('username'),
            verifyReqHelper.checkInBodyFieldEmpty('email'),
            verifyReqHelper.checkInBodyFieldEmpty('password'),
            verifyReqHelper.checkInBodyFieldEmpty('storeMethod'),
            verifySignUp.checkDuplicateUsernameOrEmail,
        ],
        controller.signUp
    )
//todo: login by email or login
// todo: add function for check array of fields ( with 'or' || 'and' attributes)

    // {
    //     username,
    //     password
    // }
    app.post(
        "/api/auth/signin",
        [
            verifyReqHelper.checkInBodyFieldEmpty('username'),
            verifyReqHelper.checkInBodyFieldEmpty('password'),
            verifySignIn.checkUserExist,
            verifySignIn.checkUserPassword
        ],
        controller.signIn)
}
