const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const path = require("path");
const cors = require("cors");
// const { dblClick } = require('@testing-library/user-event/dist/click');
const dotenv = require("dotenv");
const { typeDefs, resolvers } = require("./schemas/index");
const db = require("./config/connection");
const { verifyUser } = require("./helper/context");

dotenv.config();

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    await verifyUser(req);
    return {
      email: req.email,
      loggedInUserId: req.loggedInUserId,
    };
  },
});
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// TO DO add auth middleware and context

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  });
}

// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, '../client/build/index.html'));
// });

const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  server.applyMiddleware({ app });

  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(
        `Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`
      );
    });
  });
};

startApolloServer(typeDefs, resolvers);
