import React, { Component } from 'react'
import UserAPI from '../api/UserAPI.js'
import { Redirect } from 'react-router'
import { TextField } from '@material-ui/core'
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';


class CreatePostPage extends Component {

  state = {
    redirect: false,
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const postObject = {
      title: event.target.title.value,
      // image: event.target.image.value ? event.target.image.value : null,
      post_content: event.target.post_content.value,
      // datetime: event.target.date.value,
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
          <div>
            <TextField 
            required 
            id="standard-required" 
            label="Title" 
            type='text' 
            placeholder="Title" 
            name='title'
            variant='outlined'
            />
          </div>
          <br></br>
          <div>
            <TextField
            id="outlined-multiline-static"
            label="Post Content"
            multiline
            rows={10}
            placeholder="Default Value"
            variant="outlined"
            name="post_content"
            />
          </div>
          <br></br>
          <div>
            <Button variant='contained' color='primary' type='submit'>Submit</Button>
          </div>
        </form>
      </div>
    )
  }
}

export default CreatePostPage