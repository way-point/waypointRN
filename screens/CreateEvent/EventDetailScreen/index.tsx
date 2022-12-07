import {RouteProp, useRoute} from '@react-navigation/native';
import {Box, ScrollView, Text, Image} from 'native-base';
import React from 'react';
import Menu from '../../../components/Menu';
import Post from '../../../components/Post';
import {CONTAINER_WIDTH, SAFE_AREA_PADDING} from '../../../constants/Layout';
import menuConfigImage from '../../../constants/Menu/menuConfigImage';
import {feedDataProps} from '../../../constants/types';
import {RootStackParamList} from '../../../navigation/types';

interface EventDetailsProps {
  event: feedDataProps;
}

export const EventDetails = ({event}: EventDetailsProps) => {
  return (
    <ScrollView bg="transparent">
      <Post item={event} />
      <Box
        my={10}
        borderRadius={10}
        alignSelf="center"
        w={CONTAINER_WIDTH}
        p={SAFE_AREA_PADDING.paddingLeft}>
        <Box justifyContent="space-around" flexDir="row">
          <Box>
            <Text fontSize={20}>Testing this out</Text>
            <Menu
              menuConfig={menuConfigImage}
              metaData={{imageURL: event.attachment?.url}}>
              <Image
                source={{uri: event.attachment?.url}}
                w={CONTAINER_WIDTH - 100}
                h={200}
                mt={5}
                resizeMode="cover"
                borderRadius={10}
                // alt={event.subscribers[0].username + ' image'}
              />
            </Menu>
          </Box>
        </Box>
      </Box>
    </ScrollView>
  );
};

export const EventDetailsScreen = () => {
  const {event} =
    useRoute<RouteProp<RootStackParamList, 'EventDetails'>>().params;
  return <EventDetails event={event} />;
};
