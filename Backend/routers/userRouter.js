const express = require("express");
const {registUser , loginUser , getUser} = require("../controller/userController")
const router = express.Router();
const protect = require("../middleware/tokenMiddleware");


//Method :   POST registUser
//route :    api/user
//privacy :  Public (all can regist)
router.post("/" , registUser)


//Method :    POST loginUser
//route  :    api/user/login
//privacy:    Public  (check if user has account or not)
router.post("/login" , loginUser)


//Method  :   GET getUser
//route   :   api/user/getUser
//privacy :   Private
router.get("/getuser" , protect, getUser)


module.exports = router