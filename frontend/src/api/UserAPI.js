const BASE_URL = 'http://127.0.0.1:8000/api/posts'

const login = async (userCredentials) => {
  let response = await fetch('http://localhost:8000/token-auth/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userCredentials)
  })
  return response
}

const getLoggedInUser = async (token) => {
  // console.log(token)
  let response = await fetch('http://localhost:8000/core/current_user/', {
    headers: {
      // 'Content-Type': 'application/json',
      'Authorization': `JWT ${token}`
    },
  })
  return response
}

const signupUser = async (userCredentials) => {
  let response = await fetch('http://localhost:8000/core/users/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userCredentials)
  })
  return response
}

const fetchPosts = () => {
  return fetch(`${BASE_URL}`).then((response) => response.json())
}

const createPost = (postObject) => {
  return fetch(`${BASE_URL}/`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(postObject)
  })
}

const fetchPostsByID = (postID) => {
  return fetch(`${BASE_URL}/${postID}/`).then((response) => response.json())
}

const fetchComments = (postID) => {
  return fetch(`${BASE_URL}/${postID}/comments`).then((response) => response.json())
}

const createComment = (postID, commentObject) => {
  return fetch(`${BASE_URL}/${postID}/comments/`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(commentObject)
  })
}

export default { login, getLoggedInUser, signupUser, fetchPosts, createPost, fetchPostsByID, fetchComments, createComment }