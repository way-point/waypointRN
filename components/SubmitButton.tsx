import {HStack, Pressable, Spinner, Text} from 'native-base';
import React from 'react';

interface SubmitButtonProps {
  onPress: () => void;
  submitText?: string;
  ifLoading?: boolean;
  disabled?: boolean;
}

const SubmitButton = ({
  onPress,
  submitText = 'Submit',
  ifLoading = false,
  disabled = false,
}: SubmitButtonProps) => {
  return (
    <Pressable
      onPress={onPress}
      backgroundColor="constants.primary"
      disabled={disabled}
      _disabled={{opacity: 0.8}}
      p={3}
      borderRadius={8}>
      {ifLoading ? (
        <HStack backgroundColor="transparent" space={2} justifyContent="center">
          <Spinner color="white" />
        </HStack>
      ) : (
        <Text alignSelf="center" color="white" fontSize={18}>
          {submitText}
        </Text>
      )}
    </Pressable>
  );
};

export default SubmitButton;
