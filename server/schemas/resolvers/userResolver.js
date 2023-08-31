const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { combineResolvers } = require("graphql-resolvers");
const { ApolloError } = require("apollo-server-errors");
const userModel = require("../../models/User");
const postModel = require("../../models/Post");
const { isAuthenticated } = require("./middleware");

module.exports = {
  Query: {
    users: async () => {
      const users = await userModel.find().populate("post");
      console.log("Users" + users.length);
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
        console.log("signup:", input);
        const check = await userModel.findOne({ email: input.email });
        if (check) {
          throw new ApolloError("Email already in use");
        }

        const secret = process.env.JWT_SECRET_KEY || "mysecret";
        const ntoken = jwt.sign({ email: input.email }, secret, {
          expiresIn: "1d",
        });
        const hasedPassword = await bcrypt.hash(input.password, 12);
        const newUser = new userModel({
          ...input,
          password: hasedPassword,
          token: ntoken,
        });

        const result = await newUser.save();

        return result;
      } catch (error) {
        throw new ApolloError(error.message);
        console.error(error);
      }
    },

    login: async (_, { input }) => {
      try {
        console.log(` Login input ${input.email} ${input.password}`);
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
        user.token = token;
        console.log("User found", user);
        return user;
      } catch (error) {
        console.log("User Login Error", error);
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
