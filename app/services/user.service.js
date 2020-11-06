const {getAllEntries} = require("./entry.service")

const db = require("../models");
const {encrypt} = require("./crypt.service");
const {genHash} = require("./crypt.service");
const {genSalt} = require("./crypt.service");
const {decrypt} = require("./crypt.service");
const User = db.user;
const Entry = db.entry;

getUserId = async (username) => {
    const user = await User.findOne({where: {username}})
    return user.user_id
}

changePassword = async (userId, oldPassword, newPassword) => {
    try {
        //updateUserPassword
        const user = await User.findOne({where: {user_id: userId}})
        const salt = await genSalt(16);
        const passHash = await genHash(user.isPassKeptAsSHA)(newPassword, salt)

        await User.update(
            {
                pass_SHA_HMAC: passHash,
                salt_keyHMAC: salt
            },
            {where: {user_id: userId}}
        );
        //get all entries from db for user
//get passwords, iv and ids
        const entries = await getAllEntries(userId, ['entry_id', 'password', 'cryptInitVector'])

        //decrypt all passwords
        //encrypt all passwords
        const newEntries = await Promise.all(entries.map((async entry => {
            const password = await decrypt(entry.password, oldPassword, entry.cryptInitVector)
            const {content, iv} = await encrypt(password, newPassword)
            return {
                password:content,
                cryptInitVector:iv,
                entry_id:entry.entry_id
            }
        })))

        let promises=[];
        //add to database
        for (const entry of newEntries){
            promises.push(Entry.update(
                {
                    password:entry.password,
                    cryptInitVector:entry.cryptInitVector
                },
                {where: {entry_id: entry.entry_id}}
            ))
        }
        await Promise.all(promises)
        return true
    } catch (err) {
        console.log(err)
        throw new Error(err.message)
    }
}


module.exports = {getUserId,changePassword}