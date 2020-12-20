import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import UserAPI from '../api/UserAPI.js';
import PostList from '../components/PostList/PostList';


class MyPostPage extends Component {

  state = {
    posts: []
  }

  componentDidMount() {
    UserAPI.fetchPosts()
    .then((apiResponseJSON) => this.setState({
      posts: apiResponseJSON
    }))
  }

  render() {

    // const { title } = this.state.posts

    // console.log(this.state.posts)
    // console.log(this.props.user)

    return(
      <div>
        <div>
          { this.state.posts.map((post, index) => {
            if (post.user == this.props.user.id) {

              return <Link to={`/post/${post.id}`}> <h3 key={index}>{post.title}</h3></Link>
            };
          })}
        </div>
        
      </div>
    )
  }
}

export default MyPostPage;