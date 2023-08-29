import { gql } from '@apollo/client';

export const GET_POSTS = gql`
query GetPosts {
  getPosts {
    _id
    postAuthor
    postText
    createdAt
    likeCount
  }
}
`;

export const QUERY_USER = gql`
  query getUser ($_id: String) {
    user (_id: $_id) {
      _id
      username
      profilePic
      friends
      posts
    }
  }
`;