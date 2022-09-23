import {Pressable, Text} from 'native-base';
import React from 'react';

interface SubmitButtonProps {
  onPress: () => void;
  submitText?: string;
}

const SubmitButton = ({onPress, submitText = 'Submit'}: SubmitButtonProps) => {
  return (
    <Pressable
      onPress={onPress}
      backgroundColor="constants.primary"
      p={3}
      borderRadius={8}>
      <Text alignSelf="center" color="white" fontSize={18}>
        {submitText}
      </Text>
    </Pressable>
  );
};

export default SubmitButton;
