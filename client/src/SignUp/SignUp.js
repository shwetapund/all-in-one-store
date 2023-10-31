import React, { useState } from 'react'
import "./SignUp.css";
function SignUp() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [address, setAddress] = useState('')
  const [gender, setGender] = useState('female')

  return (
    <div>
      <form  className='form-conatainer'> 
    
          <h1>SignUp</h1>

          <div  className='form-controll'>
            <label htmlFor='name'>Name : </label>
            <input
              id='name'
              type='text'
             
              placeholder='enter name'
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <br />
          <div>
            <label htmlFor='email'>Email : </label>
            <input
              id='email'
              type='email'
              placeholder='enter email'
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <br />
          <div>
            <label htmlFor='password'>Password : </label>
            <input
              id='password'
              type='text'
              placeholder='enter Password'
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <br />
          <div>
            <label htmlFor='address'>Address : </label>
            <input
              id='address'
              type='text'
              placeholder='enter Address'
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
              }}
            />
          </div>
          <br />
        
      </form>

    </div>
  )
}

export default SignUp
