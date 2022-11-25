import {RouteProp, useRoute} from '@react-navigation/native';
import {Box, ScrollView, Text, Image} from 'native-base';
import React from 'react';
import {ImageBackground, StyleSheet} from 'react-native';
// import AvatarGroup from '../../../components/AvatarGroup';
import JoinEvent from '../../../components/JoinEvent';
import Menu from '../../../components/Menu';
// import ProfileImage from '../../../components/ProfileImage';
import WhereTitle from '../../../components/WhereTitle';
import {CONTAINER_WIDTH, SAFE_AREA_PADDING} from '../../../constants/Layout';
import menuConfigImage from '../../../constants/Menu/menuConfigImage';
import {RootStackParamList} from '../../../navigation/types';

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 200,
  },
});

const EventDetailsScreen = () => {
  const {event} =
    useRoute<RouteProp<RootStackParamList, 'EventDetails'>>().params;

  return (
    <ScrollView bg="transparent" mt={SAFE_AREA_PADDING.paddingTop}>
      <Menu
        menuConfig={menuConfigImage}
        metaData={{imageURL: event.attachment?.url}}>
        {event.attachment?.url && (
          <ImageBackground
            source={{
              uri: event.attachment.url,
            }}
            style={styles.image}
            resizeMode="cover"
          />
        )}
      </Menu>
      <Box
        pr={SAFE_AREA_PADDING.paddingRight}
        pl={SAFE_AREA_PADDING.paddingLeft}
        pt={SAFE_AREA_PADDING.paddingLeft}>
        <WhereTitle item={event} />
        <Box flexDir="row" mt={5} justifyContent="space-between">
          {/* <AvatarGroup userImages={event.subscribers} /> */}
          <JoinEvent />
        </Box>
        {/* <Text mt={5} fontSize={20}>
          {event.description}
        </Text> */}
      </Box>

      <Box
        my={10}
        borderRadius={10}
        alignSelf="center"
        w={CONTAINER_WIDTH}
        p={SAFE_AREA_PADDING.paddingLeft}>
        <Box justifyContent="space-around" flexDir="row">
          {/* <ProfileImage uri={event.subscribers[0].profileURL} size={42} /> */}
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

export default EventDetailsScreen;
