import React from 'react';

// Import the `useParams()` hook
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { QUERY_SINGLE_POST }  from '../utils/queries';

const SinglePost = () => {
    const { postId } = useParams();

    const { loading, data } = useQuery(QUERY_SINGLE_POST, {
        fetchPolicy: "no-cache",
        variables: { postId: postId },
    });

    const post = data?.getPost || {};

    if (loading) {
        return <div>Loading...</div>
    }

    return (
      <div>
        <h3>{post.postAuthor}</h3>
        <p>{post.createdAt}</p>
        <p>{post.postText}</p>
      </div>
    );
}

export default SinglePost;