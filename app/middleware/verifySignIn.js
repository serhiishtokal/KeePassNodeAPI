const {isUsernameExist, isPasswordCorrect} = require("../services").authService

checkUserExist = async (req, res, next) => {

    const {username} = req.body
    let isUserExist
    try {
        isUserExist = await isUsernameExist(username)
    } catch (e) {
        return res.status(500).send(e.message)
    }
    if (!isUserExist) {
        return res.status(401).send({message: `Failed! User '${username}' not exist!`})
    }
    next()
}

checkUserPassword = async (req, res, next) => {
    const {username, password} = req.body
    try {
        const isPassCorrect = await isPasswordCorrect(username, password)

        if (!isPassCorrect) {
            return res.status(401).send(`Failed! Incorrect password!`)
        }
        next()
    } catch (e) {
        return res.status(500).send(e.message)
    }
}

module.exports = {
    checkUserExist,
    checkUserPassword
}