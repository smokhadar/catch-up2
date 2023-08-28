import "./App.css";
import HomePage from "./components/Home";
import { NewPost } from "./components/NewPost";
import { PostFeed } from "./components/AllPosts";
import React from "react";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import Login from "./pages/login";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import components

const client = new ApolloClient({
  uri: "/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/login" element={<Login />} exact />
            {/* <Route path="/" element={<LoginPage />} /> */}
            <Route path="/home" element={<HomePage />} />
            <Route path="/newPost" element={<NewPost />} />
            <Route path="/postFeed" element={<PostFeed />} />
          </Routes>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
