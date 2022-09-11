import {RouteProp, useRoute} from '@react-navigation/native';
import {Box, Heading, Image, Text} from 'native-base';
import React from 'react';
import AvatarGroup from '../../components/AvatarGroup';
import JoinEvent from '../../components/JoinEvent';
import {SAFE_AREA_PADDING} from '../../constants/Layout';
import {RootStackParamList} from '../../navigation/types';

const EventDetailsScreen = () => {
  const {event} =
    useRoute<RouteProp<RootStackParamList, 'EventDetails'>>().params;

  return (
    <Box>
      <Image
        alt="Event Image"
        source={{uri: event.image}}
        w="100%"
        h={200}
        resizeMode="cover"
      />
      <Box
        pr={SAFE_AREA_PADDING.paddingRight}
        pl={SAFE_AREA_PADDING.paddingLeft}>
        <Heading>{event.title}</Heading>
        <Box flexDir="row" mt={5} justifyContent="space-between">
          <AvatarGroup userImages={event.subscribers} />
          <JoinEvent />
        </Box>
        <Text mt={5} fontSize={20}>
          {event.description}
        </Text>
      </Box>
    </Box>
  );
};

export default EventDetailsScreen;
