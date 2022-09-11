import {Box, Heading, Pressable} from 'native-base';
import React from 'react';
import AvatarGroup from '../../components/AvatarGroup';
import Menu from '../../components/Menu';
import {feedDataItemProps} from '../../constants/types';
import {ImageBackground, StyleSheet} from 'react-native';
import ProfileImage from '../../components/ProfileImage';
import {useAtom} from 'jotai';
import {currentTheme} from '../../constants/atoms';
import {useNavigation} from '@react-navigation/native';
import {RootProp} from '../../navigation/types';
import JoinEvent from '../../components/JoinEvent';
import WhereTitle from '../../components/WhereTitle';
import {menuOptionsBox, menuOptionsImage} from './menuOptions';
import Layout, {SAFE_AREA_PADDING} from '../../constants/Layout';

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
    <Menu menuOptions={menuOptionsBox}>
      <Pressable
        bg={currTheme + '.background'}
        alignSelf="center"
        mb={5}
        borderRadius={10}
        w={
          Layout.window.width -
          SAFE_AREA_PADDING.paddingLeft -
          SAFE_AREA_PADDING.paddingRight
        }
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
