import { Box } from "@mui/material";
import React from 'react';
import 'semantic-ui-css/semantic.min.css';


const UserImage = ({ profilePic, size = "200px" }) => {
  return (
  
      <Box
        width={size}
        height={size}
        className="ui circular teal inverted segment"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          margin: 'auto', // Center the Box horizontally
        }}>
        <img
          style={{ objectFit: "cover", borderRadius: "50%" }}
          width="190px"
          height="190px"
          alt="user"
          src="../UjuWinky.png"
          // src={profilePic}
        />
      </Box>

  );
};

export default UserImage;