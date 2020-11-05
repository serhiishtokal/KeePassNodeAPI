const {isObjFieldEmpty}=require('../services').objService

checkInBodyFieldEmpty=(fieldName)=>(req, res, next)=>{
    if(isObjFieldEmpty(req.body,fieldName)){
       return  res.status(400).send({
            message: `Failed! '${fieldName}' is empty!`
        });
    }
    next();
};
checkInBodyObjFieldEmpty=(objName,inObjFieldName)=>(req, res, next)=>{
    if(isObjFieldEmpty(req.body[objName],inObjFieldName)){
        return  res.status(400).send({
            message: `Failed! '${inObjFieldName}' is empty!`
        });
    }
    next();
};


module.exports={
    checkInBodyFieldEmpty,
    checkInBodyObjFieldEmpty
}