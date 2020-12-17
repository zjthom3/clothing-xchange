import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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

    // console.log(this.props.user)

    return (
      <div>
        <br></br>
        {
          this.props.user 
          ?
          <div>
            <h3>Welcome {this.props.user.first_name}</h3>
            <br></br>
            <Link to='/new_post'>Create Post</Link>
            <br></br>
            <br></br>
            <PostList posts={this.state.posts}/>
          </div>
          :
          <div>
          Sign Up For Free And Trade Clothes With Our Users!
          </div>
            
        }
      </div>
    );
  }
};

export default HomePage;