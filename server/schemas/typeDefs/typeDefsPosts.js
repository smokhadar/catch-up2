const { gql } = require("apollo-server-express");

module.exports = gql`
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
    user: User!
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

  extend type Query {
    posts: [Post]
    post(postId: ID!): Post
  }

  extend type Mutation {
    createPost(postText: String!, postAuthor: String!): Post!
    deletePost(postId: ID!): String!
    addComment(postId: ID!, commentText: String!): Post!
    removeComment(postId: ID!, commentId: ID!): Post!
    likePost(postId: ID!): Post!
    dislikePost(postId: ID!): Post!
  }

  extend type Subscription {
    newPost: Post!
  }
`;
