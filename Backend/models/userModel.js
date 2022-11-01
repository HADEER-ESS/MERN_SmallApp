const mongoose = require("mongoose");


const UserSchema = mongoose.Schema({
    name : {
        type : String,
        require : [true , "please eneter the name"],
    },
    email : {
        type : String,
        require : [true , "enter the email faild please"],
    },
    password : {
        type : String,
        require : true,
    }
},
{timestamps : true});


module.exports = mongoose.model("User" , UserSchema)