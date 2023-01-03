import React, {useEffect, useState} from 'react';
import {Box, Divider, FlatList, Text} from 'native-base';
import ProfileImage from '../../components/ProfileImage';
import {SAFE_AREA_PADDING} from '../../constants/Layout';
import {useAtom} from 'jotai';
import {userAtom} from '../../constants/atoms';
import findByUser from '../../api/route/Post/FindByUser';
import auth from '@react-native-firebase/auth';
import {feedDataProps} from '../../constants/types';
import Post from '../../components/Post';
import {StyleSheet} from 'react-native';
import NumFollowerAndFollowing from '../../api/route/User/NumFollowerAndFollowing';

const styles = StyleSheet.create({
  flatlist: {
    marginTop: 2,
  },
});

const ProfileScreen = () => {
  const [{username}] = useAtom(userAtom);
  const [posts, setPosts] = useState([] as feedDataProps[]);

  const [followers, setFollowers] = useState(0);
  const [following, setFollowing] = useState(0);

  useEffect(() => {
    const getUserPosts = async () => {
      const uid = await auth().currentUser?.uid;
      console.log(uid);
      NumFollowerAndFollowing(uid || '')
        .then(numFollowerAndFollowing => {
          setFollowers(numFollowerAndFollowing.followers || 0);
          setFollowing(numFollowerAndFollowing.following || 0);
        })
        .catch(() => {
          setFollowers(0);
          setFollowing(0);
        });
      const user = await findByUser(uid || '');
      console.log(user);
      if (user.posts && user.posts.length > 0) {
        setPosts(user.posts);
      }
    };
    getUserPosts();
  }, []);

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
          <ProfileImage id={auth().currentUser?.uid} size={90} />
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

export default ProfileScreen;
