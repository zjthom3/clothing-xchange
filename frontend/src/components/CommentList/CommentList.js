import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import PostList from '../PostList/PostList'

// class CommentList extends Component {
//   render() {
//     const { articles } = this.props;
//     return (
//       <ListGroup>
//         { articles.map((article, index) => (
//           <ListGroupItem>
//             <ArticleTeaser { ...article } id={ index } />
//           </ListGroupItem>
//         ))}
//       </ListGroup>
//     );
//   }
// }

// export default CommentList;


// Functional solution:
// function ArticleList({ articles }) {
//   return (
//     <ListGroup>
//       {articles.map((article, index) => (
//         <ListGroupItem>
//           <ArticleTeaser {...article} id={ index + 1 } />
//         </ListGroupItem>
//       ))}
//     </ListGroup>
//   );
// }
