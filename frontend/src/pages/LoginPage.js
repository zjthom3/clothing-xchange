import React from 'react';
import { Link, Redirect } from 'react-router-dom'

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
        <label>UserName:</label>
        <input type='text' placeholder='username' name='username'></input>
        <label>Password:</label>
        <input type='password' placeholder='password' name='password'></input>
        <button type='submit'>Submit</button>
      </form>
      <div>
        <Link to='/'>Home</Link>
      </div>
      <div>
        <Link to='/signup'>Signup</Link>
      </div>
    </div>
  )
}


export default LoginPage;