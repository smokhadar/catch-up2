import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_POSTS } from '../utils/queries';
// import like, dislike, and comment on posts mutations

export const PostFeed = () => {
    // import posts from db
    const { loading, data } = useQuery(GET_POSTS, {
        fetchPolicy: "no-cache"
    });
    const posts = data?.getPosts || [];

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
                            <div className="meta">
                                <a className="like">
                                    <i className="green heart icon"></i>{post.likeCount}
                                </a>
                            </div>
                        </div>
                    </div>
                    );
                })}
             </div>
            )}
        </div>
    )
}