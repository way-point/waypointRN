import {Box, FlatList, Text} from 'native-base';
import React from 'react';
import AddPostButton from '../../components/AddPostButton';
import {StyleSheet} from 'react-native';
import {definitions} from '../../api/generated/schema';
import ProfileImage from '../../components/ProfileImage';
import {SAFE_AREA_PADDING} from '../../constants/Layout';
import StatusOfUserButton from '../../components/StatusOfUserButton';

const styles = StyleSheet.create({
  flatlist: {
    marginTop: 20,
  },
});

interface UserRecommendationsProps {
  item: definitions['User'];
}

const UserRecommendation = ({item}: UserRecommendationsProps) => {
  return (
    <Box
      flexDir="row"
      justifyContent="space-between"
      px={SAFE_AREA_PADDING.paddingLeft}
      py={3}>
      <Box flexDir="row">
        <ProfileImage size={60} uri={item.profile_uri} />
        <Text pl={2}>
          <Text fontWeight={600}>{item.username}</Text> started following you
        </Text>
      </Box>
      <StatusOfUserButton uid={item.uid} />
    </Box>
  );
};

const NotificationScreen = () => {
  return (
    <Box bg="transparent" flex={1}>
      <FlatList
        data={[
          {
            date_created: '2022-11-28T06:36:27.193000',
            followers_id: '639d391baa5e7c14476d2b12',
            uid: 'Zu8GTOSxbhb1yZZ0niQz6xeWBiw1',
            user_posts_id: '639aacbacca9394531e1ee98',
            username: 'ankurahir',
          },
        ]}
        contentContainerStyle={styles.flatlist}
        renderItem={({item}) => <UserRecommendation item={item} />}
        keyExtractor={item => item.uid as string}
      />
      <AddPostButton />
    </Box>
  );
};

export default NotificationScreen;
