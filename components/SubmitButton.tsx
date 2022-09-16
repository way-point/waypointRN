import {Pressable, Text} from 'native-base';
import React from 'react';

interface SubmitButtonProps {
  onPress: () => void;
}

const SubmitButton = ({onPress}: SubmitButtonProps) => {
  return (
    <Pressable
      onPress={onPress}
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
