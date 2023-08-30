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
import Profile from "./components/Profile";
import { setContext } from "@apollo/client/link/context";
import { AuthProvider } from "./context/authContext";
// import components

const httpLink = createHttpLink({ uri: "http://localhost:3001/graphql" });

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: `Bearer ${localStorage.getItem("token") || "test@12346"}`,
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
    <AuthProvider>
      <ApolloProvider client={client}>
        <Router>
          <div className="App">
            <Routes>
              <Route path="/" element={<Login />} exact />

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
    </AuthProvider>
  );
}

export default App;
