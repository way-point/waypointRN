import React, {useEffect, useState} from 'react';
import {guest} from '../constants/guestUrl';
import FastImage from 'react-native-fast-image';
import UidFind from '../api/route/User/UidFind';

interface ProfileImageProps {
  uri?: string;
  size?: number;
  id?: string;
}

const ProfileImage = ({uri = guest, size = 35, id = ''}: ProfileImageProps) => {
  const [currentImage, setCurrentImage] = useState(uri);

  useEffect(() => {
    if (id !== '') {
      UidFind(id).then(data => {
        if ('profile_uri' in data) {
          setCurrentImage(data.profile_uri || uri);
        }
      });
    }
  }, [id, uri]);
  return (
    <FastImage
      style={{width: size, height: size, borderRadius: size / 2}}
      source={{
        uri: currentImage,
        priority: FastImage.priority.normal,
      }}
    />
  );
};

export default ProfileImage;
