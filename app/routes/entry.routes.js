const controller = require("../controllers/entries.controller");
const {verifyAuthJWT, verifyReqHelper} = require("../middleware");

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
        "/api/entry/addNew",
        [
            verifyAuthJWT.verifyAccessToken,
            verifyReqHelper.checkInBodyFieldEmpty('masterPassword'),
            verifyReqHelper.checkInBodyObjFieldEmpty("entry",'username'),
            verifyReqHelper.checkInBodyObjFieldEmpty("entry",'password'),
        ],
        controller.addNewEntry
    )

    app.post(
        "/api/password/getAll",
        [
            verifyAuthJWT.verifyAccessToken,
            verifyReqHelper.checkInBodyFieldEmpty('masterPassword'),
        ],
        controller.getAllEntries
    )

};
