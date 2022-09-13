import React from 'react';
import {Pressable, Text} from 'native-base';

const JoinEvent = () => {
  return (
    <Pressable bg="constants.primary" px={2} h={10} borderRadius={10}>
      <Text mt="auto" mb="auto" color="white">
        Join Event
      </Text>
    </Pressable>
  );
};

export default JoinEvent;
