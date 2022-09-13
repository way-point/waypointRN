import {Box, FlatList} from 'native-base';
import React from 'react';
import feedData from '../../data/feedData';
import AddPostButton from '../../components/AddPostButton';
import Post from '../../components/Post';

const HomeScreen = () => {
  return (
    <Box bg="transparent">
      <FlatList
        data={feedData}
        renderItem={({item}) => <Post item={item} />}
        keyExtractor={item => item.id}
      />
      <AddPostButton />
    </Box>
  );
};

export default HomeScreen;
