const {genHash,genSalt}=require('../services/crypt.service')
const db = require("../models");
const User = db.user;

createNewUser= async (user)=>{
    const salt = await genSalt(16);
    const isPassKeptAsSHA=!user.storeMethod||user.storeMethod==='SHA512';
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

isPasswordCorrect=async (username,password)=>{
    const user=await User.findOne({where: {username}})
    const passHash= await genHash(user.isPassKeptAsSHA)(password,user.salt_keyHMAC)
    return passHash===user.pass_SHA_HMAC
}

isDuplicateRecord = async (DbModel, dbFieldName, fieldValue) => {
    const count = await DbModel.count({
        where: {
            [dbFieldName]: fieldValue
        }
    })
    return count !== 0
}

isUsernameExist= async (username)=>{
     return await isDuplicateRecord(User,'username',username)
}

isEmailExist= async (email)=>{
    return await isDuplicateRecord(User,'email',email)
}

addTokenForUser = async (username, refreshToken)=>{
    try {
        await User.update(
            { refreshToken },
            { where: { username } }
        );
        return true
    } catch (err) {
        console.log(`Update refresh token for user ${username} failed!`, err)
        throw new Error(err)
    }
}

deleteRefreshToken=async (username)=>{
    try {
        await addTokenForUser(username,null)
    } catch (err) {
        console.log(`Delete refresh token for user ${username} failed!`, err)
        throw new Error(err)
    }
}


module.exports={
    createNewUser,
    isUsernameExist,
    isEmailExist,
    isPasswordCorrect,
    addTokenForUser,
    deleteRefreshToken
}