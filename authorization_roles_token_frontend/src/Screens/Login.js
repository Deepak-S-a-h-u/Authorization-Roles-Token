import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

import NavBar from './NavBar';

function Login() {
  const navigate=useNavigate();
  const[loginCredentials,SetLoginCredentials]=useState({})
    const ChangeHandler = (event) => {
      SetLoginCredentials({ ...loginCredentials, [event.target.name]: event.target.value });
      console.log(loginCredentials);
    }
  const LoginClick=()=>{
    axios.post("https://localhost:44395/api/Account/",loginCredentials).then((d) => {
      console.log(d.data)
      var token=d.data.token;
      localStorage.setItem("userToken",token);
      localStorage.setItem("User",d.data.role);
     
      navigate("/home");
    })
  }
 

  return (
    <div>
      <  NavBar/>
      <div class="card text-center">
  <div class="card-header">
    Login
  </div>
  <div class="card-body">
    <div>
    <lable>Username : </lable>
    <input type="text" name="userName" onChange={ChangeHandler} placeholder='Username'></input>
    </div>
    <div>
      
    <lable>Password : </lable>
    <input type="password" name="password" onChange={ChangeHandler} placeholder='Password'></input>
    </div>
  </div>
  <div class="card-footer text-muted">
  <button class="btn btn-primary" onClick={LoginClick}>Login</button>

  </div>
</div>
    </div>
  )
}

export default Login