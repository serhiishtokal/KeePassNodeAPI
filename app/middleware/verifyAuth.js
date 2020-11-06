const {authService} = require("../services")
const {hasAccessToPassword} = require("../services").entryService


checkAccessToEntry = async (req, res, next)=>{
    const masterUserId=req.body.masterUserId
    const entryId=req.params.entryId
    let hasAccess
    try {
        hasAccess= await hasAccessToPassword(masterUserId,entryId)
    }catch (e) {
        return res.status(500).send(e.message)
    }
    if(hasAccess) next()
    else return res.status(403).send("Forbidden! Wrong access token")
}

checkOldPassword= async (req, res, next)=>{
    const oldPassword=req.body.oldPassword
    const masterUsername=req.body.masterUsername
    try {
        const isPasswordCorrect= await authService.isPasswordCorrect(masterUsername,oldPassword)
        if(!isPasswordCorrect) return  res.status(403).send("Forbidden! Wrong old password")
        next()
    }catch (e) {
        return res.status(500).send(e.message)
    }
}

module.exports={
    checkAccessToEntry,
    checkOldPassword
}
