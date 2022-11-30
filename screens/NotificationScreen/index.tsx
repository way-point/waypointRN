import {Box, FlatList, HStack, Pressable, Spinner, Text} from 'native-base';
import React, {useCallback, useEffect, useState} from 'react';
import AddPostButton from '../../components/AddPostButton';
import {StyleSheet} from 'react-native';
import {definitions} from '../../api/generated/schema';
import ProfileImage from '../../components/ProfileImage';
import {useAtom} from 'jotai';
import {UserRecommendations} from '../../constants/atoms';
import {SAFE_AREA_PADDING} from '../../constants/Layout';
import FollowBack from '../../api/route/User/FollowBack';
import UnFollow from '../../api/route/User/UnFollow';
import checkRelationshipToUser from '../../api/route/User/checkRelationshipToUser';
import Follow from '../../api/route/User/Follow';

const styles = StyleSheet.create({
  flatlist: {
    marginTop: 20,
  },
});

interface UserRecommendationsProps {
  item: definitions['User'];
}

const UserRecommendation = ({item}: UserRecommendationsProps) => {
  const [status, setStatus] = useState(
    'loading' as
      | 'not following'
      | 'could follow back'
      | 'following'
      | 'loading',
  );
  const [loading, setIfLoading] = useState(false);

  const checkRelation = useCallback(async () => {
    const data = await checkRelationshipToUser(item.uid);
    console.log(data);
    setStatus(data.status || status);
  }, [item.uid, status]);

  useEffect(() => {
    checkRelation();
  }, [checkRelation, item.uid, status]);

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
      <Pressable
        onPress={async () => {
          setIfLoading(true);

          if (status === 'could follow back') {
            await FollowBack(item.uid);
          }

          if (status === 'not following') {
            await Follow(item.uid);
          }

          if (status === 'following') {
            await UnFollow(item.uid);
          }

          await checkRelation();

          setIfLoading(false);
        }}
        my="auto"
        ml={3}
        backgroundColor={
          status === 'following' ? 'gray.700' : 'constants.primary'
        }
        h={8}
        w={20}
        _disabled={{opacity: 0.8}}
        p={1}
        borderRadius={8}>
        {loading ? (
          <HStack
            backgroundColor="transparent"
            space={2}
            justifyContent="center">
            <Spinner color="white" />
          </HStack>
        ) : status === 'loading' ? (
          <HStack
            backgroundColor="transparent"
            space={2}
            justifyContent="center">
            <Spinner color="white" />
          </HStack>
        ) : (
          <Text my="auto" fontSize={15} textAlign="center" color="white">
            {status === 'following' ? 'Following' : 'Follow'}
          </Text>
        )}
      </Pressable>
    </Box>
  );
};

const NotificationScreen = () => {
  const [userRecommendations] = useAtom(UserRecommendations);
  return (
    <Box bg="transparent" flex={1}>
      <FlatList
        data={userRecommendations.relations_new}
        contentContainerStyle={styles.flatlist}
        renderItem={({item}) => <UserRecommendation item={item} />}
        keyExtractor={item => item.uid as string}
      />

      <FlatList
        data={userRecommendations.relations_old}
        contentContainerStyle={styles.flatlist}
        renderItem={({item}) => <UserRecommendation item={item} />}
        keyExtractor={item => item.uid as string}
      />
      <AddPostButton />
    </Box>
  );
};

export default NotificationScreen;
