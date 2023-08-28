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
            const username = 'test';

            const post = await Post.findById(postId);
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
        },
        async addComment (parent, { postId, commentText, commentAuthor }, context) {
            try {
                if (commentText.trim() === '') {
                    throw new UserInputError('Empty comment', {
                        errors: {
                            body: 'Comment cannot be empty'
                        }
                    });
                }
                const post = await Post.findOneAndUpdate(
                    { _id: postId },
                    {
                        $addToSet: {
                            comments: { commentText, commentAuthor: 'test'},
                        },
                    },
                    {
                        new: true,
                        runValidators: true,
                    }
                );

                if (!post) throw new Error('Post not found');

                await post.save();
                return post;
            } catch (e){
                throw new Error(e);
            }
        },
        async removeComment(parent, { postId, commentId }, context) {
            // const { username } = checkAuth(context);
            const username = 'test';

            try {
                const post = await Post.findById(postId);
                if (post) {
                    const commentIndex = post.comments.findIndex((c) => c.id === commentId);

                    if (post.comments[commentIndex].commentAuthor === username) {
                        post.comments.splice(commentIndex, 1);
                        await post.save();
                        return post;
                    } else throw new AuthenticationError('Action not allowed');

                } else throw new UserInputError('Post not found');
            } catch (err) {
                console.log(err);
            }
        }
    },
    Subscription: {
        newPost: {
            subscribe: (parent, __, { PubSub }) => PubSub.asyncIterator('NEW_POST')
        }
    }
};

module.exports = resolvers;