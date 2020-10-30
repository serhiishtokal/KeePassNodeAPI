const crypto = require("crypto");
const cryptConfig = require("../config/crypt.config")


genSalt = async (saltRounds)=> await crypto.randomBytes(saltRounds).toString('hex');

genHashSHA512 = async (password,salt)=>{
    return crypto.createHash('sha512').update(password + salt + cryptConfig.PEPPER).digest('hex');
}

genHMAC= async (password,salt)=>{
    return crypto.createHmac('sha512',salt).update(password).digest('hex');
}

module.exports={genSalt,genHashSHA512,genHMAC}
