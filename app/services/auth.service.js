const cryptService=require('../services/crypt.service')
const db = require("../models");
const User = db.user;

createNewUser= async (user)=>{
    // if(!isUserUnique(user.username))
    //     throw {message: "User already exist", code: 409}

    const salt = await cryptService.genSalt(16);
    const isPassKeptAsSHA=user.storeMethod==='SHA512';
    const passHash= await genHash(isPassKeptAsSHA)(user.password,salt)
    await User.create({
        username: user.username,
        email: user.email,
        pass_SHA_HMAC: passHash,
        salt_keyHMAC:salt,
        isPassKeptAsSHA:isPassKeptAsSHA
    }).catch(err => {
        throw { message: err.message , code: 500};
    });
}

genHash=(isSHA)=>{
     if(isSHA){
         return  (password,salt)=>cryptService.genHashSHA512(password, salt)
     }else {
         return  (password,key)=>cryptService.genHMAC(password, key)
     }
}


function isUserUnique (username) {
    return User.count({ where: { username: username } })
        .then(count => {
            return count === 0;
        });
}

module.exports={createNewUser}