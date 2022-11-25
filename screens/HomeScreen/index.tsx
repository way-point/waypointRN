import {Box, FlatList} from 'native-base';
import React from 'react';
import feedData from '../../data/feedData';
import AddPostButton from '../../components/AddPostButton';
import Post from '../../components/Post';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  flatlist: {
    marginTop: 20,
  },
});

const HomeScreen = () => {
  return (
    <Box bg="transparent">
      <FlatList
        data={feedData}
        contentContainerStyle={styles.flatlist}
        renderItem={({item}) => <Post item={item} />}
        keyExtractor={item => item.id as string}
      />
      <AddPostButton />
    </Box>
  );
};

export default HomeScreen;
