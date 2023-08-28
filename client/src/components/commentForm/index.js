import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
import {useMutation } from '@apollo/client';

import { ADD_COMMENT } from '../../utils/mutations';

// import auth

export const CommentForm = ({ postId }) => {
    const [commentText, setCommentText] = useState('');
    const [characterCount, setCharacterCount] = useState(0);

    const [addComment, { error }] = useMutation(ADD_COMMENT);

    const handleFormSubmit = async(event) => {
        event.preventDefault();

        try {
            const { data } = await addComment({
                variables: {
                    postId,
                    commentText, 
                    commentAuthor: 'clientside_test'
                },
            });

            setCommentText('');
        } catch(err) {
            console.error(err);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;

        if (name === 'commentText' && value.length <= 280) {
            setCommentText(value);
            setCharacterCount(value.length);
        }
    };

    return (
        <div>
            {/* add auth loggedIn to verify user */}
            <form
                className='ui form'
                onSubmit={handleFormSubmit}
            >
                <div className="field">
                    <textarea
                        name="commentText"
                        placeholder='Add your comment...'
                        rows="3"
                        value={commentText}
                        onChange={handleChange}
                    ></textarea>
                    <p
                        className={`${characterCount === 280 || error ? 'text-danger': ''}`}>
                        Character Count: {characterCount}/280
                        {error && <span>{error.message}</span>}
                    </p>
                </div>
                <div>
                    <button
                    className="ui green button"
                    type="submit">
                        Add Comment
                    </button>
                </div>
            </form>
        </div>
    )
};
export default CommentForm;