const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Post {
    _id: ID!
    postText: String!
    postAuthor: String!
    createdAt: String!
    comments: [Comment]
    likes: [Like]
    dislikes: [Dislike]
    likeCount: Int!
    dislikeCount: Int!
  }

  type User {
    id: ID!
    username: String!
    profilePic: String
    friends: Int
    posts: Int
  }

  type Comment {
    _id: ID!
    commentText: String!
    commentAuthor: String
    createdAt: String
  }

  type Like {
    _id: ID!
    createdAt: String!
    username: String!
  }

  type Dislike {
    _id: ID!
    createdAt: String!
    username: String!
  }

  type Query {
    getPosts: [Post],
    getPost(postId: ID!): Post
    user: [User]
    post: [Post]
  }

  type Mutation {
    createPost(postText: String!, postAuthor: String!): Post!
    deletePost(postId: ID!): String!
    addComment(postId: ID!, commentText: String!): Post!
    removeComment(postId: ID!, commentId: ID!): Post!
    likePost(postId: ID!): Post!
    dislikePost(postId: ID!): Post!
    addUser(username: String!, email: String!, password: String!, profilePic: String!): User!
  }

  type Subscription {
    newPost: Post!
  }
`;

module.exports = typeDefs;
