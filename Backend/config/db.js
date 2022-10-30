const mongoose = require("mongoose");

const connectDB = async() => {
    try{
        let conn = await mongoose.connect(process.env.MINCO_URI)
        console.log(`MongoDB connected ${conn.connection.host}`.bgCyan.underline)
    }catch(err){
        console.log(err);
        process.exit(1)
    }
}

module.exports = connectDB