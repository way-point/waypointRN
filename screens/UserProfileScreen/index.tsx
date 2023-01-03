import {RouteProp, useRoute} from '@react-navigation/native';
import {Box, Divider, FlatList, Text} from 'native-base';
import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import findByUser from '../../api/route/Post/FindByUser';
import NumFollowerAndFollowing from '../../api/route/User/NumFollowerAndFollowing';
import Post from '../../components/Post';
import ProfileImage from '../../components/ProfileImage';
import {SAFE_AREA_PADDING} from '../../constants/Layout';
import {feedDataProps} from '../../constants/types';
import {RootStackParamList} from '../../navigation/types';
import auth from '@react-native-firebase/auth';
import StatusOfUserButton from '../../components/StatusOfUserButton';
import UidFind from '../../api/route/User/UidFind';

interface UserProfileProps {
  host_id: string;
}

const styles = StyleSheet.create({
  flatlist: {
    marginTop: 2,
  },
});

export const NavigationProfileScreen = () => {
  const {host_id} = useRoute<RouteProp<RootStackParamList, 'Profile'>>().params;
  return <UserProfileScreen host_id={host_id} />;
};

export const UserProfileScreen = ({host_id}: UserProfileProps) => {
  const [posts, setPosts] = useState([] as feedDataProps[]);
  const [username, setUsername] = useState(null as null | string);
  const [followers, setFollowers] = useState(0);
  const [following, setFollowing] = useState(0);
  useEffect(() => {
    const getFollowerAndFollowing = async (uid: string) => {
      const numFollowerAndFollowing = await NumFollowerAndFollowing(uid || '');
      setFollowers(numFollowerAndFollowing.followers || 0);
      setFollowing(numFollowerAndFollowing.following || 0);
    };

    const getUserPosts = async () => {
      const uid = host_id;
      const uidUser = await UidFind(uid);
      await getFollowerAndFollowing(uid);
      if ('username' in uidUser) {
        setUsername(uidUser.username);
      }
      const user = await findByUser(uid || '');
      if (user.posts && user.posts.length > 0) {
        setPosts(user.posts);
      }
    };
    getUserPosts();
  }, [host_id]);

  return (
    <Box flex={1} bg="transparent">
      <Box
        px={SAFE_AREA_PADDING.paddingLeft}
        pt={SAFE_AREA_PADDING.paddingLeft}
        flexDir="row"
        bg="transparent"
        justifyContent="space-around"
        alignItems="center">
        <Box alignItems="center" bg="transparent">
          <ProfileImage id={host_id} size={90} />
          <Text mt={2} fontWeight="bold">
            {username}
          </Text>
        </Box>
        <Box bg="transparent" flexDir="row">
          <Box bg="transparent" alignItems="center" mx={2}>
            <Text fontWeight="bold">{posts.length}</Text>
            <Text>Events</Text>
          </Box>
          <Box bg="transparent" alignItems="center" mx={2}>
            <Text fontWeight="bold">{followers}</Text>
            <Text>Followers</Text>
          </Box>
          <Box bg="transparent" alignItems="center" mx={2}>
            <Text fontWeight="bold">{following}</Text>
            <Text>Following</Text>
          </Box>
        </Box>
      </Box>

      {host_id !== auth().currentUser?.uid && (
        <Box ml="auto" mr={SAFE_AREA_PADDING.paddingLeft} bg="transparent">
          <StatusOfUserButton uid={host_id} />
        </Box>
      )}
      <Divider mt={5} />
      <FlatList
        data={posts}
        contentContainerStyle={styles.flatlist}
        renderItem={({item}) => <Post item={item} />}
        keyExtractor={item => item.id as string}
      />
    </Box>
  );
};
