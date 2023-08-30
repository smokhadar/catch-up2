import React from "react";
import { Box, Typography, Divider, useTheme } from "@mui/material";
import { useQuery } from "@apollo/client";
import { useParams } from 'react-router-dom';
import { QUERY_USER } from "../utils/queries";
import LocationInput from "./Location";
import BioEditor from "./Bio";

import {
  Segment,
  Icon,
  Image,
  Container,
  Button,
  Grid,
  GridColumn
} from 'semantic-ui-react';


export const Profile = () => {
  const { userId, postId } = useParams();
  const { loading, error, data } = useQuery(QUERY_USER, {
    variables: { userId },
  });

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error.message}</p>;

  const user = data?.user || {};

  if (!user) {
    return null;
  }


  return (

    <div>

      <Segment vertical raised >
        <Image center src='../avatar_2.png' fluid centered size='medium' />
      </Segment>
      <Divider />

      <Segment>
        <h1>{user?.username}username</h1>
        <LocationInput />
      </Segment>

      <Segment vertical >
        <BioEditor />
      </Segment>
      
      <Segment vertical >
        <h4>{user.friends?.length}40 friends</h4>
      </Segment>

      <Segment vertical >
        <h4>{user.posts?.length} 40 posts</h4>
      </Segment>



      <Segment vertical>
        <Button color='blue' size='tiny'>Edit Profile</Button>
      </Segment>

    </div>
  )

}
export default Profile;


