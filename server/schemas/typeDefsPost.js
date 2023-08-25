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
  }

  type Mutation {
    createPost(postText: String!, postAuthor: String!): Post!
    deletePost(postId: ID!): String!
    addComment(postId: ID!, commentText: String!, commentAuthor: String!): Post!
    removeComment(postId: ID!, commentId: ID!): Post!
    likePost(postId: ID!): Post!
    dislikePost(postId: ID!): Post!
  }

  type Subscription {
    newPost: Post!
  }
`;

module.exports = typeDefs;
