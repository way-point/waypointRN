import {Box, Pressable, Text, useTheme} from 'native-base';
import React from 'react';
import AvatarGroup from './AvatarGroup';
import Menu from './Menu';
import {feedDataItemProps} from '../constants/types';
import {useAtom} from 'jotai';
import {calendarSyncAtom, currentTheme} from '../constants/atoms';
import {useNavigation} from '@react-navigation/native';
import {RootProp} from '../navigation/types';
import JoinEvent from './JoinEvent';
import WhereTitle from './WhereTitle';
import Layout from '../constants/Layout';
import PostImage from './PostImage';
import TimeState from './WhenTitle';
import menuConfigEvent from '../constants/Menu/menuConfigEvent';
import {
  EvilIcons,
  Feather,
  FontAwesome5,
  Ionicons,
  MaterialIcons,
} from '@expo/vector-icons';
import {StyleSheet} from 'react-native';
import menuConfigUser from '../constants/Menu/menuConfigUser';
import {
  menuUserPreviewConfig,
  menuUserRenderItem,
} from '../constants/Menu/menuUserPreview';
import ProfileImage from './ProfileImage';

const styles = StyleSheet.create({
  eventBusy: {
    marginLeft: 5,
  },
});

const Post = ({item}: feedDataItemProps) => {
  const [currTheme] = useAtom(currentTheme);
  const {colors} = useTheme();
  const navigation = useNavigation<RootProp>();
  const [calendarSync] = useAtom(calendarSyncAtom);

  const if_busy = (startDate: Date, endDate: Date) => {
    if (calendarSync !== null) {
      for (let i = 0; i < calendarSync.length; i++) {
        if (
          calendarSync[i].startDate <= endDate &&
          calendarSync[i].endDate >= startDate
        ) {
          return true;
        }
      }
    }
    return false;
  };

  return (
    <Menu menuConfig={menuConfigEvent}>
      <Pressable
        bg={currTheme + '.background'}
        alignSelf="center"
        mb={0.5}
        w={Layout.window.width}
        p={3}
        _pressed={{
          opacity: 1,
        }}
        onPress={() => {
          navigation.navigate('EventDetails', {
            event: item,
          });
        }}>
        <Box flexDir="row" mb={5}>
          <Menu
            preview={{
              previewConfig: menuUserPreviewConfig,
              previewRenderItem: menuUserRenderItem,
            }}
            menuConfig={menuConfigUser}>
            <ProfileImage uri={item.host.profileURL} size={40} />
          </Menu>
          <WhereTitle item={item} />
          <Box ml="auto" flexDir="row" alignItems="center">
            <TimeState item={item} />
            {if_busy(
              item.eventDetails.when.startDate,
              item.eventDetails.when.endDate,
            ) && (
              <MaterialIcons
                name="event-busy"
                size={24}
                style={styles.eventBusy}
                color={colors[currTheme].error}
              />
            )}
          </Box>
        </Box>
        <Box
          mb={3}
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center">
          <AvatarGroup userImages={item.subscribers} />
          <JoinEvent />
        </Box>
        <Text fontSize={20} mb={5}>
          {item.description}
        </Text>
        <PostImage item={item} />
        <Box flexDir="row" justifyContent="space-evenly" mt={2}>
          <Box flexDir="row">
            <Ionicons
              name="heart-outline"
              size={20}
              color={colors[currTheme].text}
            />
            <Text ml={1}>{item.subscribers.length}</Text>
          </Box>
          <Box flexDir="row">
            <EvilIcons
              name="comment"
              size={24}
              color={colors[currTheme].text}
            />
            <Text ml={1}>{item.subscribers.length}</Text>
          </Box>
          <Box flexDir="row">
            <Feather name="share" size={19} color={colors[currTheme].text} />
            <Text ml={1}>{item.subscribers.length}</Text>
          </Box>
          <Box flexDir="row">
            <FontAwesome5
              name="map-marker-alt"
              size={18}
              color={colors[currTheme].text}
            />
          </Box>
        </Box>
      </Pressable>
    </Menu>
  );
};

export default Post;
