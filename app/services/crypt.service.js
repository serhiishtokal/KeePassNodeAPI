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

genMD5=(data)=>{
    return crypto.createHash('md5').update(data).digest("hex");
}
//todo: transform master Password To MD5 on middleware layer


encryptAES=async (data,keyPassword,cryptInitVector)=>{
    const key= crypto.scryptSync(keyPassword, 'salt', 24)
    const cipher = crypto.createCipheriv('aes-192-cbc', key,cryptInitVector);
    let encrypted=  cipher.update(data,'utf8', 'hex');
    encrypted+=cipher.final('hex')
    return encrypted
}
decryptAES=async (data,keyPassword,cryptInitVector)=>{
    const key=await crypto.scryptSync(keyPassword, 'salt', 24)
    const decipher = crypto.createDecipheriv('aes-192-cbc', key, cryptInitVector);
    let decrypted = decipher.update(data, 'hex', 'utf8');
    decrypted += decipher.final('hex')
    return decrypted
}

getEncryptedPass=async (passwordToEncrypt, masterPassword, cryptInitVector) => {
    const md5Hash = genMD5(masterPassword)
    return await encryptAES(passwordToEncrypt, md5Hash, cryptInitVector)
}

getDecryptedPass=async (passwordToDecrypt,masterPassword,cryptInitVector)=>{
    const md5Hash=genMD5(masterPassword);
    return await decryptAES(passwordToDecrypt,md5Hash,cryptInitVector)
}

genInitialVector=async ()=>{
    return crypto.randomFillSync(new Uint8Array(16));
}

module.exports={
    genSalt,
    genHash,
    getEncryptedPass,
    getDecryptedPass,
    genInitialVector
}
