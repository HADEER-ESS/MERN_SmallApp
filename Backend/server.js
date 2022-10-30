//import packages
const express = require("express");
const dotenv = require("dotenv").config();
const color = require("colors")
const {errorHandler} = require("./middleware/errorMiddleware");
const connectDB = require("./config/db")
//define port and get the variable in .env file
const port = process.env.PORT || 5000
//create an instance of express
const app = express()

//add middleware to read the input for update data
app.use(express.json()) //body parser for row json
app.use(express.urlencoded({extended : false})) //for urlencoded

//import router for goals that I have create
app.use("/api/goals" , require("./routers/goalsRouter"));
connectDB()

app.use(errorHandler)
//at end set a lisnter
app.listen(port , ()=>console.log(`server is working in port ${port}`))