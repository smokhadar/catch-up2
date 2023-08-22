const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const postSchema = new Schema({
    postBody: {
        type: String,
        required: 'You need to add a post!',
        minlength: 1,
        // maxlength?
        trim: true,
    },
    author: {
        type: String,
        required: true,
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
    },
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
    comments: [
        {
            commentText: {
                type: String,
                required: true,
                minlength: 1,
                maxlength: 280,
              },
              commentAuthor: {
                type: String,
                required: true,
              },
              createdAt: {
                type: Date,
                default: Date.now,
                get: (timestamp) => dateFormat(timestamp),
            },
        },
    ],
});

const Post = model('Post', postSchema);

module.exports = Post;