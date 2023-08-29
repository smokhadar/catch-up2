import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Grid, Transition, Input, Menu, Header, Segment, Container, Icon, Image} from 'semantic-ui-react';
import { NewPost } from './NewPost';
import { PostFeed } from './AllPosts';
import { Profile } from './profile';

const HomePage = () => {
 
  return (
      <Container fluid>
        <Menu color='green' inverted widths>
        <Menu.Item
          name='home'
          // active={activeItem === 'home'}
          // onClick={this.handleItemClick}
        />
        <Menu.Item
          name='messages'
          // active={activeItem === 'messages'}
          // onClick={this.handleItemClick}
        />
        <Menu.Item
          name='friends'
          // active={activeItem === 'friends'}
          // onClick={this.handleItemClick}
        />
        
        <Menu.Menu position='right'>
          <Menu.Item header>
          <Header textAlign='center' >   Welcome to CatchUp 2.0   </Header>
          </Menu.Item>
         
        </Menu.Menu>
        <Menu.Menu position='right'>
          <Menu.Item>
            <Input icon='search' placeholder='Search for Friends' />
          </Menu.Item>
          <Menu.Item>
            <Icon link name='bell' />
          </Menu.Item>
          <Menu.Item
            name='logout'
            // active={activeItem === 'logout'}
            // onClick={this.handleItemClick}
          />
        </Menu.Menu>
      </Menu> 

       <Grid columns='equal'>
       <Grid.Row stretched>
         <Grid.Column>
           <Segment>
            {/* profile */}
            <Profile/>
           </Segment>
           <Segment>2</Segment>
         </Grid.Column>
         <Grid.Column width={6}>
           <Segment>
            {/* new post component */}
           < NewPost/>
           </Segment>
         </Grid.Column>
         <Grid.Column>
           <Segment>1</Segment>
           <Segment>2</Segment>
         </Grid.Column>
       </Grid.Row>
       <Grid.Row>
         <Grid.Column>
           <Segment>1</Segment>
           <Segment>2</Segment>
         </Grid.Column>
         <Grid.Column width={6}>
           <Segment>
            {/* all posts feed */}
           < PostFeed/>
           </Segment>
         </Grid.Column>
         <Grid.Column>
           <Segment>1</Segment>
           <Segment>2</Segment>
         </Grid.Column>
       </Grid.Row>
     </Grid>
     
     </Container>
         
  );
 
 
};

export default HomePage;