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


//   type Mutation {
//     addUser(username: String!, email: String!, password: String!): Auth
//     login(email: String!, password: String!): Auth
//     addThought(thoughtText: String!, thoughtAuthor: String!): Thought
//     addComment(
//       thoughtId: ID!
//       commentText: String!
//       commentAuthor: String!
//     ): Thought
//     removeThought(thoughtId: ID!): Thought
//     removeComment(thoughtId: ID!, commentId: ID!): Thought
//   }
`;

module.exports = typeDefs;
