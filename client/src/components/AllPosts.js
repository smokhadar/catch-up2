import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_POSTS } from '../utils/queries';
// import like, dislike, and comment on posts mutations
import { LIKE_POST } from '../utils/mutations';

export const PostFeed = () => {
    // import posts from db
    const { loading, data } = useQuery(GET_POSTS, {
        fetchPolicy: "no-cache"
    });
    const posts = data?.getPosts || [];

    const [likePost, { error }] = useMutation(LIKE_POST);

    // const handleChange = (event) => {
    //     const { postId } = event.target;
    // }

    // pass in username from auth
    const handleLike = async (event, postId) => {
        try {
            event.preventDefault();
            const { data } = await likePost({
                variables: {_id: postId}
            });
            console.log('post liked');
        } catch(e) {
            console.log(e);
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
                                <a className="user">
                                    {post.postAuthor}
                                </a> posted on their page
                                <div className="date">
                                    {/* include calculated date to render 3 days ago, etc below */}
                                    {post.createdAt}
                                </div>
                            </div>
                            <div className="extra text">
                                {post.postText}
                            </div>
                            <div className="meta"
                            onClick={() => handleLike(post._id)}>
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