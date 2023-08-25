import { gql } from '@apollo/client';

export const CREATE_POST = gql`
    mutation createPost($postText: String!, $postAuthor: String!) {
        createPost(postText: $postText, postAuthor: $postAuthor) {
            _id
            postText
            postAuthor
            createdAt
        }
    }`