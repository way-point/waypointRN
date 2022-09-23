import {useAtom} from 'jotai';
import {Pressable, Text} from 'native-base';
import React from 'react';
import {currentTheme} from '../constants/atoms';

interface CancelButtonProps {
  onPress: () => void;
  cancelText?: string;
}

const CancelButton = ({onPress, cancelText = 'Cancel'}: CancelButtonProps) => {
  const [currTheme] = useAtom(currentTheme);
  return (
    <Pressable onPress={onPress} p={3} borderRadius={8}>
      <Text alignSelf="center" color={currTheme + '.error'} fontSize={18}>
        {cancelText}
      </Text>
    </Pressable>
  );
};

export default CancelButton;
