import {useNavigation} from '@react-navigation/native';
import {Box, Pressable, Text} from 'native-base';
import React, {useState} from 'react';
import {ImageBackground, StyleSheet} from 'react-native';
import Video from 'react-native-video';
import menuConfigImage from '../constants/Menu/menuConfigImage';
import menuConfigUser from '../constants/Menu/menuConfigUser';
import {
  menuUserPreviewConfig,
  menuUserRenderItem,
} from '../constants/Menu/menuUserPreview';
import TimeFormat from '../constants/timeFormat';
import {feedDataProps} from '../constants/types';
import {RootProp} from '../navigation/types';
import Menu from './Menu';
import ProfileImage from './ProfileImage';

interface PostImageProps {
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

const PostImage = ({item}: PostImageProps) => {
  const [duration, setDuration] = useState(item.video?.duration);
  const navigation = useNavigation<RootProp>();
  return (
    <Box>
      {item.type === 'video' && item.video && (
        <Menu menuConfig={menuConfigImage}>
          <Pressable
            onPress={() => {
              navigation.navigate('ImageView', {item: item});
            }}>
            <Video
              source={{
                uri: item.video.uri,
              }}
              style={styles.imageBackground}
              muted
              repeat
              onProgress={e => {
                setDuration(
                  Math.round(
                    (item.video?.duration || e.playableDuration) -
                      e.currentTime,
                  ),
                );
              }}
              controls={false}
              resizeMode="cover"
            />
            <Box
              position="absolute"
              bottom={2}
              left={2}
              bg="transparent"
              flexDir="row">
              <Menu
                preview={{
                  previewConfig: menuUserPreviewConfig,
                  previewRenderItem: menuUserRenderItem,
                }}
                menuConfig={menuConfigUser}>
                <ProfileImage uri={item.host.profileURL} size={7} />
              </Menu>
            </Box>
            <Box
              position="absolute"
              bottom={2}
              right={2}
              p={1}
              bg="constants.transparentDark"
              alignSelf="flex-end"
              borderRadius={8}>
              <Text>{TimeFormat(duration)}</Text>
            </Box>
          </Pressable>
        </Menu>
      )}
      {item.type === 'photo' && item.image && (
        <Menu menuConfig={menuConfigImage} metaData={{imageURL: item.image}}>
          <Pressable
            onPress={() => {
              navigation.navigate('ImageView', {item: item});
            }}>
            <ImageBackground
              source={{
                uri: item.image,
              }}
              style={styles.imageBackground}
              resizeMode="cover">
              <Box
                bg="transparent"
                mt="auto"
                justifyContent="space-between"
                pl={2}
                pb={2}
                flexDir="row">
                <Menu
                  preview={{
                    previewConfig: menuUserPreviewConfig,
                    previewRenderItem: menuUserRenderItem,
                  }}
                  menuConfig={menuConfigUser}>
                  <ProfileImage uri={item.host.profileURL} size={10} />
                </Menu>
              </Box>
            </ImageBackground>
          </Pressable>
        </Menu>
      )}
    </Box>
  );
};

export default PostImage;
