const {hasAccessToPassword} = require("../services").entryService;


checkAccessToPassword = async (req, res, next)=>{
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

module.exports={
    checkAccessToPassword
}
