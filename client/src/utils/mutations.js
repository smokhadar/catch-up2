import { gql } from "@apollo/client";

export const CREATE_POST = gql`
  mutation createPost($postText: String!, $postAuthor: String!) {
    createPost(postText: $postText, postAuthor: $postAuthor) {
      _id
      postText
      postAuthor
      createdAt
    }
  }
`;

export const LIKE_POST = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      _id
      postText
      postAuthor
      likes {
        _id
        username
        createdAt
      }
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($postId: ID!, $commentText: String!) {
    addComment(postId: $postId, commentText: $commentText) {
      _id
      postText
      postAuthor
      createdAt
      comments {
        _id
        commentText
        commentAuthor
        createdAt
      }
    }
  }
`;
