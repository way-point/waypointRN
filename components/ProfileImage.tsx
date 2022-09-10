import React from 'react';
import {Avatar} from 'native-base';

interface ProfileImageProps {
  uri: string;
}

const ProfileImage = ({uri}: ProfileImageProps) => {
  return (
    <Avatar
      bg="constants.primary"
      source={{
        uri,
      }}
      size={10}
    />
  );
};

export default ProfileImage;
