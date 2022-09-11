import React from 'react';
import {Avatar} from 'native-base';

interface ProfileImageProps {
  uri: string;
  size?: number;
}

const ProfileImage = ({uri, size = 10}: ProfileImageProps) => {
  return (
    <Avatar
      bg="constants.primary"
      source={{
        uri,
      }}
      size={size}
    />
  );
};

export default ProfileImage;
