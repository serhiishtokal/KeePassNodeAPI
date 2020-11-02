const {isUsernameExist,isPasswordCorrect}=require("../services").authService

checkUserExist= async (req,res,next)=>{
    try{
        const {username}=req.body
        const isUserExist= await isUsernameExist(username)
        if(!isUserExist){
            return res.status(401).send({message: `Failed! User '${username}' not exist!`})
        }
        next()
    }
    catch (e) {
        return res.status(500).send({
            message: e
        })
    }
}

checkUserPassword=async (req,res,next)=>{
    const {username, password}=req.body
    const isPassCorrect= await isPasswordCorrect(username,password)

    if(!isPassCorrect){
        return res.status(401).send({message: `Failed! Incorrect password!`})
    }
    next()
}

module.exports={
    checkUserExist,
    checkUserPassword
}