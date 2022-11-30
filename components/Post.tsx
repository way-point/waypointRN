import {Box, Pressable, Text, useTheme} from 'native-base';
import React, {useEffect, useState} from 'react';
// import AvatarGroup from './AvatarGroup';
import Menu from './Menu';
import {feedDataItemProps} from '../constants/types';
import {useAtom} from 'jotai';
import {calendarSyncAtom, currentTheme} from '../constants/atoms';
import {useNavigation} from '@react-navigation/native';
import {RootProp} from '../navigation/types';
import JoinEvent from './JoinEvent';
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
import ProfileImage from './ProfileImage';
import UidFind from '../api/route/User/UidFind';
import moment from 'moment';
import {UserProfileScreen} from '../screens/UserProfileScreen';

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

  const [name, setName] = useState('');

  const setNewName = async (host_id: string) => {
    const d = await UidFind(host_id);
    if ('username' in d) {
      setName(d.username);
    }
  };

  useEffect(() => {
    setNewName(item.host_id as string);
  }, [item.host_id]);

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
        <Box flexDir="row" mb={1}>
          <Menu
            onPressMenuPreview={() => {
              navigation.navigate('Profile', {host_id: item.host_id as string});
            }}
            preview={{
              previewConfig: {
                previewType: 'CUSTOM',
                previewSize: 'STRETCH',
              },
              previewRenderItem: () => {
                return (
                  <Box>
                    <UserProfileScreen host_id={item.host_id as string} />
                  </Box>
                );
              },
            }}
            menuConfig={menuConfigUser}>
            <ProfileImage id={item.host_id as string} size={40} />
          </Menu>
          <Box ml={2}>
            <Box flexDir="row">
              <Text fontWeight={600}>{name}</Text>
              {item.date_created && (
                <Text ml={2} opacity={0.6}>
                  ･ {moment(item.date_created).fromNow()}
                </Text>
              )}
            </Box>
            <Box
              flexDir="row"
              alignItems="center"
              my="auto"
              borderRadius={10}
              h={5}>
              <TimeState item={item} />
              {if_busy(
                item.event_details?.time_of_event.start_time as unknown as Date,
                item.event_details?.time_of_event.end_time as unknown as Date,
              ) && (
                <MaterialIcons
                  name="event-busy"
                  size={20}
                  style={styles.eventBusy}
                  color={colors[currTheme].error}
                />
              )}
            </Box>
          </Box>
          <JoinEvent />
        </Box>
        <Box mb={3} flexDirection="row">
          {/* <AvatarGroup userImages={item.subscribers} /> */}
          <Text fontSize={20} mb={5}>
            {item.description}
          </Text>
        </Box>
        <PostImage item={item} />
        <Box flexDir="row" justifyContent="space-between" mt={3} mx={3}>
          <Box flexDir="row">
            <Ionicons
              name="heart-outline"
              size={20}
              color={colors[currTheme].text}
            />
            <Text ml={1}>{2}</Text>
          </Box>
          <Box flexDir="row">
            <EvilIcons
              name="comment"
              size={24}
              color={colors[currTheme].text}
            />
            <Text ml={1}>{3}</Text>
          </Box>
          <Box flexDir="row">
            <Feather name="share" size={19} color={colors[currTheme].text} />
            <Text ml={1}>{4}</Text>
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
