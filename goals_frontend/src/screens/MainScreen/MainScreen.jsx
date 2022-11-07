import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import GoalsForm from "../../components/GoalsForm";
import GoalsList from "../../components/GoalsList";


const MainScreen = () => {
  const user = useSelector(state => state.auth.user)
  const navigate = useNavigate()

  useEffect(()=>{
    if(!user){
      navigate("/login")
    }
  },[user , navigate])

  return (
    <div style={{width : "50%" , marginLeft:"auto" , marginRight:"auto"}}>
      <div  style={{textAlign:"center"}}>
        <h1>Welcome {user && user.name} 🤓</h1>
        <p style={{fontSize:22}}>Let's schedule your goals 👯‍♀️</p>
      </div>
      <GoalsForm/>
      <GoalsList/>
    </div>
  )
}

export default MainScreen;