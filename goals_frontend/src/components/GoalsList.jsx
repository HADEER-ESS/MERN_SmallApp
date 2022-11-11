import { useDispatch } from "react-redux";
import { deleteGoal } from "../Redux/features/goalsSlicer";

const GoalsList = ({goals}) => {
  const dispatch = useDispatch()

  return (
    <div className="goals_list">
      {goals.length > 0? (
        goals.map((item) => (
        <div key={item._id} className="goal-Container">
        <div className="delete_goal_container">
            <button onClick={(e) => {e.preventDefault(); dispatch(deleteGoal(item._id))}} type="submite" className="delete-goal">X</button>
          </div>
          <h5 style={{margin:0}}>{new Date(item.createdAt).toLocaleString("en-US")}</h5>
          <h4 style={{margin:12 , fontWeight:"bold" , fontSize:23}}>{item.title}</h4>
        </div>
      ))
      ) : (
        <div style={{display:"flex" , justifyContent:"center"}}>
          <h2>You have not set any goals 😉</h2>
        </div>
      )}
    </div>
  );
};

export default GoalsList;
