import React, { useState } from 'react';
import { Input, Button, Container, Icon } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css'; // Make sure you've imported the Semantic UI CSS

const LocationInput = () => {
  const [editing, setEditing] = useState(false);
  const [locationText, setLocationText] = useState('Your location');

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleSaveClick = () => {
    setEditing(false);
    // Save locationText to your backend or state management logic here
  };

  const handleChange = (e) => {
    setLocationText(e.target.value);
  };

  return (
    <Container>
      <div >
        {/* <div className="ui center aligned segment"> */}
        <div className="ui action input">
          {editing ? (
            <Input
              value={locationText}
              onChange={handleChange}
              action={
                <Button compact color="teal" onClick={handleSaveClick}>
                  Save
                </Button>
              }
            />
          ) : (



            <div class="ui equal width grid">
              <div class="column">
                <div >
                  <Icon name='map marker' color='red' size='large' />
                </div>
              </div>
              <div class="eight wide column">
                <div >
                  <span className="location-text">{locationText}</span>
                </div>
              </div>
              <div class="column">
                <div>
                  <Button compact size="small" onClick={handleEditClick}>
                    Edit
                  </Button>
                </div>
              </div>
            </div>




          )}
        </div>
      </div>
    </Container>
  );
};

export default LocationInput;
