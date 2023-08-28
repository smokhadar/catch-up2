import React, { useState } from 'react';
import {useMutation, useQuery } from '@apollo/client';
import {CREATE_POST} from '../utils/mutations';

export const NewPost = () => {
    const [formState, setFormState] = useState({
        postBody: '',
        username: 'test'
    })
    const [createPost, { error }] = useMutation(CREATE_POST);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        })
    }
    const handleFormSubmit = async(event) => {
        event.preventDefault();
        console.log(formState);

        try {
            const { data } = await createPost({
                variables: { postText: formState.postBody, postAuthor: formState.username },
            });

            console.log('post successfully created');
        } catch(e) {
            console.error(e);
        }
    }

    return (
        <div className="ui form">
            <form onSubmit={handleFormSubmit} className="newpost field">
                <label>What's on your mind?</label>
                <textarea 
                name="postBody"
                value={formState.postBody} 
                onChange={handleChange}
                type="text" rows="3"></textarea>
                {/* upload image option? */}
                <button className="ui green button">Post</button>
            </form>

            {error && (
                <div>
                    {error.message}
                </div>
            )}
        </div>
    );
}