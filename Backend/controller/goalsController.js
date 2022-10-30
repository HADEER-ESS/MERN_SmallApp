const asyncHandler = require("express-async-handler")
const Goals = require("../models/goalsModel");

const getGoals = asyncHandler(async (req , res) =>{
    const goal = await Goals.find()
    if(!goal){
        res.status(400)
        throw new Error("There is no Data")
    }
    res.status(200).json(goal)
})

const createGoal = asyncHandler(async (req , res) => {
    const goal = await Goals.create({title : req.body.title});
    if(!goal){
        res.status(400);
        throw new Error("please enter a title")
    }
    res.status(200).json(goal)
})

const updateGoal = asyncHandler(async(req , res) => {
    const goal = await Goals.findById(req.params.id)
    if(!goal){
        res.status(400)
        throw new Error("there is no goals with this id")
    }
    const modifyGoal = await Goals.findByIdAndUpdate(req.params.id , req.body , {new : true})
    res.status(200).json(modifyGoal)
})

const deleteGoal = asyncHandler(async(req , res) => {
    const goal = Goals.findById(req.params.id)
    if(!goal){
        res.status(400);
        throw new Error("The Id not found");
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