const {createNewUser,addTokenForUser,deleteRefreshToken,isRefreshToken}= require('../services').authService
const {createAccessToken,createRefreshToken}=require("../services").jwtService
const {getUserId}=require("../services").userService

signUp = async (req, res) => {
    try {
        await createNewUser(req.body)
        res.json({ message: "User registered successfully!" });
    }catch (e) {
        res.status(500).json({message: e.message,});
    }
};

signIn=async (req, res)=>{
    const {username}=req.body
    const userId= await getUserId(username)
    const payload = {username,userId}


    //create the access token with the shorter lifespan
    const accessToken = createAccessToken(payload)

    //create the refresh token with the longer lifespan
    const refreshToken = createRefreshToken(payload)

    try {
        await addTokenForUser(username,refreshToken)
    }
    catch (err){
        res.status(500).json({message:"Signed in is unsuccessful!",error: err.message,});
    }
    //send the access token to the client inside a cookie
    res.cookie("accessToken", accessToken, {/*secure: true,*/ httpOnly: true})
    res.cookie("refreshToken",refreshToken,{/*secure: true,*/ httpOnly: true})
    res.send({message:"Successfully signed in!"})
}

signOut=async (req, res)=>{

    const username=req.username
    //delete refresh token from DB
    await deleteRefreshToken(username)
    //add access token to blocklist?
    //delete access token and refresh token from cookies
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    res.send({message:"Successfully signed out!"})
}

refreshAccessToken=async (req, res)=>{

    const username=req.username
    const refreshToken=req.refreshToken
    //check refresh token in DB
    try {
        const isValidRefreshToken= await isRefreshToken(username,refreshToken)
        if(!isValidRefreshToken){
            return res.status(403).send("Forbidden! Wrong refresh token")
        }
    }catch (err) {
        res.status(500).json({error: err});
    }


    const payload = {username}
    const accessToken = createAccessToken(payload)


    res.cookie("accessToken", accessToken, {/*secure: true,*/ httpOnly: true})
    res.send({message:"Access token successfully refreshed!"})
}



module.exports={
    signUp,
    signIn,
    signOut,
    refreshAccessToken
}