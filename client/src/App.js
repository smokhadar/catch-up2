import './App.css';
import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// import components

// const client = new ApolloClient({
//   uri: '/graphql',
//   cache: new InMemoryCache(),
// });

function App() {
  return (
    <ApolloProvider>
      <Router>
        <div className="App">
          <header/>
            <Routes>
              <Route
                path="/"
                //element={<Home />}
                />
              <Route 
                path="/users/:userId"
                //element={<SingleUser />}
              />
            </Routes>
          <footer/>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
