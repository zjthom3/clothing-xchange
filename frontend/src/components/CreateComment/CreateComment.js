import React, { Component } from 'react'
import UserAPI from '../../api/UserAPI'
import Button from '@material-ui/core/Button';
import { TextField } from '@material-ui/core';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';


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
        <form onSubmit={this.handleSubmit}>
          <div>
            <TextField  
            id="standard-required" 
            label="Comment" 
            type='textarea' 
            placeholder="" 
            name='comment_content'
            variant='outlined'
            size='small'
            />
            <Button size='large' variant='contained' color="primary" type='submit'><ArrowUpwardIcon></ArrowUpwardIcon></Button>
          </div>
        </form>
      </div>
    )
  }
}

export default CreateComment