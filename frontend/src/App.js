import './App.css';
import { BrowserRouter, Route } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import UserAPI from './api/UserAPI';
import CreatePostPage from './pages/CreatePostPage';
import PostPage from './pages/PostPage';
import AppNav from './components/Navbar/Navbar';
import 'bootstrap/dist/css/bootstrap.css';


function App() {

  const [user, setUser] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    getUser()
  }, [])

  const getUser = async () => {
    if (localStorage.getItem('auth-user') !== null) {
      let response = await UserAPI.getLoggedInUser(localStorage.getItem('auth-user'))
      let data = await response.json()
      if (data.username) {
        setIsLoggedIn(true)
        setUser(data)
      }
    }
  }

  const handleLogin = async (evt) => {
    evt.preventDefault()
    let userCredentials = {
      username: evt.target.username.value,
      password: evt.target.password.value
    }
    let response = await UserAPI.login(userCredentials)
    let data = await response.json()

    if (data.token) {
      localStorage.setItem('auth-user', data.token)
      setIsLoggedIn(true)
      setUser(data.user)
    }
  }

  const handleLogout = async (evt) => {
    evt.preventDefault()
    localStorage.setItem('auth-user', null)
    setIsLoggedIn(false)
    setUser(null)
  }

  // takes render on line 64 because of the component
  const renderLoginPage = () => {
    return (
      <LoginPage
        isLoggedIn={isLoggedIn}
        user={user}
        handleLogin={handleLogin}
        handleLogout={handleLogout}
      />
    )
  }

  const renderHomePage = () => {
    console.log(isLoggedIn)
    return (
      <HomePage
      handleLogout={handleLogout}
      user={user}
      isLoggedIn={isLoggedIn}
      />
    )
  }

  const renderCreatePostPage = () => {
    return (
      <CreatePostPage
      user={user}
      />
    )
  }

  return (
    <div className='App'>
      <BrowserRouter>
        <AppNav/>
        <Route exact path='/' render={renderHomePage}/>
        <Route exact path='/login' render={renderLoginPage}/>
        <Route exact path='/signup' component={SignupPage}/>
        <Route exact path='/new_post' render={renderCreatePostPage}/>
        <Route exact path='/post/:postID' component={PostPage}/>
      </BrowserRouter>
    </div>
  );
}

export default App;
