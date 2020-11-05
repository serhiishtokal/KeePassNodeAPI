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

/**
 * Check tat value exist in request.
 *
 * @param {String[]} propertyNestedNamesArray The array of property's nested names.
 * @return {Function}
 */
checkInRequestDataExist=(propertyNestedNamesArray)=>(req, res, next)=>{
    let obj=req
    for (const propertyName of propertyNestedNamesArray) {
        if(isObjFieldEmpty(obj,propertyName)){
            return  res.status(400).send({
                message: `Failed! '${propertyName}' is empty!`
            })
        }
        obj=obj[propertyName]
    }
    next()
}


module.exports={
    checkInBodyFieldEmpty,
    checkInBodyObjFieldEmpty,
    checkInRequestDataExist
}