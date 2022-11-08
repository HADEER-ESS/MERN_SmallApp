import axios from "axios";
const goalsURL = "/api/goals/";

//create post using post request
const createGoal = async(data , token) => {

    const config = {
        headers : {
            Authorization : `Bearer ${token}`
        }
    }
    //console.log("data " , data) //it return the text i wrote
    const response =await axios.post(goalsURL , data , config)
    return response.data
}

//create a function to get the goals
const getGoals = async(token)=>{

    const config = {
        headers : {
            Authorization : `Bearer ${token}`
        }
    }

    const response = await axios.get(goalsURL,config)

    return response.data
}

//create a function the delete the goal
const deleteGoal = async(id , token) => {
    const config = {
        headers : {
            Authorization : `Bearer ${token}`
        }
    }

    const response = await axios.delete(goalsURL+id , config)
    return response.data
}
export const goalsService = {
    createGoal,
    getGoals,
    deleteGoal
}