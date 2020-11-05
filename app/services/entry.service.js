const {genInitialVector,getEncryptedPass} = require("./crypt.service")
const {TextDecoder,TextEncoder} = require('util')
const db = require("../models")

const Entry = db.entry
const User = db.user

/*
    *title
    * username
    * password
    * url
    * email
    * description
    * */
createNewEntry= async (entry,masterUserId,masterPassword)=>{
    const {title,username,url,password,description,email}=entry
    const encryptInitVector= await genInitialVector()

    const encryptedPass= await getEncryptedPass(password,masterPassword,encryptInitVector)
    const encryptInitString=new TextDecoder("utf-8").decode(encryptInitVector)
try {
    await Entry.create(
        {
            title: title,
            username: username,
            url: url,
            password: encryptedPass,
            cryptInitVector: encryptInitString,
            description: description,
            email: email,
            user_id:masterUserId
        }
    )
}catch (e){
    console.log(e)
    throw { message: e.message , code: 500};
}

}

getAllEntries=async (username)=>{
    return await Entry.findAll({
        include: [{
            model: User,
            where: { username: username }
        }]
    }).catch(err => {
        throw { message: err.message , code: 500};
    });
}


module.exports={
    createNewEntry,
    getAllEntries
}