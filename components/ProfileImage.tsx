import React from 'react';
import {guest} from '../constants/guestUrl';
import FastImage from 'react-native-fast-image';

interface ProfileImageProps {
  uri?: string;
  size?: number;
}

const ProfileImage = ({uri = guest, size = 35}: ProfileImageProps) => {
  return (
    <FastImage
      style={{width: size, height: size, borderRadius: size / 2}}
      source={{
        uri: uri,
        priority: FastImage.priority.normal,
      }}
    />
  );
};

export default ProfileImage;
