const {isUsernameExist,isEmailExist}=require("../services").authService

checkDuplicateUsernameOrEmail = async (req, res, next) => {
    try {
        let [isUsername, isEmail] = await Promise.all(
            [
                isUsernameExist(req.body.username),
                isEmailExist(req.body.email)
            ]
        )
        let res400 = (fieldName) => {
            return res.status(400).send({message: `Failed! ${fieldName} is already in use!`})
        }

        if (isUsername)
            return res400("Username")

        if (isEmail)
            return res400("Email")

        next();
    } catch (e) {
        return res.status(500).send({
            message: e
        })
    }
};

module.exports = {checkDuplicateUsernameOrEmail};

