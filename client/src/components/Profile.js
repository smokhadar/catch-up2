import React, { useContext } from "react";
// import { Box, Typography, Divider, useTheme } from "@mui/material";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { QUERY_USER } from "../utils/queries";
import LocationInput from "./Location";
import BioEditor from "./Bio";
import UserImage from "./UserImage";
import { userContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { gql } from "@apollo/client";
import {
  Segment,
  Icon,
  Image,
  Container,
  Button,
  Grid,
  GridColumn,
} from "semantic-ui-react";

const GET_USERDATA = gql`
  query {
    posts {
      _id
      postAuthor
      postText
      createdAt
      likeCount
    }
  }
`;

export const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  console.log("Profile: ", user);

  // const { userId, postId } = useParams();
  // const { loading, error, data } = useQuery(QUERY_USER, {
  //   variables: { userId },
  // });

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error.message}</p>;

  // const user = data?.user || {};

  // if (!user) {
  //   return null;
  // }

  return (
    <>
      <div>
        <div>
          <UserImage />
        </div>

        <Segment>
          {user ? (
            <>
              <h1> <Link to={`/profile/${user.id}`} className="ui teal link">
                {user?.username}</Link></h1>
              <h3>{user.email} </h3>
            </>
          ) : (
            <>
              <h1>User not found</h1>
            </>
          )}

          <LocationInput />
        </Segment>

        <Segment vertical>
          <BioEditor />
        </Segment>

        <Segment vertical>
          <h4>{user.friends?.length}40 friends</h4>
        </Segment>

        <Segment vertical>
          <h4>{user.posts?.length} 40 posts</h4>
        </Segment>

        <Segment vertical>
          <Button color="blue" size="tiny">
            Edit Profile
          </Button>
        </Segment>
      </div>
    </>
  );
};
export default Profile;
