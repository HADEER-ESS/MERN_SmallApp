import React, { useState } from 'react';
import {MdCelebration} from "react-icons/md";
import { login , reset } from "../../Redux/features/authSlicer"
import {useNavigate} from "react-router-dom";
import {useDispatch , useSelector} from "react-redux";

const LoginScreen = () => {

  const [userData , setUserData] = useState({
    email : "",
    password : ""
  })

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {} = useSelector(state => state.auth)

  const onChange = (e) => {
    setUserData((prev) => ({
      ...prev ,
      [e.target.name] : e.target.value
    }))
  }

  const onSubmite = (e) => {
    e.preventDefault()
    
    const data = {
      email , password
    }

    dispatch(login(data))
    navigate("/")
  }

  const {email , password} = userData
  return (
    <>
      <div className='form_container'>
        <div className='form_header'>
          <h3>Welcome Back</h3>
          <MdCelebration id='login'/>
        </div>
        <form>
          <div className='form-container-field email'>
            <div>Email:</div>
            <input onChange={onChange} name='email' id='email' placeholder='User Email' value={email} type="text"/>
          </div>
          <div className='form-container-field password'>
            <div>Password:</div>
            <input onChange={onChange} name='password' id='password' placeholder='Password' value={password} type="password"/>
          </div>
        </form>
        <div className='button-container'>
          <button onClick={onSubmite} className='form-button'>Login</button>
        </div>
      </div>
    </>
  )
}

export default LoginScreen