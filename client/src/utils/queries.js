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