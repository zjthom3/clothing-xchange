import React, { Component } from 'react'
import UserAPI from '../api/UserAPI.js'
import { Redirect } from 'react-router'
import CreateComment from '../components/CreateComment/CreateComment.js'
import moment from 'moment'
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';



class PostPage extends Component {
  state = {
    post: {},
    redirect: false,
    comments: [],
    user: [],
    refresh: false,
    userAddress: []
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
    UserAPI.getLoggedInUser(localStorage.getItem('auth-user')).then((response) => response.json()).then((user) => {
      this.setState({
        user: user
      })
    })
    UserAPI.fetchUserAddresses()
      .then((apiResponseJSON) => this.setState({
        userAddress: apiResponseJSON
    }))

  }
  
  
  render() {
    
    // CONSOLE LOG HERE!!!!!!!!!!!
    // console.log(this.state.post)

    const { title, post_content, image, date_posted, user } = this.state.post
    const { redirect } = this.state

    if (redirect) {
      return <Redirect to='/'/>
    }

    const useStyles = makeStyles((theme) => ({
      root: {
        flexGrow: 1,
      },
      paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      },
    }));
    
    
    
    return (
      <div className={useStyles.root}>
        <Grid container spacing={3}>
          {/* Title */}
          <Grid item xs={12}>
            <Paper className={useStyles.paper}> <p><i>Posted on {moment(date_posted).format('MMMM Do YYYY')}</i></p>
      
              <h3>{title} ({this.state.userAddress.map((value, index) => {
                if (value.user == user) {
                  return value.city
                  }
                })
              })
              </h3>
            
            </Paper> 
          </Grid>
          
          {/* POST CONTENT */}
          <Grid item xs={12} sm={4}>
            <Paper className={useStyles.paper}>
            <h3>{post_content}</h3>
            </Paper>
          </Grid>
          {/* COMMENTS */}
          <Grid item xs={12} sm={4}>
            {/* loops thru comments */}
            <Paper className={useStyles.paper}>
            {this.state.comments.map((value, index) => {
              
              return <p key={index}>
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
            <CreateComment username={this.state.user.username} postID={this.props.match.params.postID}/>
            </Paper>
          </Grid>
          {/* GOOGLE MAP */}
          <Grid item xs={12} sm={4}>
            {/* <Paper className={useStyles.paper}> */}
            <iframe
              width={400}
              height={400}
              frameborder={0} style={{border:0}}
              src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyAYSBV_aPK7t_266BK4D7Vf4LUUbdyk2t8&q=${this.state.userAddress.map((value, index) => {
                if (value.user == user) {
                  return `${value.city}, ${value.state_prov}`
                    }
                  })
              }`} allowfullscreen>
            </iframe>
            {/* </Paper> */}
          </Grid>
        
        
      
          {/* DELETE BUTTON FOR POST */}
          <Grid container justify='center'>
          {
            this.state.user.id === this.state.post.user
            &&
            <div>
              <Button variant="contained"
                      color="secondary"
                      startIcon={<DeleteIcon />} onClick={() => {this.handleDelete(this.state.post.id)}}>Delete Post</Button>
            </div>
          }
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default PostPage