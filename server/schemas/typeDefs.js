const { gql } = require('apollo-server-express');

const typeDefs = gql`
type Post {

}

type Comment {

}

type User {

}

type Query {
  user: [User]
  post: [Post]
}

type Mutation {
  addUser(username: String!, email: String!, password: String!, profilePic: String! ) 
}

`;

module.exports = typeDefs;
