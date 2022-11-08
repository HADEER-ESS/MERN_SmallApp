import { useDispatch } from "react-redux";
import { deleteGoal } from "../Redux/features/goalsSlicer";




const GoalsList = ({goals}) => {
  const dispatch = useDispatch()

  return (
    <div className="goals_list">
      {goals.length > 0? (
        goals.map((item) => (
        <div key={item._id} className="goal-Container">
          <h5>Time: {new Date(item.createdAt).toLocaleString("en-US")}</h5>
          <h4>{item.title}</h4>
          <div className="delete_goal_container">
            <button onClick={(e) => {e.preventDefault(); dispatch(deleteGoal(item._id))}} type="submite" className="delete-goal">X</button>
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
