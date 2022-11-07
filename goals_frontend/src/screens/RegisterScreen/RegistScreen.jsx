import React, { useEffect, useState } from 'react';
import {FaUser} from "react-icons/fa";
import { useDispatch , useSelector} from "react-redux";
import { useNavigate } from "react-router-dom";
import Spinner from '../../components/spinner';
import { register , reset } from "../../Redux/features/authSlicer";

const RegistScreen = () => {

  const [userData , setUserData] = useState({
    name : '',
    email : '',
    password : '',
    conf_password : ''
  })

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {user , isLoading , isError , isSuccess , message} = useSelector(state => state.auth)

  const { name , email , password , conf_password} = userData;

  useEffect(()=>{
    if(isError){
      console.log("error in error")
    }

    if(isSuccess || user){
      navigate("/")
    }

    dispatch(reset())

    // eslint-disable-next-line
  },[isError , isSuccess , user, message])

  const onChange = (e) => {
    setUserData((prev) => ({
      ...prev ,
      [e.target.name] : e.target.value
    }))
  }

  const sendData = (e) => {
    e.preventDefault();
    if(password !== conf_password){
      console.log("toast error")
    }else{
      const data = {
        name,
        email,
        password,
      }
      dispatch(register(data))
    }
    dispatch(reset())
  }

  if(isLoading){
    return(
      <Spinner/>
    )
  }

  return (
    <>
      <div className='form_container'>
        <div className='form_header'>
          <FaUser id='user'/>
          <h3>Create you account</h3>
        </div>
        <form>
          <div className='form-container-field name'>
            <div>Name:</div>
            <input onChange={onChange} name='name' id='name' placeholder='User Name' value={name} type="text"/>
          </div>
          <div className='form-container-field email'>
            <div>Email:</div>
            <input onChange={onChange}  name='email' id='email' placeholder='User Email' value={email} type="text"/>
          </div>
          <div className='form-container-field password'>
            <div>Password:</div>
            <input onChange={onChange}  name='password' id='password' placeholder='Password' value={password} type="password"/>
          </div>
          <div className='form-container-field confirm-password'>
            <div>Confirm Password</div>
            <input onChange={onChange}  name='conf_password' id='conf_password' placeholder='Confirm Password' value={conf_password} type="password"/>
          </div>
        </form>
        <div className='button-container'>
          <button onClick={sendData} type="button" className='form-button'>Regist</button>
        </div>
      </div>
    </>
  )
}

export default RegistScreen