import React, { useState } from 'react';
import UserAPI from '../api/UserAPI';
import { Redirect } from 'react-router-dom';
import { TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';

const SignupPage = () => {

  const [redirect, setRedicrect] = useState(false)


  const handleSignup = async (evt) => {
  
    evt.preventDefault()
    let userCredentials = {
      username: evt.target.username.value,
      password: evt.target.password.value,
      first_name: evt.target.first_name.value,
      last_name: evt.target.last_name.value,
      email: evt.target.email.value
    }
   
    let response = await UserAPI.signupUser(userCredentials)
    let data = await response.json()
    if (data.token) {
      setRedicrect(true)
    }
  }
  if (redirect) {
    return <Redirect to='/login'/>
  }

  return (
    <div>
      <div>
        <h1>Signup Page</h1>
        <br></br>
        <form onSubmit={handleSignup}>
          <div>
            <TextField 
            required 
            id="standard-required" 
            label="User Name" 
            type='text' 
            placeholder="username" 
            name='username'
            variant='outlined'
            />
          </div>
          <div>
            <TextField 
            required 
            id="standard-required" 
            label="Password" 
            type='password' 
            placeholder="password" 
            name='password'
            variant='outlined'
            />
          </div>
          <div>
            <TextField 
            required 
            id="standard-required" 
            label="First Name" 
            type='text' 
            placeholder="first name" 
            name='first_name'
            variant='outlined'
            />
          </div>
          <div>
            <TextField 
            required 
            id="standard-required" 
            label="Last Name" 
            type='text' 
            placeholder="last name" 
            name='last_name'
            variant='outlined'
            />
          </div>
          <div>
            <TextField 
            required 
            id="standard-required" 
            label="Email" 
            type='email' 
            placeholder="email" 
            name='email'
            variant='outlined'
            />
          </div>
          <br></br>
          <div>
          <Button variant='contained' color='primary' type='submit'>Sign Up</Button>
          </div>
        </form>
      </div>
    </div>
  )
};

export default SignupPage;