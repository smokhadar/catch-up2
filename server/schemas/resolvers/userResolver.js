const User = require('../../models/User');

const resolvers = {
  Query: {
    user: async ( _, { id }) => {
      // Fetch user data from your data source
      const userData = await User.findById(id);

      // Calculate and attach the friends count
      const friendsCount = userData.friends.length;

      return {
        ...userData.toObject(),
        friendsCount, // Attach the friends count to the user data
      };
    },
  },
};


module.exports = resolvers