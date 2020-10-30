const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

checkDuplicateUsernameOrEmail = (req, res, next) => {
//todo: take out this empty (email,username and password ) check
  if (!req.body.username){
    return res.status(400).send({
      message: "Failed! Username is empty!"
  })}
  if (!req.body.email){
    return res.status(400).send({
      message: "Failed! Email is empty!"
    })}
  if (!req.body.password){
    return res.status(400).send({
      message: "Failed! Password is empty!"
    })}
  if (!req.body.storeMethod){
    req.body.storeMethod='SHA512'
  }

//todo: create one method for username and password. Make like this 'where{ [username]:value}'
  //username
  User.findOne({
    where: {
      username: req.body.username
    }
  }).then(user => {
    if (user) {
      return res.status(400).send({
        message: "Failed! Username is already in use!"
      });

    }

    // Email
    User.findOne({
      where: {
        email: req.body.email
      }
    }).then(user => {
      if (user) {
       return  res.status(400).send({
          message: "Failed! Email is already in use!"
        });

      }

      next();
    });
  }).catch(e=>{
    return res.status(500).send({
      message: e
    });
  });
};

checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: "Failed! Role does not exist = " + req.body.roles[i]
        });
        return;
      }
    }
  }
  
  next();
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
  checkRolesExisted: checkRolesExisted
};

module.exports = verifySignUp;
