import React from "react";
import { Box, Typography, Divider, useTheme } from "@mui/material";
import "./style.css";
import { useQuery } from "@apollo/client";
import { useParams } from 'react-router-dom';
import { QUERY_USER } from "../../utils/queries";

import {
  Segment,
  Header,
  Image
} from 'semantic-ui-react';


export default function Profile() {
  const { userId, postId } = useParams();
  const { loading, error, data } = useQuery(QUERY_USER);

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error.message}</p>;

  const user = data?.user || {};

  return (

    <div className="profile-widget">
      <div className="profile-header">
        <Image
          className="profile-image"
          src={'../avatar_2.png'}
        // alt={`${user.firstName} ${user.lastName}`}
        />

        <h3 className="profile-name">username</h3>
        <h3 className="profile-name">{user?.username}</h3>
        <div className="profile-stats">
          <div className="profile-stat">
            <span className="stat-count">{user.friends?.length}</span>
            <span className="stat-count">20 friends</span>
          </div>

          <div className="profile-stat">
            <span className="stat-count">{user.posts?.length}</span>
            <span className="stat-count">20 post</span>
          </div>

        </div>
      </div>
    </div>


  )

}

//---------------------------------------------------

