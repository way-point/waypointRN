import {Feather} from '@expo/vector-icons';
import {useAtom} from 'jotai';
import {Avatar, Box, useTheme} from 'native-base';
import React from 'react';
import {currentTheme} from '../constants/atoms';
import {userImageProps} from '../constants/types';

interface AvatarGroupProps {
  userImages: userImageProps[];
}

const AvatarGroup = ({userImages}: AvatarGroupProps) => {
  const {colors} = useTheme();
  const [currTheme] = useAtom(currentTheme);
  console.log(userImages.length);
  return (
    <Box alignItems="flex-start">
      {userImages.length === 0 ? (
        <Box bg={currTheme + '.textField'} p={2} borderRadius={30}>
          <Feather name="user" size={24} color={colors[currTheme].text} />
        </Box>
      ) : (
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
      )}
    </Box>
  );
};

export default AvatarGroup;
