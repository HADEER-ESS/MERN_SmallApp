const mongoose = require("mongoose");

const goalSchema = mongoose.Schema({
    
    title : {
        type : String,
        default : "no goal",
        require : true,
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        require : true,
        //ref hold linked model name
        ref: "User",
    }
},{
    timestamps : true
})

module.exports = mongoose.model("Goals",goalSchema)