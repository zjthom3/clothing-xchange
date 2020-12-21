import React from 'react';
import { Redirect } from 'react-router-dom'
import { TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';


const LoginPage = (props) => {

  if (props.isLoggedIn) {
    return (
      <Redirect to='/'/>
    )
  }

  return (
    <div>
      <h1>Login Page</h1>
      <form onSubmit={props.handleLogin}>
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
          <br></br>
        <Button variant='contained' color='primary' type='submit'>Submit</Button>
      </form>
    </div>
  )
}


export default LoginPage;