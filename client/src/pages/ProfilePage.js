import React from "react";
import Profile from "../components/Profile";
import { NewPost } from "../components/NewPost";
import { PostFeed } from "../components/AllPosts";
import { Grid, Segment } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

// 
export default function ProfilePage() {
  return (

<Grid columns={2} divided>
    <Grid.Row stretched>
      <Grid.Column>
        <Segment><Profile /></Segment>
      </Grid.Column>
      <Grid.Column>
        <Segment><NewPost /></Segment>
        <Segment><PostFeed /></Segment>
      </Grid.Column>

    </Grid.Row>
  </Grid>

//     <div class="ui three column divided grid">
//   <div class="stretched row">
//     <div class="column">
//       <div class="ui segment">
//         1
//       </div>
//     </div>
//     <div class="column">
//       <div class="ui segment">
//         1
//       </div>
//       <div class="ui segment">
//         2
//       </div>
//     </div>
//     <div class="column">
//       <div class="ui segment">
//         1
//       </div>
//       <div class="ui segment">
//         2
//       </div>
//       <div class="ui segment">
//         3
//       </div>
//     </div>
//   </div>
// </div>

  );
}
