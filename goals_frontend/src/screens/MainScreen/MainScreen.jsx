import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import GoalsForm from "../../components/GoalsForm";
import GoalsList from "../../components/GoalsList";
import Spinner from "../../components/spinner";
import {reset , getGoals} from "../../Redux/features/goalsSlicer";


const MainScreen = () => {
  const {user} = useSelector(state => state.auth);
  const { goals, isLoading, isError, message } = useSelector(
    (state) => state.goal
  );
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(()=>{

    if(isError){
      console.log(message)
    }

    if(!user){
      navigate("/login")
    }

    dispatch(getGoals())

    return () => {
      dispatch(reset())
    }
  },[user , navigate , isError , message , dispatch])

  if(isLoading){
    return <Spinner/>
  }

  return (
    <div style={{width : "50%" , marginLeft:"auto" , marginRight:"auto"}}>
      <div  style={{textAlign:"center"}}>
        <h1>Welcome {user && user.name} 🤓</h1>
        <p style={{fontSize:22}}>Let's schedule your goals 👯‍♀️</p>
      </div>
      <GoalsForm/>
      <GoalsList goals={goals}/>
    </div>
  )
}

export default MainScreen;