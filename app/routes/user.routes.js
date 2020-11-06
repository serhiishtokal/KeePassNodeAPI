const controller = require("../controllers/user.controller");
const {verifyAuthJWT, verifyReqHelper,verifyAuth} = require("../middleware");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        )
        next()
    })


    /*title
    * username
    * password
    * url
    * description
    * masterPassword*/
    app.post(
        "/api/user/changePassword",
        [
            verifyAuthJWT.verifyAccessToken,
            verifyReqHelper.checkInRequestDataExist(['body','oldPassword']),
            verifyReqHelper.checkInRequestDataExist(['body','newPassword']),
            verifyAuth.checkOldPassword
        ],
        controller.changePassword
    )

};
