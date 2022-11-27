import {useNavigation} from '@react-navigation/native';
import {Box, Image, Pressable, Text} from 'native-base';
import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import Video from 'react-native-video';
import menuConfigImage from '../constants/Menu/menuConfigImage';
import TimeFormat from '../constants/timeFormat';
import {feedDataProps} from '../constants/types';
import {RootProp} from '../navigation/types';
import Menu from './Menu';

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
  const [duration, setDuration] = useState(item.attachment?.duration);
  const navigation = useNavigation<RootProp>();
  if (item.attachment?.url !== '') {
    return (
      <Box>
        {item.attachment?.attachment_type === 'video' && (
          <Menu menuConfig={menuConfigImage}>
            <Pressable
              onPress={() => {
                navigation.navigate('ImageView', {item: item});
              }}>
              <Video
                source={{
                  uri: item.attachment.url,
                }}
                style={styles.imageBackground}
                muted
                repeat
                onProgress={e => {
                  setDuration(
                    Math.round(
                      (item.attachment?.duration || e.playableDuration) -
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
        {item.attachment?.attachment_type === 'photo' && (
          <Menu
            menuConfig={menuConfigImage}
            metaData={{imageURL: item.attachment.url}}>
            <Pressable
              onPress={() => {
                navigation.navigate('ImageView', {item: item});
              }}>
              <Image
                source={{
                  uri: item.attachment.url,
                }}
                style={styles.imageBackground}
              />
            </Pressable>
          </Menu>
        )}
      </Box>
    );
  }
  return null;
};

export default PostImage;
