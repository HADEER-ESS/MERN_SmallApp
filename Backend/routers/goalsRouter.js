//import express and functions fron controller
const express = require("express");
const {getGoals , createGoal , updateGoal , deleteGoal} = require("../controller/goalsController");
const protect = require("../middleware/tokenMiddleware")
//create instance
const router = express()

//to manage thing we can put all functions in one place called controller and import them here.
// router.get("/" , (req , res)=>{
//     res.status(200).json({message : "get goals"})
// })

/*more simple*/
//router.get("/" , getGoals)

// router.post("/" , (req , res) => {
//     res.status(200).json({message : "create goal"})
// })

/*more simple*/
//router.post("/" , createGoal)

// router.put("/:id" , (req , res) => {
//     res.status(200).json({message : `update goal ${req.params.id}`})
// })

/*more simple*/
//router.put("/:id" , updateGoal)

// router.delete("/:id" , (req , res) => {
//     res.status(200).json({message : `delete goal ${req.params.id}`})
// })

/*more simple*/
//router.delete("/:id" , deleteGoal)

//to simplify it much more 
router.route("/").get(protect, getGoals).post(protect, createGoal)
router.route("/:id").put(protect, updateGoal).delete(protect, deleteGoal)

//export
module.exports = router;