const crypto = require("crypto");
const cryptConfig = require("../config/crypt.config")


genSalt = async (saltRounds)=> await crypto.randomBytes(saltRounds).toString('hex');

genHashSHA512 = async (password,salt)=>{
    return crypto.createHash('sha512').update(password + salt + cryptConfig.PEPPER).digest('hex');
}

genHMAC= async (password,key)=>{
    return crypto.createHmac('sha512',key).update(password).digest('hex');
}

genHash=(isSHA)=>{
    if(isSHA){
        return  (password,salt)=>genHashSHA512(password, salt)
    }else {
        return  (password,key)=>genHMAC(password, key)
    }
}


module.exports={genSalt,genHash}
