const {entryService} = require("../services");



//add new
/*title
    * username
    * password
    * email
    * url
    * description
    * */
addNewEntry=async (req, res)=>{
    const masterUserId=req.body.masterUserId
    const masterPassword=req.body.masterPassword

    try {
        const entryId=await entryService.createNewEntry(req.body.entry,masterUserId,masterPassword)
        res.json({entryId})
    }
    catch (e) {
        console.log(e)
       return  res.status(500).send(e.message);
    }


    res.send({message:"Entry added successfully"})
}
//get all entries
getAllEntries=async (req,res)=>{
    const masterUserId=req.body.masterUserId
    const entries= await entryService.getAllEntries(masterUserId)
    res.send({entries})
}


//get pass by id
getEncryptedPass=async (req,res)=>{
    const entryId=req.query.entryId
    const masterPassword=req.body.masterPassword
    const decryptedPass=await entryService.getDecryptedPass(entryId,masterPassword)
    res.json({decryptedPass})
}

module.exports={
    addNewEntry,
    getAllEntries,
    getEncryptedPass
}
//