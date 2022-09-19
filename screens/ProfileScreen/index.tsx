import React from 'react';
import {Box, Divider, FlatList, Text} from 'native-base';
import ProfileImage from '../../components/ProfileImage';
import {uri} from '../../navigation';
import Layout, {SAFE_AREA_PADDING} from '../../constants/Layout';
import {ImageBackground} from 'react-native';
import {TimeState} from '../../components/WhereTitle';
import feedData from '../../data/feedData';

const Images = [
  'https://cdn1.epicgames.com/salesEvent/salesEvent/amoguslandscape_2560x1440-3fac17e8bb45d81ec9b2c24655758075',
  'https://cdn1.epicgames.com/salesEvent/salesEvent/amoguslandscape_2560x1440-3fac17e8bb45d81ec9b2c24655758075',
  'https://cdn1.epicgames.com/salesEvent/salesEvent/amoguslandscape_2560x1440-3fac17e8bb45d81ec9b2c24655758075',
  'https://cdn1.epicgames.com/salesEvent/salesEvent/amoguslandscape_2560x1440-3fac17e8bb45d81ec9b2c24655758075',
];

interface renderItemProps {
  item: string;
}

const renderItem = ({item}: renderItemProps) => {
  return (
    <Box>
      <ImageBackground
        source={{uri: item}}
        style={{
          width: Layout.window.width / 3 - 2,
          height: Layout.window.width / 3 - 2,
        }}>
        <Box
          bg="constants.transparentDark"
          position="absolute"
          px={1}
          borderRadius={10}
          style={{
            transform: [
              {
                scale: 0.8,
              },
            ],
          }}
          bottom={0}
          right={0}>
          <TimeState item={feedData[0]} />
        </Box>
      </ImageBackground>
    </Box>
  );
};

const ProfileScreen = () => {
  return (
    <Box flex={1}>
      <Box
        px={SAFE_AREA_PADDING.paddingLeft}
        pt={SAFE_AREA_PADDING.paddingLeft}
        flexDir="row"
        justifyContent="space-around"
        alignItems="center">
        <Box alignItems="center">
          <ProfileImage size={90} uri={uri} />
          <Text mt={2} fontWeight="bold">
            Aankur01
          </Text>
        </Box>
        <Box flexDir="row">
          <Box alignItems="center" mx={2}>
            <Text fontWeight="bold">20</Text>
            <Text>Events</Text>
          </Box>
          <Box alignItems="center" mx={2}>
            <Text fontWeight="bold">32</Text>
            <Text>Followers</Text>
          </Box>
          <Box alignItems="center" mx={2}>
            <Text fontWeight="bold">32</Text>
            <Text>Following</Text>
          </Box>
        </Box>
      </Box>
      <Divider mt={5} />
      <FlatList numColumns={3} data={Images} renderItem={renderItem} />
    </Box>
  );
};

export default ProfileScreen;
