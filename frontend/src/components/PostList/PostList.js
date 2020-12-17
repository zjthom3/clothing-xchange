import React, { Component } from 'react'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import { Link } from 'react-router-dom'


function PostList(props) {
  
  let counter = -1

  const CellFormatter = (cell, row) => {
    // ITS ALL ONE BIG LOOP (T.T)
    let id = {}
   
    for(let i=0; i < props.posts.length; i++) {
      id[i] = props.posts[i].id
    }
    counter += 1
    return (<div><Link to={`/post/${id[counter]}`}>{cell}</Link></div>);
  }
    
  return (
    <div>
      <BootstrapTable data={props.posts}>
       <TableHeaderColumn isKey dataFormat={CellFormatter} dataSort dataField='title' width='150'> Title </TableHeaderColumn>
        <TableHeaderColumn dataField='post_content' width='150'> Content </TableHeaderColumn>
        <TableHeaderColumn dataField='date_posted' width='150'> Posted </TableHeaderColumn>
      </BootstrapTable>
    </div>
  )
}

export default PostList