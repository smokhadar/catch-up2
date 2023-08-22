import React from 'react';

export const NewPost = () => {
    const createNewPost = () => {
        // create new post mutation
    }

    return (
        <div>
            <form className="newpost">
                <label>What's on your mind?</label>
                <textarea type="text" rows="3"></textarea>
                {/* upload image option? */}
                <button onSubmit={createNewPost}>Post</button>
            </form>
        </div>
    );
}