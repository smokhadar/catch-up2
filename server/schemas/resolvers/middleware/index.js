const { skip } = require("graphql-resolvers");

module.exports.isAuthenticated = (_, __, { email }) => {
  if (!email) {
    throw new Error("Access is denied! Please login to continue.");
  }
  return skip;
};
