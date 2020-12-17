import React, { Component } from 'react'
import { Form, Button } from 'react-bootstrap'
import UserAPI from '../api/UserAPI.js'
import { Redirect } from 'react-router'

class CreatePostPage extends Component {

  state = {
    redirect: false,
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const postObject = {
      title: event.target.title.value,
      image: event.target.image.value ? event.target.image.value : null,
      post_content: event.target.post_content.value,
      datetime: event.target.date.value,
      user: this.props.user.id
    }
    UserAPI.createPost(postObject)
      .then((response) => { this.setState({ redirect: true }) })
  }

  render() {

    const { redirect } = this.state
    if (redirect) {
      return <Redirect to = "/" />
    }

    return (
      <div>
        <h1>Create New Post</h1>
        <form onSubmit={this.handleSubmit}>
          <label>Title:</label>
          <input type='text' placeholder='' name='title'></input>
          <label>Image:</label>
          <input type='file' placeholder='' name='image'></input>
          <label>Content:</label>
          <input type='textarea' placeholder='' name='post_content'></input>
          <label>Date:</label>
          <input type='datetime-local' placeholder='' name='date'></input>
        
          <button type='submit'>Submit</button>
        </form>
      </div>
    )
  }
}

export default CreatePostPage