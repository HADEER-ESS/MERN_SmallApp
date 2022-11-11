//import packages
const express = require("express");
const dotenv = require("dotenv").config();
const color = require("colors")
const {errorHandler} = require("./middleware/errorMiddleware");
const connectDB = require("./config/db")
const path = require("path");
//define port and get the variable in .env file
const port = process.env.PORT || 5000
//create an instance of express
const app = express()

//add middleware to read the input for update data
app.use(express.json()) //body parser for row json
app.use(express.urlencoded({extended : false})) //for urlencoded

//import router for goals that I have create
app.use("/api/goals" , require("./routers/goalsRouter"));
app.use("/api/user" , require("./routers/userRouter"));

//serve frontend
if(process.env.NODE_ENV === "production"){
    //set our static folder (will be the build folder)
    app.use(express.static(path.join(__dirname , "../goals_frontend/build")))

    //fire our route
    app.get("*" , (req , res) => res.sendFile(path.resolve(__dirname , "../" , "goals_frontend" , "build" , "index.html")))
}else{
    app.get("/" , (req , res) => res.send("please set the environment to production"))
}

connectDB()

app.use(errorHandler)
//at end set a lisnter
app.listen(port , ()=>console.log(`server is working in port ${port}`))