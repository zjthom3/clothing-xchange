import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import UserAPI from '../api/UserAPI.js';
import PostList from '../components/PostList/PostList'


class HomePage extends Component {

  state = {
    posts: []
  }

  componentDidMount(){
    UserAPI.fetchPosts()
      .then((apiResponseJSON) => this.setState({
          posts: apiResponseJSON
      }))
  }
  
  render() {

    console.log(this.props.user)

    return (
      <div>
        Home Page
        {
          this.props.user 
          &&
          <div>
            Hi {this.props.user.first_name}
            <PostList posts={this.state.posts}/>
            <Link to='/new_post'>New Post</Link>
          </div>
        }
        {
          !this.props.isLoggedIn 
          ?
          <div>
            <div>
              <Link to='/login'>Login</Link>
            </div>
            <div>
              <Link to='/signup'>Signup</Link>
            </div>
          </div>
          :
          <button onClick={this.props.handleLogout}>Logout</button>
        }
      </div>
    );
  }
};

export default HomePage;