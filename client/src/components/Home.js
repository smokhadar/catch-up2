import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Grid, List, Input, Menu, Header, Segment, Container, Icon, Dropdown} from 'semantic-ui-react';
import { NewPost } from './NewPost';
import { PostFeed } from './AllPosts';
import { Profile } from './profile';

import { Link } from 'react-router-dom';
//import { AuthContext } from '../context/auth';
//const { user, logout } = useContext(AuthContext);
const pathname = window.location.pathname;
//const [activeItem, setActiveItem] = useState(path);
//const path = pathname === '/' ? 'home' : pathname.substr(1);
//const handleItemClick = (e, { name }) => setActiveItem(name);



const HomePage = () => {
 
  return (
      <Container fluid>
        <Menu color='teal' inverted widths>
        <Menu.Item
          name='home'
          // active={activeItem === 'home'}
          //onClick={handleItemClick}
          as={Link}
          to="/home"
          />
        <Menu.Item
          name='messages'
          // active={activeItem === 'messages'}
          onClick=""
          as={Link}
          to="/home"
        />
        
       <Dropdown item text='Friends'>
       <Dropdown.Menu>
         <Dropdown.Item>Veronika Ossi</Dropdown.Item>
         <Dropdown.Item>Jenny Hess</Dropdown.Item>
         <Dropdown.Item>Rachel Gray</Dropdown.Item>
         <Dropdown.Item>Lindsay Park</Dropdown.Item>
         <Dropdown.Item>Matthew Smith</Dropdown.Item>
         </Dropdown.Menu>
      </Dropdown>
        
        
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

           <Segment>Profile</Segment>
           

           <Segment>
            {/* profile */}
            <Profile/>
           </Segment>
           

         </Grid.Column>
         <Grid.Column width={6}>
           <Segment>
            {/* new post component */}
           < NewPost/>
           </Segment>
         </Grid.Column>
         <Grid.Column>
          <Segment>
         <Header>Recently Online</Header>
         <List>
        <List.Item>
          <List.Content>
            <List.Header as='a'>Rachel Gray</List.Header>
            <List.Description>
            Last seen 7 hours ago.
            </List.Description>
          </List.Content>
        </List.Item>
        <List.Item>
          
          <List.Content>
            <List.Header as='a'>Lindsay Park</List.Header>
            <List.Description>
              Last seen 5 hours ago.
            </List.Description>
          </List.Content>
        </List.Item>
        <List.Item>
          
          <List.Content>
            <List.Header as='a'>Matthew Smith</List.Header>
            <List.Description>
              Last seen yesterday.
            </List.Description>
          </List.Content>
        </List.Item>
        <List.Item>
         
          <List.Content>
            <List.Header as='a'>Jenny Hess</List.Header>
            <List.Description>
              Last seen yesterday. 
             
            </List.Description>
           
          </List.Content>
        </List.Item>
        <List.Item>
         
          <List.Content>
            <List.Header as='a'>Veronika Ossi</List.Header>
            <List.Description>
              Last seen yesterday.
              
            </List.Description>
           
          </List.Content>
        </List.Item>
      </List>
      </Segment>
         </Grid.Column>
       </Grid.Row>
       <Grid.Row>
         <Grid.Column>
          
         </Grid.Column>
         <Grid.Column width={6}>
          <Header>Recent Posts</Header>
           <Segment>
            {/* all posts feed */}
           < PostFeed/>
           </Segment>
         </Grid.Column>
         <Grid.Column>
         
         </Grid.Column>
       </Grid.Row>
     </Grid>
     
     </Container>
         
  );
 
 
};

export default HomePage;