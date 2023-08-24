const postResolvers = require('./postResolver');
const userResolvers = require('./userResolver');
const commentsResolvers = require('./comments')

module.exports = {
  Post: {
    likeCount: (parent) => parent.likes.length
  },
  Query: {
    ...postResolvers.Query
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...postResolvers.Mutation,
    ...commentsResolvers.Mutation
  },
  Subscription: {
    ...postResolvers.Subscription
  }
};