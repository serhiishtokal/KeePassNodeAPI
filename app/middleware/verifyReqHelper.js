const {isObjFieldEmpty}=require('../services').objService

checkInBodyFieldEmpty=(fieldName)=>(req, res, next)=>{
    if(isObjFieldEmpty(req.body,fieldName)){
       return  res.status(400).send({
            message: `Failed! '${fieldName}' is empty!`
        });
    }
    next();
};

module.exports={
    checkInBodyFieldEmpty
}