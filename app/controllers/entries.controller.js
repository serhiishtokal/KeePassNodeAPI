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
        await entryService.createNewEntry(req.body.entry,masterUserId,masterPassword)
    }
    catch (err) {
       return  res.status(500).send({error: err});
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

module.exports={
    addNewEntry,
    getAllEntries
}
//