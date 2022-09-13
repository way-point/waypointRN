import {Pressable, Text} from 'native-base';
import React from 'react';

const SubmitButton = () => {
  return (
    <Pressable
      onPress={() => {
        console.log('test');
      }}
      backgroundColor="constants.primary"
      p={3}
      borderRadius={8}>
      <Text alignSelf="center" color="white" fontSize={18}>
        Submit
      </Text>
    </Pressable>
  );
};

export default SubmitButton;
