const { verifySignUp,verifyReqHelper } = require("../middleware");
const controller = require("../controllers/auth.controller");



module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });


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
      // verifySignUp.checkRolesExisted
    ],
    controller.signup
  );
//todo: check username or password is empty
  app.post("/api/auth/signin", controller.signin);
};
