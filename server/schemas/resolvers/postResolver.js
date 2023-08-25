const { AuthenticationError, UserInputError } = require('apollo-server-express');
const Post = require('../../models/Post');
// add authorization function

const resolvers = {
    Query: {
        async getPosts() {
            try {
                const posts = await Post.find().sort({ createdAt: -1 });
                return posts;
            } catch (err) {
                throw new Error(err);
            }
        },
        async getPost(parent, { postId }) {
            try {
                const post = await Post.findById(postId);
                if (!post) {
                    throw new Error('Post not found');
                } else {
                    return post;
                }
            } catch (err) {
                throw new Error(err);
            }
        }
    },
    Mutation: {
        async createPost(parent, { postText, postAuthor }, context) {
            // const user = checkAuth(context);

            if (postText.trim() === '') {
                throw new Error('Post body must not be empty');
            }

            const newPost = new Post({
                postText: postText,
                // author: user.username,
                postAuthor: postAuthor
            });

            const post = await newPost.save();

            // context.PubSub.publish('NEW_POST', {
            //     newPost: post
            // });

            return post;
        },
        async deletePost(parent, { postId }, context)  {
            // const user = checkAuth(context);

            try {
                const post = await Post.findById(postId);
                // if (user.username === post.author) {
                if (postId) {
                    await post.delete();
                    return 'Post deleted successfully';
                } else {
                    throw new AuthenticationError('Action not allowed');
                }
            } catch (err) {
                throw new Error(err);
            }
        },
        async likePost(parent, { postId }, context) {
            // const { username } = checkAuth(context);

            const post = await Post.findbyId(postId);
            if (post) {
                if (post.likes.find((like) => like.username === username)) {
                    // Post already likes, unlike it
                    post.likes = post.likes.filter((like) => like.username !== username)
                } else {
                    // not liked, like post
                    post.likes.push({
                        username, 
                        createdAt: new Date().toISOString()
                    });
                }

                await post.save();
                return post;
            } else throw new UserInputError('Post not found');
        },
        async dislikePost(parent, { postId }, context) {
            // const { username } = checkAuth(context);

            const post = await Post.findbyId(postId);
            if (post) {
                if (post.dislikes.find((dislike) => dislike.username === username)) {
                    // Post already dislikes, undislike it
                    post.dislikes = post.dislikes.filter((dislike) => dislike.username !== username)
                } else {
                    // not disliked, dislike post
                    post.dislikes.push({
                        username, 
                        createdAt: new Date().toISOString()
                    });
                }

                await post.save();
                return post;
            } else throw new UserInputError('Post not found');
        }
    },
    Subscription: {
        newPost: {
            subscribe: (parent, __, { PubSub }) => PubSub.asyncIterator('NEW_POST')
        }
    }
};

module.exports = resolvers;