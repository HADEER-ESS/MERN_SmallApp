import React, { useEffect, useState } from 'react';
import { login , reset } from "../../Redux/features/authSlicer"
import {useNavigate} from "react-router-dom";
import {useDispatch } from "react-redux";

const LoginScreen = () => {

  const [userData , setUserData] = useState({
    email : "",
    password : ""
  })

  const navigate = useNavigate()
  const dispatch = useDispatch()

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

  useEffect(()=>{
    dispatch(reset());
    // eslint-disable-next-line
  },[])

  const {email , password} = userData
  return (
    <>
      <div className='form_container'>
        <div className='form_header'>
          <h3>Welcome Back 🎉</h3>
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