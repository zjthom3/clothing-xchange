import React, { Component } from 'react'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import { Link } from 'react-router-dom'
import moment from 'moment'


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
  
  const dateFormat = (value, row, index) => {
    return moment(value).startOf('day').fromNow()
  }

  return (
    <div>
      <BootstrapTable data={props.posts} bordered={false}>
       <TableHeaderColumn width='200' isKey dataFormat={CellFormatter} dataField='title' filter={ { type: 'TextFilter', delay: 500 } } >Title</TableHeaderColumn>
        <TableHeaderColumn width='300' dataField='post_content' > Content </TableHeaderColumn>
        <TableHeaderColumn width='100' dataAlign='start' dataSort dataField='date_posted' dataFormat={dateFormat}> Posted </TableHeaderColumn>
      </BootstrapTable>
    </div>
  )
}

export default PostList