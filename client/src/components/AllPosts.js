import React from "react";
import { gql } from "@apollo/client";
import { useQuery, useMutation } from "@apollo/client";
import { GET_POSTS } from "../utils/queries";
// import like, dislike, and comment on posts mutations
import { LIKE_POST } from "../utils/mutations";
import { Link } from "react-router-dom";

const GET_POSTS1 = gql`
  query {
    posts {
      _id
      postAuthor
      postText
      createdAt
      likeCount
    }
  }
`;

export const PostFeed = () => {
  // import posts from db
  //   const { loading,error, data } = useQuery(GET_POSTS, {
  //     fetchPolicy: "no-cache",
  //   });

  const { loading, data } = useQuery(GET_POSTS1);

 // console.log("Post found" + data.posts);
  const posts = data?.posts || [];

  console.log("Posts loaded", posts);

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
        variables: { postId },
      });
      console.log("post liked");
    } catch (e) {
      console.log(e);
    }
  };

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
                    <Link to={`/postFeed/${post._id}`}>
                      <a className="user">{post.postAuthor}</a> posted on their
                      page
                    </Link>
                    <div className="date">
                      {/* include calculated date to render 3 days ago, etc below */}
                      {post.createdAt}
                    </div>
                  </div>
                  <div className="extra text">{post.postText}</div>
                  <div
                    className="meta"
                    onClick={(e) => handleLike(e, post._id)}
                  >
                    <a className="like">
                      <i className="teal heart icon"></i>
                      {post.likeCount}
                    </a>
                  </div>
                </div>
              </div>
            );
          })}

          {error && <div>{error.message}</div>}
        </div>
      )}
    </div>
  );
};
