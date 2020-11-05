const db = require("../models")
const {decrypt,encrypt} = require("./crypt.service");

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
createNewEntry = async (entry, masterUserId, masterPassword) => {
    const {title, username, url, password, description, email} = entry
    try {
        const {content,iv} = await encrypt(password, masterPassword)
        const entry =await Entry.create(
            {
                title: title,
                username: username,
                url: url,
                password: content,
                cryptInitVector: iv,
                description: description,
                email: email,
                user_id: masterUserId
            }
        )
        return entry.entry_id
    } catch (e) {
        console.log(e)
        throw new Error(e.message)
    }

}

getAllEntries = async (userId) => {
    try{
        return await Entry.findAll({
            where: {
                user_id: userId
            }
        })
    }catch (e) {
        console.log(e)
        throw new Error(e.message)
    }
}

getDecryptedPass = async (entryId, masterPassword) => {
    try{
        const entry = await Entry.findByPk(entryId)
        const encryptedPass = entry.password
        const iv = entry.cryptInitVector
        return  await decrypt(encryptedPass, masterPassword,iv)
    }catch (e){
        console.log(e)
        throw new Error(e.message)
    }
}

hasAccessToPassword=async (userId, entryId)=>{
    try{
        const entry = await Entry.findByPk(entryId)
        return  entry.user_id===userId
    }catch (e){
        console.log(e)
        throw new Error(e.message)
    }
}

module.exports = {
    createNewEntry,
    getAllEntries,
    getDecryptedPass,
    hasAccessToPassword
}