import {Box, FlatList, Heading, Pressable, Text, useTheme} from 'native-base';
import React from 'react';
import AvatarGroup from '../../components/AvatarGroup';
import Menu from '../../components/Menu';
import {feedDataProps, menuOptionProps} from '../../constants/types';
import feedData from '../../data/feedData';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {ImageBackground, StyleSheet} from 'react-native';
import ProfileImage from '../../components/ProfileImage';
import AddPostButton from '../../components/AddPostButton';

interface feedDataItemProps {
  item: feedDataProps;
}

const styles = StyleSheet.create({
  imageBackground: {
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
    height: 200,
    alignSelf: 'center',
  },
});

const menuOptionsImage: menuOptionProps[] = [
  {
    onPress: () => {
      console.log('testing....');
    },
    menuAction: {title: 'Save Photo', systemIcon: 'square.and.arrow.down'},
  },
  {
    onPress: () => {
      console.log('testing 2...');
    },
    menuAction: {title: 'Share With...', systemIcon: 'square.and.arrow.up'},
  },
];

const menuOptionsBox: menuOptionProps[] = [
  {
    onPress: () => {
      console.log('let the party start....');
    },
    menuAction: {title: 'Join Event', systemIcon: 'person.3.sequence'},
  },
  {
    onPress: () => {
      console.log('testing 2...');
    },
    menuAction: {title: 'Share With...', systemIcon: 'square.and.arrow.up'},
  },
  {
    onPress: () => {
      console.log('testing 2...');
    },
    menuAction: {title: 'Report', systemIcon: 'flag.fill', destructive: true},
  },
];

const HomeScreen = () => {
  const {colors} = useTheme();
  const renderItem = ({item}: feedDataItemProps) => {
    return (
      <Menu menuOptions={menuOptionsBox}>
        <Box alignSelf="center" mb={5} borderRadius={10} w="90%" p={3}>
          <Heading>{item.title}</Heading>
          <Box flexDirection="row">
            <Text mb={5} mr={1} color="constants.primary">
              Santa Cruz Broadwalk
            </Text>
            <FontAwesome5
              name="map-marker-alt"
              size={15}
              color={colors.constants.primary}
            />
          </Box>
          <Box
            mb={3}
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center">
            <AvatarGroup userImages={item.subscribers} />
            <Pressable bg="constants.primary" px={2} py={2} borderRadius={10}>
              <Text>Join Event</Text>
            </Pressable>
          </Box>
          <Menu menuOptions={menuOptionsImage}>
            <ImageBackground
              source={{uri: item.image}}
              style={styles.imageBackground}
              resizeMode="cover">
              <Box bg="transparent" mt="auto" pl={2} pb={2} flexDir="row">
                <ProfileImage uri={item.host.profileURL} size={7} />
              </Box>
            </ImageBackground>
          </Menu>
        </Box>
      </Menu>
    );
  };

  return (
    <Box bg="transparent">
      <FlatList
        data={feedData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      <AddPostButton />
    </Box>
  );
};

export default HomeScreen;
