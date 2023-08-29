import React from "react";
import { List, Image } from 'semantic-ui-react'


const Friends=[
    "Deandra Diedrick",
    "Samira Khadar",
    "Paola Guerrero",
    "Sarah",
    "Nidhi Shah"
   
]

const FriendsList =() => {

    return(
        <List>
        <List.Item>
         
          <List.Content>
            <List.Header as='a'>Rachel</List.Header>
            <List.Description>
            Last seen 7 hours ago.
            </List.Description>
          </List.Content>
        </List.Item>
        <List.Item>
          
          <List.Content>
            <List.Header as='a'>Lindsay</List.Header>
            <List.Description>
              Last seen 5 hours ago.
            </List.Description>
          </List.Content>
        </List.Item>
        <List.Item>
          
          <List.Content>
            <List.Header as='a'>Matthew</List.Header>
            <List.Description>
              Last seen yesterday.
            </List.Description>
          </List.Content>
        </List.Item>
        <List.Item>
         
          <List.Content>
            <List.Header as='a'>Jenny Hess</List.Header>
           
          </List.Content>
        </List.Item>
        <List.Item>
         
          <List.Content>
            <List.Header as='a'>Veronika Ossi</List.Header>
           
          </List.Content>
        </List.Item>
      </List>
    )
};

export default FriendsList;