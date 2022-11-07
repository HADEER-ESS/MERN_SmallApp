import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getGoals , deleteGoal } from "../Redux/features/goalsSlicer";
import Spinner from "./spinner";



const GoalsList = () => {
  const { goals, isLoading, isError, message } = useSelector(
    (state) => state.goal
  );
  const dispatch = useDispatch()

  useEffect(()=>{
    if(isError){
        console.log(message)
    }
    dispatch(getGoals())
  },[isError , message , dispatch])

  if(isLoading){
    return <Spinner/>
  }
  return (
    <div className="goals_list">
      {goals.length > 0? (
        goals.map((item) => (
        <div key={item._id} className="goal-Container">
          <h5>Time: {new Date(item.createdAt).toLocaleString("en-US")}</h5>
          <h4>{item.title}</h4>
          <div className="delete_goal_container">
            <button onClick={(e) => {e.preventDefault(); dispatch(deleteGoal(item._id))}} type="button" className="delete-goal">X</button>
          </div>
        </div>
      ))
      ) : (
        <div style={{display:"flex" , justifyContent:"center"}}>
          <h2>No Goals, Let's create some 😉</h2>
        </div>
      )}
    </div>
  );
};

export default GoalsList;
