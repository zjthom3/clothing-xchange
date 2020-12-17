import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, NavItem, NavbarBrand, Nav, NavLink } from 'reactstrap';
import UserAPI from '../../api/UserAPI'

const AppNav = (props) => {

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
      }
    }
  }

  const handleLogout = async (evt) => {
    localStorage.setItem('auth-user', null)
    setIsLoggedIn(false)
    window.location.reload()
  }

  console.log(isLoggedIn)
  return (
    
    <Navbar color="dark" dark expand="md">
      <NavbarBrand href="/">Clothing X-Change</NavbarBrand>
        <Nav className="mr-auto" navbar>
          {
            !isLoggedIn
            ?
            <NavItem>
              <NavLink href="/login">Login</NavLink>
            </NavItem> 
            :
            <NavItem>
              <NavLink href='#' onClick={handleLogout}>Logout</NavLink>
            </NavItem>
          }
        </Nav>
        <NavLink href="/signup">Sign Up</NavLink>
    </Navbar>
  )
}

export default AppNav