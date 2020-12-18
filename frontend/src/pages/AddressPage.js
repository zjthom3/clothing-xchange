import React, { Component } from 'react'
import UserAPI from '../api/UserAPI.js'
import { Redirect } from 'react-router'

class AddressPage extends Component {

  state = {
    redirect: false,
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const postObject = {
      street: event.target.street.value,
      city: event.target.city.value,
      state_prov: event.target.state_prov.value,
      zipcode: event.target.zipcode.value,
      user: this.props.user.id
    }
    UserAPI.createAddress(postObject)
      .then((response) => { this.setState({ redirect: true }) })
  }

  render() {

    console.log(this.props.user.id)

    const { redirect } = this.state
    if (redirect) {
      return <Redirect to = "/" />
    }

    return (

      <div>
        <h1>Create New Post</h1>
        <form onSubmit={this.handleSubmit}>
          <label>Street:</label>
          <input type='text' placeholder='' name='street'></input>
          <label>City:</label>
          <input type='text' placeholder='' name='city'></input>
          <label>State/Province:</label>
          <input type='text' placeholder='' name='state_prov'></input>
          <label>Zip Code:</label>
          <input type='text' placeholder='' name='zipcode'></input>
        
          <button type='submit'>Submit</button>
        </form>
      </div>
    )
  }
}

export default AddressPage
