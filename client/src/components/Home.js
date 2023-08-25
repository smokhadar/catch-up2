import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Grid, Transition, Input, Menu, Header, Segment, Container} from 'semantic-ui-react';





const HomePage = () => {
  
  //render() {
  const  {color}  = 'red';
  return (
  

    //  <Grid columns={3}>
         <div> 
    <Segment>
     <Header as='h1' textAlign='center'>Welcome to CatchUp 2.0</Header>
   </Segment>
 </div>,
      //</Grid><Grid.Row className="page-title">
      
        <Menu color='olive' inverted widths>
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
         <Menu.Item
         />
        <Menu.Menu position='center'>
          <Menu.Item header>
          <Header >Welcome to CatchUp 2.0</Header>
          </Menu.Item>
          <Menu.Item   
         />
        </Menu.Menu>
        <Menu.Menu position='right'>
          <Menu.Item>
            <Input icon='search' placeholder='Search...' />
          </Menu.Item>
          <Menu.Item
            name='logout'
            // active={activeItem === 'logout'}
            // onClick={this.handleItemClick}
          />
        </Menu.Menu>
      </Menu>
     
    
         
  );
 // }
 
};

export default HomePage;