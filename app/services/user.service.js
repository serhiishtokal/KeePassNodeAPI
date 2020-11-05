const db = require("../models");
const User = db.user;

getUserId=async (username)=>{
    const user=await User.findOne({where: {username}})
    return user.user_id
}

module.exports={getUserId}