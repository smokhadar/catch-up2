const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
// const { dblClick } = require('@testing-library/user-event/dist/click');
const { typeDefs, resolvers } = require('./schemas/index');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
    typeDefs,
    resolvers,
});

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

const startApolloServer = async( typeDefs, resolvers) => {
    await server.start();
    server.applyMiddleware({ app });

    db.once('open', () => {
        app.listen(PORT, () => {
            console.log(`API server running on port ${PORT}!`);
            console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
        })
    })
};

startApolloServer( typeDefs, resolvers );