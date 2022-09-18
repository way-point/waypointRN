import {Box, Text} from 'native-base';
import React, {useState} from 'react';
import {ImageBackground, StyleSheet} from 'react-native';
import Video from 'react-native-video';
import menuOptionsImage from '../constants/Menu/menuOptionsImage';
import TimeFormat from '../constants/timeFormat';
import {feedDataProps} from '../constants/types';
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
  return (
    <Box>
      {item.type === 'video' && item.video && (
        <Menu menuOptions={menuOptionsImage}>
          <Box>
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
              <ProfileImage uri={item.host.profileURL} size={7} />
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
          </Box>
        </Menu>
      )}
      {item.type === 'photo' && item.image && (
        <Menu menuOptions={menuOptionsImage}>
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
              flexDir="row">
              <ProfileImage uri={item.host.profileURL} size={7} />
            </Box>
          </ImageBackground>
        </Menu>
      )}
    </Box>
  );
};

export default PostImage;
