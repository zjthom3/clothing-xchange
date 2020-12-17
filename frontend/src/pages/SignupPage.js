import React, { useState } from 'react';
import UserAPI from '../api/UserAPI';
import { Redirect } from 'react-router-dom';

const SignupPage = () => {

  const [redirect, setRedicrect] = useState(false)

  const handleSignup = async (evt) => {
    evt.preventDefault()
    let userCredentials = {
      username: evt.target.username.value,
      password: evt.target.password.value,
      first_name: evt.target.first_name.value,
      last_name: evt.target.last_name.value,
      street_name: evt.target.street_name.value,
      city: evt.target.city.value,
      state_prov: evt.target.state_prov.value,
      zip: evt.target.zip.value
    }
    console.log(userCredentials.first_name)
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
        <form onSubmit={handleSignup}>
          <label>UserName:</label>
          <input type='text' placeholder='username' name='username'></input>
          <label>Password:</label>
          <input type='password' placeholder='password' name='password'></input>
          <label>First Name:</label>
          <input type='text' placeholder='' name='first_name'></input>
          <label>Last Name:</label>
          <input type='text' placeholder='' name='last_name'></input>
          <label>Street:</label>
          <input type='text' placeholder='' name='street_name'></input>
          <label>City:</label>
          <input type='text' placeholder='' name='city'></input>
          <label>State/Province:</label>
          <input type='text' placeholder='' name='state_prov'></input>
          <label>Zip Code:</label>
          <input type='text' placeholder='' name='zip'></input>
          <button type='submit'>Sign Up</button>
        </form>
      </div>
    </div>
  )
};

export default SignupPage;