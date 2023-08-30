import React from "react";
import "./style.css";

import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";

import CommentList from "../../components/commentList/index";
import CommentForm from "../../components/commentForm/index";
import DeleteButton from "../../components/DeleteButton";

import { LIKE_POST } from "../../utils/mutations";
import { QUERY_SINGLE_POST } from "../../utils/queries";

const SinglePost = () => {
  const { postId } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_POST, {
    fetchPolicy: "no-cache",
    variables: { postId: postId },
  });

  const post = data?.getPost || {};

  const [likePost, { error }] = useMutation(LIKE_POST);

  const handleLike = async (event, postId) => {
    try {
      event.preventDefault();
      const { data } = await likePost({
        variables: { _id: postId }
      });
      console.log("post liked");
    } catch(e) {
      console.log(e);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="event post">
      <div className="label">{/* <img src={post.author.profilePic}/> */}</div>
      <div className="content">
        <div className="summary">
          <a className="user">{post.postAuthor}</a>
          <p className="posted">posted on their page</p>
          <div className="date">{post.createdAt}</div>
        </div>
        <div className="extra text">{post.postText}</div>
        <div className="like-cont">
          <div className="meta" onClick={() => handleLike(post._id)}>
            <a className="like">
              <i className="teal heart icon">{post.likeCount}</i>
            </a>
          </div>
        </div>
        <div className="deleteBtn">
          <DeleteButton postId={post._id} />
        </div>
      </div>
      <div className="container left aligned">
        <CommentList comments={post.comments} />
        <CommentForm postId={post._id} />
      </div>
      {error && <div>{error.message}</div>}
    </div>
  );
};

export default SinglePost;
