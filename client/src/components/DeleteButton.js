import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { DELETE_POST } from '../utils/mutations'; 

function DeleteButton({ postId, onDeleteSuccess }) {
  const [deletePost] = useMutation(DELETE_POST);
  const [isDeleted, setIsDeleted] = useState(false); 

  const handleDeleteClick = async () => {
    try {
      const { data } = await deletePost({
        variables: { postId },
      });

      if (data && data.deletePost) {
        setIsDeleted(true);
        onDeleteSuccess(postId);
      } else {
        console.error('Delete post failed');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {isDeleted ? (
        <p>Post has been deleted</p>
      ) : (
        <button className="ui red button" onClick={handleDeleteClick}>
          Delete
        </button>
      )}
    </div>
  );
}

export default DeleteButton;
