import React, { useEffect, useState } from 'react';
import { guest } from '../constants/guestUrl';
import UidFind from '../api/route/User/UidFind';
import { Image } from 'native-base';

interface ProfileImageProps {
  uri?: string;
  size?: number;
  id?: string;
}

const ProfileImage = ({ uri = guest, size = 35, id = '' }: ProfileImageProps) => {
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
    <Image
      style={{ width: size, height: size, borderRadius: size / 2 }}
      source={{
        uri: currentImage || guest,
      }}
    />
  );
};

export default ProfileImage;
