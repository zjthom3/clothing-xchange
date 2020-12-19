import React, { Component } from 'react'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import { Link } from 'react-router-dom'
import moment from 'moment'


function PostList(props) {

  let counter = -1

  const CellFormatter = (cell, row) => {

    // ITS ALL ONE BIG LOOP (T.T)
    let id = {}

    let city = {}
    let postUserID = {}

    for(let i=0; i < props.posts.length; i++) {
      id[i] = props.posts[i].id
      postUserID[i] = props.posts[i].user
      for (let j=0; j < props.userAddress.length; j++) {
        if (props.userAddress[j].user == postUserID[i]) {
            console.log(props.posts[i].title, props.userAddress[j].city)
            city[i] = props.userAddress[j].city
        }
          
        // city[props.userAddress[j].user] = props.userAddress[j].city
      }
    }

    console.log(city)
    // console.log(postUserID)

    counter += 1
    // PUT IN ADDRESS
    return (<div><Link to={`/post/${id[counter]}`}>{cell}</Link> <i>({ city[counter] })</i> </div>);
  }
  
  const dateFormat = (value, row, index) => {
    return moment(value).startOf('day').fromNow()
  }
  // console.log(props.posts)

  return (
    <div>
      <BootstrapTable data={ props.posts } bordered={false}>
       <TableHeaderColumn width='200' isKey dataFormat={CellFormatter} dataField='title' filter={ { type: 'TextFilter', delay: 500 } } >Title</TableHeaderColumn>
        <TableHeaderColumn width='300' dataField='post_content' > Content </TableHeaderColumn>
        <TableHeaderColumn width='100' dataAlign='start' dataSort dataField='date_posted' dataFormat={dateFormat}> Posted </TableHeaderColumn>
      </BootstrapTable>
    </div>
  )
}

export default PostList