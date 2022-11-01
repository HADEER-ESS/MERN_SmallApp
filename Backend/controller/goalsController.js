const asyncHandler = require("express-async-handler")
const Goals = require("../models/goalsModel");
const User = require("../models/userModel");

const getGoals = asyncHandler(async (req , res) =>{
    const goal = await Goals.find({user : req.user.id})
    if(!goal){
        res.status(400)
        throw new Error("There is no Data")
    }
    res.status(200).json(goal)
})

//POST Method
const createGoal = asyncHandler(async (req , res) => {
    const goal = await Goals.create({
        title : req.body.title,
        user : req.user.id
    });
    if(!goal){
        res.status(400);
        throw new Error("please enter a title")
    }
    res.status(200).json(goal)
})

//in update and delete goals, must check for user, who has ability to do those actions
const updateGoal = asyncHandler(async(req , res) => {
    const goal = await Goals.findById(req.params.id)
    if(!goal){
        res.status(400)
        throw new Error("there is no goals with this id")
    }

    //get user from protect autherization middleware
    const user = await User.findById(req.user.id)

    //check for user
    if(!user){
        res.status(401);
        throw new Error("User not found.");
    }
    //goal model composed of (title , user)
    //check if goals' user matches logged user account
    if(goal.user.toString() !== user.id){
        res.status(401);
        throw new Error("User not Autherized.");
    }

    const modifyGoal = await Goals.findByIdAndUpdate(req.params.id , req.body , {new : true})
    res.status(200).json(modifyGoal)
})

const deleteGoal = asyncHandler(async(req , res) => {
    const goal = await Goals.findById(req.params.id)

    if(!goal){
        res.status(400);
        throw new Error("The id not found");
    }

    const user = await User.findById(req.user.id)

    if(!user){
        res.status(401);
        throw new Error("User not found");
    }

    if(goal.user.toString() !== user.id){
        res.status(401);
        throw new Error("User not Autherized")
    }
    await goal.remove()
    res.status(200).json({id : req.params.id})
})

module.exports = {
    getGoals ,
    createGoal,
    updateGoal,
    deleteGoal
}

/*
to use mongoose, it returns promise, so we will use async/await and try/catch.
but we want to handle the error using our error handler for that
we will install package (express-async-handler)
to allow us to use our error handler
*/