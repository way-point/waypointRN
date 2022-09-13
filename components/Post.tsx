import {Box, Heading, Pressable} from 'native-base';
import React from 'react';
import AvatarGroup from './AvatarGroup';
import Menu from './Menu';
import {feedDataItemProps} from '../constants/types';
import {ImageBackground, StyleSheet} from 'react-native';
import ProfileImage from './ProfileImage';
import {useAtom} from 'jotai';
import {currentTheme} from '../constants/atoms';
import {useNavigation} from '@react-navigation/native';
import {RootProp} from '../navigation/types';
import JoinEvent from './JoinEvent';
import WhereTitle from './WhereTitle';
import {CONTAINER_WIDTH} from '../constants/Layout';
import menuOptionsEvent from '../constants/Menu/menuOptionsEvent';
import menuOptionsImage from '../constants/Menu/menuOptionsImage';

const styles = StyleSheet.create({
  imageBackground: {
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
    height: 200,
    alignSelf: 'center',
  },
});

const Post = ({item}: feedDataItemProps) => {
  const [currTheme] = useAtom(currentTheme);
  const navigation = useNavigation<RootProp>();
  return (
    <Menu menuOptions={menuOptionsEvent}>
      <Pressable
        bg={currTheme + '.background'}
        alignSelf="center"
        mb={5}
        borderRadius={10}
        w={CONTAINER_WIDTH}
        p={3}
        _pressed={{
          opacity: 1,
        }}
        onPress={() => {
          navigation.navigate('EventDetails', {
            event: item,
          });
        }}>
        <Heading>{item.title}</Heading>
        <WhereTitle item={item} />
        <Box
          mb={3}
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center">
          <AvatarGroup userImages={item.subscribers} />
          <JoinEvent />
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
      </Pressable>
    </Menu>
  );
};

export default Post;
