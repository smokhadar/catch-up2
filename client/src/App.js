import "./App.css";
import HomePage from "./components/Home";
import FriendsList from "./components/Friends";
import { NewPost } from "./components/NewPost";
import { PostFeed } from "./components/AllPosts";
import React from "react";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import Login from "./pages/login";
import SinglePost from "./pages/singlePost/SinglePost";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Profile from "./components/profile";
import { setContext } from "@apollo/client/link/context";
// import components

const httpLink = createHttpLink({ uri: "http://localhost:3001/" });

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: localStorage.getItem("token") || "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  // uri: "/graphql",
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
            <Route path="/postFeed/:postId" element={<SinglePost />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
