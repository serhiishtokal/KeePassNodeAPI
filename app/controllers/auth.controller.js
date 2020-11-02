const {createNewUser,addTokenForUser}= require('../services').authService
const {createAccessToken,createRefreshToken}=require("../services").jwtService

signUp = async (req, res) => {
    try {
        await createNewUser(req.body)
        res.send({ message: "User registered successfully!" });
    }catch (e) {
        res.status(500).send({message: e.message,});
    }
};

signIn=async (req, res)=>{
    const {username}=req.body

    const payload = {username}

    //create the access token with the shorter lifespan
    const accessToken = createAccessToken(payload)

    //create the refresh token with the longer lifespan
    const refreshToken = createRefreshToken(payload)

    try {
        await addTokenForUser(username,refreshToken)
    }
    catch (err){
        res.status(500).send({message: err.message,});
    }
    //send the access token to the client inside a cookie
    res.cookie("jwt", accessToken, {/*secure: true,*/ httpOnly: true})
    res.send("Successfully signed in!")
}

module.exports={
    signUp,
    signIn
}

// signIn = (req, res) => {
//     User.findOne({
//         where: {
//             username: req.body.username
//         }
//     })
//         .then(user => {
//             if (!user) {
//                 return res.status(404).send({ message: "User Not found." });
//             }
//
//             var passwordIsValid = crypto.compareSync(
//                 req.body.password,
//                 user.password
//             )
//
//             if (!passwordIsValid) {
//                 return res.status(401).send({
//                     accessToken: null,
//                     message: "Invalid Password!"
//                 })
//             }
//
//             var token = jwt.sign({ id: user.id }, config.secret, {
//                 expiresIn: 86400 // 24 hours
//             })
//
//             var authorities = [];
//             user.getRoles().then(roles => {
//                 for (let i = 0; i < roles.length; i++) {
//                     authorities.push("ROLE_" + roles[i].name.toUpperCase());
//                 }
//                 res.status(200).send({
//                     id: user.id,
//                     username: user.username,
//                     email: user.email,
//                     roles: authorities,
//                     accessToken: token
//                 })
//             })
//         })
//         .catch(err => {
//             res.status(500).send({ message: err.message });
//         })
// }