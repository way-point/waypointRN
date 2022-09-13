import {RouteProp, useRoute} from '@react-navigation/native';
import {Box, Heading, Image, ScrollView, Text} from 'native-base';
import React from 'react';
import AvatarGroup from '../../../components/AvatarGroup';
import JoinEvent from '../../../components/JoinEvent';
import Menu from '../../../components/Menu';
import ProfileImage from '../../../components/ProfileImage';
import {CONTAINER_WIDTH, SAFE_AREA_PADDING} from '../../../constants/Layout';
import menuOptionsImage from '../../../constants/Menu/menuOptionsImage';
import {RootStackParamList} from '../../../navigation/types';

const EventDetailsScreen = () => {
  const {event} =
    useRoute<RouteProp<RootStackParamList, 'EventDetails'>>().params;

  return (
    <ScrollView bg="transparent">
      <Menu menuOptions={menuOptionsImage}>
        <Image
          alt="Event Image"
          source={{uri: event.image}}
          w="100%"
          h={200}
          resizeMode="cover"
        />
      </Menu>
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

      <Box
        my={10}
        borderRadius={10}
        alignSelf="center"
        w={CONTAINER_WIDTH}
        p={SAFE_AREA_PADDING.paddingLeft}>
        <Box justifyContent="space-around" flexDir="row">
          <ProfileImage uri={event.subscribers[0].profileURL} size={42} />
          <Box>
            <Text fontSize={20}>Testing this out</Text>
            <Menu menuOptions={menuOptionsImage}>
              <Image
                source={{uri: event.image}}
                w={CONTAINER_WIDTH - 100}
                h={200}
                mt={5}
                resizeMode="cover"
                borderRadius={10}
                alt={event.subscribers[0].username + ' image'}
              />
            </Menu>
          </Box>
        </Box>
      </Box>
    </ScrollView>
  );
};

export default EventDetailsScreen;
