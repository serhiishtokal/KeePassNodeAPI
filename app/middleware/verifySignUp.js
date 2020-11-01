const db = require("../models");
const User = db.user;

checkDuplicateUsernameOrEmail = async (req, res, next) => {
    try {
        let [isDubUsername, isDubEmail] = await Promise.all(
            [
                isDuplicate(User, 'username', req.body.username),
                isDuplicate(User, 'email', req.body.email),
            ]
        )
        let res400 = (fieldName) => {
            return res.status(400).send({message: `Failed! ${fieldName} is already in use!`})
        }

        if (isDubUsername)
            return res400("Username")

        if (isDubEmail)
            return res400("Email")

        next();
    } catch (e) {
        return res.status(500).send({
            message: e
        })
    }
};


isDuplicate = async (DbModel, dbFieldName, fieldValue) => {
    const count = await DbModel.count({
        where: {
            [dbFieldName]: fieldValue
        }
    })
    return count !== 0
}


const verifySignUp = {
    checkDuplicateUsernameOrEmail
};

module.exports = verifySignUp;

