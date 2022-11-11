const asyncHandler = require("express-async-handler")
const User = require("../models/userModel")
const JWT = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

//POST request
const registUser = asyncHandler(async(req , res) => {

    //get data from body and make sure all feilds are filled
    const {name , email , password} = req.body

    if(!name || !email || !password){
        res.status(400);
        throw new Error("please fill all fields")
    }

    //check if user is already exist
    const user = await User.findOne({email})

    if(user){
        res.status(400)
        throw new Error("the user is already exist")
    }
    
    //hashed password before create account in db
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password , salt)

    //otherwise create a new user account
    const createUser = await User.create({
        name,
        email,
        password : hashedPassword,
    })
    if(createUser){
        res.status(201)
        res.json({
            _id : createUser._id ,
            name : createUser.name ,
            email : createUser.email,
            token : generateTOKEN(createUser._id)
        })
    }else{
        res.status(400)
        throw new Error("invalid user data")
    }
})

//POST request
const loginUser = asyncHandler(async(req , res) => {
    //check the match of email and passowrd
    //get data from body
    const {email , password } = req.body

    //check for user email and if password is matches
    const user = await User.findOne({email})
                              //the password user put in field  //stored password
    if(user && (await bcrypt.compare(password , user.password))){
        res.json({
            _id : user._id ,
            name : user.name ,
            email : user.email,
            token : generateTOKEN(user._id)
        })
    }else{
        res.status(400)
        throw new Error("Invalid credentials")
    }
})

//GET request
const getUser = asyncHandler(async(req , res) => {

    const {id , name , email} = await User.findById(req.user.id);

    res.status(200).json({
        name,
        email,
        id 
    })
})

//Generate TOKEN
const generateTOKEN = (id) => {
    return JWT.sign({id} , process.env.JWT_SECRET , {expiresIn : '30d'})
}
module.exports = {
    registUser,
    loginUser,
    getUser
}