import React from 'react';
import {Avatar} from 'native-base';

const ProfileImage = () => {
  return (
    <Avatar
      bg="constants.primary"
      source={{
        uri: 'https://media-exp1.licdn.com/dms/image/C5603AQEQZuyIujt9xA/profile-displayphoto-shrink_200_200/0/1640233246542?e=2147483647&v=beta&t=06q_FRXOtNMMPTnZmHt7CDL6g3C6tC_0erJ4JaWTNgo',
      }}
      size={10}
    />
  );
};

export default ProfileImage;
