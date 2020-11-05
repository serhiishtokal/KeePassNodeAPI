const crypto = require("crypto");
const cryptConfig = require("../config/crypt.config")
const algorithm = 'aes-256-ctr';

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

encryptAES=async (content,secretKey)=>{
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
    const encrypted = Buffer.concat([cipher.update(content), cipher.final()]);
    return {
        iv: iv.toString('hex'),
        content: encrypted.toString('hex')
    };
}
decryptAES=async (content,secretKey,iv)=>{
    const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(iv, 'hex'));
    const decrypted = Buffer.concat([decipher.update(Buffer.from(content, 'hex')), decipher.final()]);
    return decrypted.toString();
}

encrypt=async (stringToEncrypt, passString) => {
    const md5Hash = genMD5(passString)
    return await encryptAES(stringToEncrypt, md5Hash)
}

decrypt=async (stringToDecrypt, passString, iv)=>{
    const md5Hash=genMD5(passString);
    return await decryptAES(stringToDecrypt,md5Hash, iv)
}


module.exports={
    genSalt,
    genHash,
    encrypt,
    decrypt
}
