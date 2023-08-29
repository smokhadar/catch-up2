const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { combineResolvers } = require("graphql-resolvers");

const userModel = require("../../models/User");
const postModel = require("../../models/Post");
const { isAuthenticated } = require("./middleware");

module.exports = {
  Query: {
    users: async () => {
      const users = await userModel.find();
      return users;
    },
    user: combineResolvers(isAuthenticated, async (_, __, { email }) => {
      try {
        console.log("===", email);
        const user = await userModel.findOne({ email });
        if (!user) {
          throw new Error("User not found");
        }
        return user;
      } catch (err) {
        console.error(err);
        throw err;
      }
    }),
  },
  Mutation: {
    signup: async (_, { input }) => {
      try {
        const check = await userModel.findOne({ email: input.email });
        if (check) {
          throw new Error("Email already in use");
        }
        const hasedPassword = await bcrypt.hash(input.password, 12);
        const newUser = new userModel({ ...input, password: hasedPassword });

        const result = await newUser.save();
        return result;
      } catch (error) {
        console.error(error);
      }
    },

    login: async (_, { input }) => {
      try {
        const user = await userModel.findOne({ email: input.email });
        if (!user) {
          throw new Error("User not found");
        }

        const isPassworValid = await bcrypt.compare(
          input.password,
          user.password
        );

        if (!isPassworValid) {
          throw new Error("Incorrect Password");
        }
        const secret = process.env.JWT_SECRET_KEY || "mysecret";
        const token = jwt.sign({ email: user.email }, secret, {
          expiresIn: "1d",
        });

        return { token };
      } catch (error) {
        console.log(error);
      }
    },
  },

  User: {
    //return all the posts for that given user id
    tasks: async ({ id }) => {
      try {
        const posts = await postModel.find({ user: id });
        return posts;
        //tasks.filter((t) => t.userId === id),
      } catch (error) {
        console.log(error);
      }
    },
  },
};
