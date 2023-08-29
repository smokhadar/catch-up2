const { gql } = require('apollo-server-express');

const typeDefsUser = gql`


type User {
  id: ID!
  username: String!
  profilePic: String
  friends: Int
  posts: Int
}

type Query {
  user: [User]
  post: [Post]
}

type Mutation {
  addUser(username: String!, email: String!, password: String!, profilePic: String! ) 
}

`;

module.exports = typeDefsUser;
