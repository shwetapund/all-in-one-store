import React, {useEffect, useState}from 'react'
import axios from "axios";
import './Login.css';
import Navbar from './../../components/Navbar/Navbar';
import { Link } from 'react-router-dom';

function Login() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const login = async ()=>{
    const response = await axios.post('/login',{
      email:email,
      password:password
    });

    alert(response?.data?.message);

    if(response?.data?.success){
      localStorage.setItem("user", JSON.stringify(response?.data?.data));
      window.location.href = "/";
    }
    
  }
  useEffect(()=>{
    const storageUser = JSON.parse(localStorage.getItem("user") || '{}');

    if(storageUser?.email){
      alert("You are already logged in!");
      window.location.href = "/";
    }
  }, [])


  return (
    <>
    <div>
      <Navbar/>
      <form className='login-container'>
        <h1 className='text-center'>Login</h1>
       
        <div>
          <label htmlFor='email'>Email : </label>
          <input
            type='email'
            id='email'
            className='form-control'
            placeholder='enter your Email'
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
     
        <div>
          <label htmlFor='password'>Password : </label>
          <input
            type='password'
            id='password'
            className='form-control'
            placeholder='enter your Password'
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>

        <button 
        type='button'
        className='btn login-btn'
        onClick={login}
        >Login</button>

        <p className='text-right'>
          <Link to="/signup">
          create a new account ?</Link>
        </p>
      </form>
     
    </div>
    </>
  )
}

export default Login
