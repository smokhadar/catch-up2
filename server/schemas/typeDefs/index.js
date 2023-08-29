const { gql } = require("apollo-server-express");

const usertypeDefs = require("./userDefs");
const postypeDefs = require("./typeDefsPosts");

const typeDefs = gql`
  type Query {
    _: String
  }

  type Mutation {
    _: String
  }

  type Subscription {
    _: String
  }
`;

module.exports = [typeDefs, usertypeDefs, postypeDefs];
