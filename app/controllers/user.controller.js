//change master password

const {userService} = require("../services");
changePassword=async (req, res)=>{
    const oldPassword=req.body.oldPassword
    const newPassword=req.body.newPassword
    const masterUserId=req.body.masterUserId

    try{
        await  userService.changePassword(masterUserId,oldPassword,newPassword)
        return res.json({userId:masterUserId})
    }catch (e) {
        console.log(e)
        return  res.status(500).send(e.message);
    }
}
module.exports={changePassword}