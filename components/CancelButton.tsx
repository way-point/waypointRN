import {useAtom} from 'jotai';
import {Pressable, Text} from 'native-base';
import React from 'react';
import {currentTheme} from '../constants/atoms';

interface CancelButtonProps {
  onPress: () => void;
}

const CancelButton = ({onPress}: CancelButtonProps) => {
  const [currTheme] = useAtom(currentTheme);
  return (
    <Pressable onPress={onPress} p={3} borderRadius={8}>
      <Text alignSelf="center" color={currTheme + '.error'} fontSize={18}>
        Cancel
      </Text>
    </Pressable>
  );
};

export default CancelButton;
