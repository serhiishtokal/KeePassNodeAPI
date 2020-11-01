const {isUsernameExist}=require("../services").authService

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


}


module.exports={checkUserExist}