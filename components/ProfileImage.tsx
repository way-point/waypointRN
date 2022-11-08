import React from 'react';
import {Avatar} from 'native-base';
import {ThemeComponentSizeType} from 'native-base/lib/typescript/components/types';
import {guest} from '../constants/guestUrl';

interface ProfileImageProps {
  uri?: string;
  size?: ThemeComponentSizeType<'Avatar'>;
}

const ProfileImage = ({uri = guest, size = 9}: ProfileImageProps) => {
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
