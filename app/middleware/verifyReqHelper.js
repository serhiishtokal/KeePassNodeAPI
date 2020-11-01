isFieldEmpty=(obj,fieldName) => !obj[fieldName];

checkInBodyFieldEmpty=(fieldName)=>(req, res, next)=>{
    if(isFieldEmpty(req.body,fieldName)){
       return  res.status(400).send({
            message: `Failed! '${fieldName}' is empty!`
        });
    }
    next();
};



module.exports={checkInBodyFieldEmpty}