const { skip } = require("graphql-resolvers");
const Post = require("../../../models/Post");
module.exports.isAuthenticated = (_, __, { email }) => {
  if (!email) {
    throw new Error("Access is denied! Please login to continue.");
  }
  return skip;
};

module.exports.isPostOwner = async (_, { postId }, { loggedInUserId }) => {
  try {
    const post = await Post.findById(postId);
    if (!post) throw new Error("Post not found");
    else if (post.user.toString() != loggedInUserId) {
      throw new Error("Not authorized as Post Owner");
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
  return skip;
};
