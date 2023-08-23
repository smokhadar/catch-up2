const { gql } = require('apollo-server-express');

const typeDefs = gql`

  type Post {
    _id: ID
    postText: String
    postAuthor: String
    createdAt: String
    comments: [Comment]!
  }

  type Comment {
    _id: ID
    commentText: String
    commentAuthor: String
    createdAt: String
  }

  


`;

module.exports = typeDefsPost;
