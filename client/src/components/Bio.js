import React, { useState } from 'react';

const BioEditor = () => {
  const [bio, setBio] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    // Here you can perform an action to save the bio, e.g., sending it to a server
  };

  const handleBioChange = (event) => {
    const newBio = event.target.value;
    if (newBio.length <= 1000) {
      setBio(newBio);
    }
  };

  return (
    <div>
      {isEditing ? (
        <div>
          <textarea
            value={bio}
            onChange={handleBioChange}
            rows={5}
            cols={50}
            maxLength={1000}
          />
          <div>
            Characters left: {1000 - bio.length}
          </div>
          <button onClick={handleSaveClick}>Save</button>
        </div>
      ) : (
        <div columns>
          <h4>Bio:</h4>
          <p>{bio || 'No bio available'}</p>
          <button onClick={handleEditClick}>Edit</button>
        </div>
      )}
    </div>
  );
};

export default BioEditor;
