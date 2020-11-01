const createNewUser= require('../services/auth.service').createNewUser

signUp = async (req, res) => {
    try {
        await createNewUser(req.body)
        res.send({ message: "User registered successfully!" });
    }catch (e) {
        res.status(500).send({message: e.message,});
    }
};

module.exports={
    signUp
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