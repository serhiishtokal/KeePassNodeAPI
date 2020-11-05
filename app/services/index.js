const authService=require("./auth.service")
const cryptService=require("./crypt.service")
const objService=require("./objService")
const jwtService=require("./jwt.service")
const entryService=require("./entry.service")
const userService=require("./user.service")

module.exports={
    authService,
    cryptService,
    objService,
    jwtService,
    entryService,
    userService
}