//protect the userRouter to prevent access of user password and token
const JWT = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");


const protect = asyncHandler(async (req , res , next) => {

    //token is exist in header of HTTP request, in object called "autherization"
    //composed of [Bearer]" "[token]

    let token ;

    //check for token existance
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        try{
            //get token 
            token = req.headers.authorization.split(" ")[1];
            
            //verify token     //decode = payload in token (id)
            //decode object include (id , expire , iat)
            let decode = JWT.verify(token , process.env.JWT_SECRET);

            //get user id from token
            req.user = await User.findById(decode.id).select("-password");
            next()
        }catch(err){
            console.log("protected error " , err)
            res.status(401)
            throw new Error("not Autherized");
        }
    }
    if(!token){
        res.status(401);
        throw new Error("not Autherized , no Token")
    }
});



module.exports = protect