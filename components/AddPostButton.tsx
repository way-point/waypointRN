import {Box, Pressable} from 'native-base';
import React from 'react';
import {StyleSheet} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

const styles = StyleSheet.create({
  feather: {
    alignSelf: 'center',
    marginTop: 'auto',
    marginBottom: 'auto',
  },
});

const AddPostButton = () => {
  return (
    <Box position="absolute" bg="transparent" zIndex={1} bottom={3} right={3}>
      <Pressable
        borderRadius={30}
        width={60}
        height={60}
        backgroundColor="constants.primary">
        <Feather name="plus" size={30} color="white" style={styles.feather} />
      </Pressable>
    </Box>
  );
};

export default AddPostButton;
