import React, { Component } from 'react'
import UserAPI from '../api/UserAPI.js'
import { Redirect } from 'react-router'
import CreateComment from '../components/CreateComment/CreateComment.js'
import moment from 'moment'
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';




class PostPage extends Component {
  state = {
    post: {},
    redirect: false,
    comments: [],
    user: [],
    refresh: false,
  }

  handleDelete = (postID) => {
    const requestOption = {
      method: 'DELETE'
    };
    fetch(`http://127.0.0.1:8000/api/posts/${postID}`, requestOption).then((response) => {this.setState({redirect: true})})
  };

  handlePostDelete = (postID, commentID) => {
    const requestOption = {
      method: 'DELETE'
    };
    fetch(`http://127.0.0.1:8000/api/posts/${postID}/comments/${commentID}`, requestOption).then((response) => {
      window.location.reload()
    })
  }

  componentDidMount() {

    const id = this.props.match.params.postID

    UserAPI.fetchComments(id).then((comments) => this.setState({
      comments: comments
    }))
    UserAPI.fetchPostsByID(id).then((post) => this.setState({
      post: post
    }))

    // MAY USE THIS CODE LATER. NEED TO GET LIST OF USERS TO ATTACH THE USERID TO THE USERID ON POST
    // NEED TO GET LIST OF USERS SOMEHOW...THIS WAY IS COOL, BUT NOT WHAT WE NEED

    // UserAPI.getLoggedInUser(localStorage.getItem('auth-user')).then((response) => {
    //   this.setState({
    //     user: user.json()
    //   })
    // })

    UserAPI.getLoggedInUser(localStorage.getItem('auth-user')).then((response) => response.json()).then((user) => {
      this.setState({
        user: user
      })
    })

  }
  
  
  render() {
    
    // CONSOLE LOG HERE!!!!!!!!!!!
    // console.log(this.state.user)

    const { redirect } = this.state
    if (redirect) {
      return <Redirect to='/'/>
    }
    
    const { title, post_content, image, date_posted } = this.state.post

    return (
      <div>
        <h3>{title}</h3>
        <h3>{post_content}</h3>
        <h3>{image}</h3>
        <p><i>Posted on {moment(date_posted).format('MMMM Do YYYY')}</i></p>
        <hr/>
        <div>
         {/* loops thru comments */}
            {this.state.comments.map((value, index) => {
              
              return <p 
                      key={index}>
                      <i>{value.user}</i>:
                      "{value.comment_content}"
                      {/* REGISTERS DELETE BUTTON FOR USER WHO POSTED THE COMMENT */}
                      {
                        this.state.user.username === value.user
                        &&
                      <IconButton aria-label="delete" onClick={() => {this.handlePostDelete(value.post, value.id)}}><DeleteIcon fontSize='small'/></IconButton>
                      }
                      </p>

            })}
        </div>
        <CreateComment username={this.state.user.username} postID={this.props.match.params.postID}/>
        <br/>
        <br/>
        {/* DELETE BUTTON FOR POST */}
        {
          this.state.user.id === this.state.post.user
          &&
        <div>
          <Button variant="contained"
                  color="secondary"
                  startIcon={<DeleteIcon />} onClick={() => {this.handleDelete(this.state.post.id)}}>Delete Post</Button>
        </div>
        }
      </div>
    )
  }
}

export default PostPage