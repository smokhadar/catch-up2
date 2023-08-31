import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_POSTS } from '../utils/queries';
// import like, dislike, and comment on posts mutations
import { LIKE_POST } from '../utils/mutations';
import { Link } from 'react-router-dom';
import { DELETE_POST } from '../utils/mutations';
import { Button } from 'semantic-ui-react';

export const PostFeed = () => {
    // import posts from db
    const { loading, data } = useQuery(GET_POSTS, {
        fetchPolicy: "no-cache"
    });
    const posts = data?.getPosts || [];
    const [deletePost] = useMutation(DELETE_POST);
    const [isDeleted, setIsDeleted] = useState(false); 
    const [likePost, { error }] = useMutation(LIKE_POST);

    // const handleChange = (event) => {
    //     const { postId } = event.target;
    // }

    // pass in username from auth
    // pass alert or message based on if liked or not 
    const handleLike = async (event, postId) => {
        event.preventDefault();
        console.log(postId);
        try {
            const { data } = await likePost({
                variables: {postId}
            });
            console.log('post liked');
        } catch(e) {
            console.log(e);
        }
    }
    const handleDeleteClick = async  ( event,postId) => {
        
        try {
            event.preventDefault();
          const { data } = await deletePost({
            variables: { _id:postId },
          });
    
          if (data && data.deletePost) {
            setIsDeleted(true);
           deletePost(postId);
            //onDeleteSuccess(postId);
          } else {
            console.error('Delete post failed');
          }
        } catch (error) {
          console.error(error);
        }
       
    }

    return (
        <div>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div className="ui feed">
                {posts.map((post) => {
                    return (
                    <div className="event post">
                        <div className="label">
                            {/* <img src={post.author.profilePic}/> */}
                        </div>
                        <div className="content">
                            <div className="summary">
                                <Link
                                to={`/postFeed/${post._id}`}
                                >
                                    <a className="user">
                                        {post.postAuthor}
                                    </a> &nbsp; posted on their page
                                </Link>
                                <div className="date">
                                    {/* include calculated date to render 3 days ago, etc below */}
                                    {post.createdAt}
                                </div>
                            </div>
                            <div className="extra text">
                                {post.postText}
                            </div>
                            <div>
                                <Button size='mini' color='red'  onClick={() => handleDeleteClick(post._id)}>Delete </Button>
                               
                            </div>

                            <div className="meta"
                            onClick={e => handleLike(e, post._id)}>
                                <a className="like">
                                    <i className="teal heart icon"></i>{post.likeCount}
                                </a>
                            </div>
                        </div>
                    </div>
                    );
                })}

                {error && (
                    <div>
                        {error.message}
                    </div>
                )}
             </div>
            )}
        </div>
    )
}