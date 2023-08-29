import React, { useState } from 'react';
import {useMutation, useQuery } from '@apollo/client';
import {CREATE_POST} from '../utils/mutations';
import { TextArea, Header } from 'semantic-ui-react'

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
                <Header>What's on your mind?</Header>
                <TextArea
                style={{ minHeight: 200 }} 
                name="postBody"
                value={formState.postBody} 
                onChange={handleChange}
                type="text" rows="3"></TextArea>
                {/* upload image option? */}

               

                <button className="ui teal button">Post</button>

            </form>

            {error && (
                <div>
                    {error.message}
                </div>
            )}
        </div>
    );
}