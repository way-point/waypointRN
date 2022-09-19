import {Box, Pressable, Text} from 'native-base';
import React from 'react';
import AvatarGroup from './AvatarGroup';
import Menu from './Menu';
import {feedDataItemProps} from '../constants/types';
import {useAtom} from 'jotai';
import {currentTheme} from '../constants/atoms';
import {useNavigation} from '@react-navigation/native';
import {RootProp} from '../navigation/types';
import JoinEvent from './JoinEvent';
import WhereTitle from './WhereTitle';
import {CONTAINER_WIDTH} from '../constants/Layout';
import menuOptionsEvent from '../constants/Menu/menuOptionsEvent';
import PostImage from './PostImage';
import TimeState from './WhenTitle';

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
        <Text fontSize={20} mb={5}>
          {item.description}
        </Text>
        <WhereTitle item={item} />
        <Box
          mb={3}
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center">
          {item.subscribers.length > 0 && (
            <AvatarGroup userImages={item.subscribers} />
          )}
          <JoinEvent />
        </Box>
        <Box bg="transparent" alignSelf="flex-start" mb={5}>
          <TimeState item={item} />
        </Box>
        <PostImage item={item} />
      </Pressable>
    </Menu>
  );
};

export default Post;
