import React from 'react';

export const PostFeed = () => {
    // import posts from db

    return (
        <div className="ui feed">
            {posts.map((post) => (
                <div className="event post">
                    <div className="label">
                        <img src={post.author.profilePic}/>
                    </div>
                    <div className="content">
                        <div className="summary">
                            <a className="user">
                                {post.author}
                            </a>posted on their page
                            <div className="date">
                                {/* include calculated date to render 3 days ago, etc below */}
                                {post.createdAt}
                            </div>
                        </div>
                        <div className="extra text">
                            {post.body}
                        </div>
                        <div className="meta">
                            <a className="like">
                                <i className="like icon"></i>{post.likes}
                            </a>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}