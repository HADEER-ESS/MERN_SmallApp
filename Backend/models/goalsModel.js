const mongoose = require("mongoose");

const goalSchema = mongoose.Schema({
    
    title : {
        type : String,
        default : "no goal",
        require : true,
    }
},{
    timeStamps : true
})

module.exports = mongoose.model("Goals",goalSchema)