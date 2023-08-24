const { AuthenticationError, UserInputError } = require('apollo-server-express');
const Post = require('../../models/Post');
// add authorization function

const resolvers = {
    Mutation: {
        async createComment(parent, { postId, body }, context) {
            // const { username } = checkAuth(context);

            if (body.trim() === '') {
                throw new UserInputError('Empty comment', {
                    errors: {
                        body: 'Comment body must not be empty'
                    }
                });
            }

            const post = await Post.findById(postId);
            if (post) {
                post.comments.unshift({
                    commentText: body,
                    commentAuthor: username,
                });
                await post.save();
                return post;
            } else throw new UserInputError('Post not found');
        },
        async deleteComment(parent, { postId, commentId }, context) {
            // const { username } = checkAuth(context);

            const post = await Post.findById(postId);

            if (post) {
                const commentIndex = post.comments.findIndex((c) => c.id === commentId);

                if (post.comments[commentIndex].commentAuthor === username) {
                    post.comments.splice(commentIndex, 1);
                    await post.save();
                    return post;
                } else throw new AuthenticationError('Action not allowed');
            } else throw new UserInputError('Post not found');
        }
    }
};

module.export = resolvers;