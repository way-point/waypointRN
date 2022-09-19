import {useAtom} from 'jotai';
import {Box, Heading, Pressable, Text} from 'native-base';
import React from 'react';
import Post from '../../../components/Post';
import ProfileImage from '../../../components/ProfileImage';
import {EventMachine} from '../../../constants/atoms';
import {SAFE_AREA_PADDING} from '../../../constants/Layout';
import {feedDataProps} from '../../../constants/types';
import {uri} from '../../../navigation';

const ReviewScreen = () => {
  const [curr] = useAtom(EventMachine);
  const postData: feedDataProps = {
    id: '1',
    host: {
      id: '2',
      username: 'Aankur01',
      profileURL: uri,
    },
    image:
      curr.context.attachment.type === 'photo'
        ? curr.context.attachment.uri
        : undefined,
    video:
      curr.context.attachment.type === 'video'
        ? {
            uri: curr.context.attachment.uri,
            duration: curr.context.attachment.duration,
          }
        : undefined,
    type: curr.context.attachment.type || 'photo',
    eventDetails: {
      where: {
        longitude: curr.context.eventLocation.coordinate.longitude || 0,
        latitude: curr.context.eventLocation.coordinate.latitude || 0,
        address: curr.context.eventLocation.address || '',
      },
      when: {
        startDate: curr.context.eventDate.startDate || new Date(Date.now()),
        endDate: curr.context.eventDate.endDate || new Date(Date.now()),
        repeat: curr.context.eventDate.repeat,
      },
    },
    subscribers: [],
    description: curr.context.message,
  };
  return (
    <Box flex={1} bg="transparent">
      <Box
        bg="transparent"
        mt={SAFE_AREA_PADDING.paddingTop}
        px={SAFE_AREA_PADDING.paddingLeft}
        h="100%">
        <Box
          flexDir="row"
          bg="transparent"
          justifyContent="space-between"
          mb={5}
          mt={SAFE_AREA_PADDING.paddingLeft}>
          <Box bg="transparent" flexDir="row">
            <ProfileImage uri={uri} />
          </Box>
          <Pressable
            bg="constants.primary"
            _disabled={{
              opacity: 0.5,
            }}
            px={2}
            py={1}
            my="auto"
            borderRadius={10}>
            <Text>Post</Text>
          </Pressable>
        </Box>
        <Heading mb={5}>Everything look good?</Heading>
        <Post item={postData} />
      </Box>
    </Box>
  );
};

export default ReviewScreen;
