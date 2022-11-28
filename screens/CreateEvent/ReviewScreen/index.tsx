import {useAtom} from 'jotai';
import {Box, Heading, Pressable, Text} from 'native-base';
import React from 'react';
import Post from '../../../components/Post';
import ProfileImage from '../../../components/ProfileImage';
import {EventMachine, ifSignedIn, userAtom} from '../../../constants/atoms';
import convertToUrl from '../../../constants/convertToUrl';
import {SAFE_AREA_PADDING} from '../../../constants/Layout';
import {feedDataProps} from '../../../constants/types';
import auth from '@react-native-firebase/auth';
import PostCreate from '../../../api/route/Post/PostCreate';

const ReviewScreen = () => {
  const [curr, send] = useAtom(EventMachine);
  const [{profile_uri}] = useAtom(userAtom);
  const [, setIfSignedIn] = useAtom(ifSignedIn);

  const postData: feedDataProps = {
    host_id: auth().currentUser?.uid || '',
    description: curr.context.message,
    attachment: {
      attachment_type: curr.context.attachment.type || 'photo',
      duration: curr.context.attachment.duration,
      url: curr.context.attachment.uri,
    },
    event_details: {
      address: curr.context.eventLocation.address || '',
      coordinate: {
        latitude: curr.context.eventLocation.coordinate.latitude || -200,
        longitude: curr.context.eventLocation.coordinate.longitude || -200,
      },
      time_of_event: {
        start_time: curr.context.eventDate.startDate!.toISOString(),
        end_time: curr.context.eventDate.endDate!.toISOString(),
      },
    },
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
            <ProfileImage uri={profile_uri} />
          </Box>
          <Pressable
            bg="constants.primary"
            _disabled={{
              opacity: 0.5,
            }}
            onPress={async () => {
              let d = postData.attachment?.url;
              if (d && d.startsWith('https://')) {
                d = await convertToUrl(
                  curr.context.attachment.uri,
                  `images/${auth().currentUser!.uid}/post`,
                );
              }
              if (d === '' || d === undefined) {
                delete postData.attachment;
              } else {
                send({type: 'ENTER_URI', value: {uri: d}});
              }

              await PostCreate({data: postData})
                .then(res => {
                  console.log(res);
                })
                .catch(err => {
                  console.log(err);
                  if (
                    'errors' in err &&
                    err.errors.length === 1 &&
                    err.errors[0] === 'Invalid ID Token'
                  ) {
                    setIfSignedIn(true);
                  }
                });
            }}
            px={2}
            py={1}
            my="auto"
            borderRadius={10}>
            <Text color="white">Post</Text>
          </Pressable>
        </Box>
        <Heading mb={5}>Everything look good?</Heading>
        <Post item={postData} />
      </Box>
    </Box>
  );
};

export default ReviewScreen;
