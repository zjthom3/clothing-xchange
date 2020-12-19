import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import UserAPI from '../api/UserAPI.js';
import PostList from '../components/PostList/PostList'


class HomePage extends Component {

  state = {
    posts: [],
    userAddress: {}
  }

  componentDidMount(){
    UserAPI.fetchPosts()
      .then((apiResponseJSON) => this.setState({
        posts: apiResponseJSON
      }))

    UserAPI.fetchUserAddresses()
      .then((apiResponseJSON) => this.setState({
        userAddress: apiResponseJSON
    }))
  }
  
  render() { 

    // CONSOLE LOG HERE!!!!!!!
    // console.log(this.state)

    return (
      <div>
        <br></br>
        {
          this.props.user 
          ?
          <div>
            <h3>Welcome {this.props.user.first_name}</h3>
            <Link to='/user_address'>Create Address</Link>
            <br></br>
            <Link to='/new_post'>Create Post</Link>
            <br></br>
            <br></br>
            {/* POST LIST COMPONENT HERE */}
            <PostList userAddress={this.state.userAddress} user={this.props.user} posts={this.state.posts}/>
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