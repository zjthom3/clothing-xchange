import React, { Component, useState } from 'react'
import UserAPI from '../api/UserAPI.js'
import { Form, Button } from 'react-bootstrap'
import { Redirect } from 'react-router'
import CommentList from '../components/CommentList/CommentList'
import { ListGroup, ListGroupItem } from 'reactstrap'
import CreateComment from '../components/CreateComment/CreateComment.js'


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
    console.log(this.state.comments[5])
    console.log(this.state.user.username)

    const { redirect, refresh } = this.state
    if (redirect) {
      return <Redirect to='/'/>
    }
    
    const {title, post_content, image, date_posted, user} = this.state.post

    return (
      <div>
        <h2>{title}</h2>
        <h2>{post_content}</h2>
        <h2>{image}</h2>
        <h2>{date_posted}</h2>
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
                      <button onClick={() => {this.handlePostDelete(value.post, value.id)}}>Delete</button>
                      }
                      </p>

            })}
        </div>
        <CreateComment username={this.state.user.username} postID={this.props.match.params.postID}/>
        <br/>
        <br/>
        {
          this.state.user.id === this.state.post.user
          &&
        <div>
          <button onClick={() => {this.handleDelete(this.state.post.id)}}>Delete</button>
        </div>
        }
      </div>
    )
  }
}

export default PostPage