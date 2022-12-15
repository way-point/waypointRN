import React from 'react';
import {Box, Pressable, Text, useTheme} from 'native-base';
import {Feather} from '@expo/vector-icons';
import {useAtom} from 'jotai';
import {currentTheme} from '../constants/atoms';

const JoinEvent = () => {
  const [currTheme] = useAtom(currentTheme);
  const {colors} = useTheme();

  return (
    <Box ml="auto" flexDir="row" my="auto">
      <Box my="auto" flexDir="row" mr={2}>
        <Text mr={1}>3</Text>
        <Feather name="user" size={18} color={colors[currTheme].text} />
      </Box>
      <Pressable bg="constants.primary" px={2} h={8} borderRadius={10}>
        <Text mt="auto" mb="auto" color="white">
          Join Event
        </Text>
      </Pressable>
    </Box>
  );
};

export default JoinEvent;
