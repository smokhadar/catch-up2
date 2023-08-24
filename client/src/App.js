import './App.css';
import HomePage from "./components/Home";
import React from 'react';
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// import components

 const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
       <Router>
        <div className="App">
          <header> Catch Up 2.0 </header>
          <Routes>
            {/* <Route path="/" element={<LoginPage />} /> */}
            <Route
              path="/home"
              element={ <HomePage />}
            />
         
          </Routes>
         
        </div>
       </Router>
     </ApolloProvider>
  );
}

export default App;
