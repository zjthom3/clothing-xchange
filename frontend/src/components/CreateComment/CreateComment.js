import React, { Component } from 'react'
import UserAPI from '../../api/UserAPI'

class CreateComment extends Component {

  state = {
    redirect: false
  }

  handleSubmit = (event) => {
    const postObject = {
      comment_content: event.target.comment_content.value,
      post: this.props.postID,
      user: this.props.username
    }
    UserAPI.createComment(this.props.postID, postObject)
      .then((response) => { this.setState({ redirect: true }) })
  }

  render() {

    // console.log(this.props.username)

    return(
      <div>
        <h1>Comment On Post</h1>
        <form onSubmit={this.handleSubmit}>
          <label>Comment: </label>
          <input type='textarea' placeholder='' name='comment_content'></input>
          <button type='submit'>Submit</button>
        </form>
      </div>
    )
  }
}

export default CreateComment