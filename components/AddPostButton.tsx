import {useNavigation} from '@react-navigation/native';
import {Box, Pressable} from 'native-base';
import React from 'react';
import {StyleSheet} from 'react-native';
import {Feather} from '@expo/vector-icons';
import {RootProp} from '../navigation/types';

const styles = StyleSheet.create({
  feather: {
    alignSelf: 'center',
    marginTop: 'auto',
    marginBottom: 'auto',
  },
});

const AddPostButton = () => {
  const navigation = useNavigation<RootProp>();
  return (
    <Box position="absolute" bg="transparent" zIndex={1} bottom={3} right={3}>
      <Pressable
        borderRadius={30}
        width={60}
        height={60}
        onPress={() => {
          navigation.navigate('CreateTitle');
        }}
        backgroundColor="constants.primary">
        <Feather name="plus" size={30} color="white" style={styles.feather} />
      </Pressable>
    </Box>
  );
};

export default AddPostButton;
