import {Avatar, Box} from 'native-base';
import React from 'react';
import {userImageProps} from '../constants/types';

interface AvatarGroupProps {
  userImages: userImageProps[];
}

const AvatarGroup = ({userImages}: AvatarGroupProps) => {
  return (
    <Box alignItems="flex-start">
      <Avatar.Group
        _avatar={{
          size: 'md',
        }}
        max={3}>
        {userImages.map(e => {
          return (
            <Avatar
              key={e.id}
              bg="green.500"
              source={{
                uri: e.profileURL,
              }}>
              {e.username[0]}
            </Avatar>
          );
        })}
      </Avatar.Group>
    </Box>
  );
};

export default AvatarGroup;
