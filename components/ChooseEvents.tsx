import {useAtom} from 'jotai';
import {Box, Heading, useTheme} from 'native-base';
import React from 'react';
import {currentTheme} from '../constants/atoms';
import {SAFE_AREA_PADDING} from '../constants/Layout';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  marginY: {
    marginTop: 'auto',
    marginBottom: 'auto',
  },
});

const ChooseEvents = () => {
  const [currTheme] = useAtom(currentTheme);
  const {colors} = useTheme();
  return (
    <Box
      bg={currTheme + '.textField'}
      px={SAFE_AREA_PADDING.paddingLeft}
      flex={1}>
      <Box
        flexDir="row"
        justifyContent="space-between"
        borderRadius={10}
        py={5}
        px={3}
        mb={10}>
        <Box flexDir="row">
          <Entypo name="globe" size={60} color={colors[currTheme].text} />
          <Heading ml={5} my="auto">
            Public
          </Heading>
        </Box>
        <AntDesign
          name="checkcircle"
          size={24}
          style={styles.marginY}
          color={colors[currTheme].text}
        />
      </Box>

      <Box
        flexDir="row"
        justifyContent="space-between"
        borderRadius={10}
        py={5}
        px={3}
        mb={10}>
        <Box flexDir="row">
          <FontAwesome name="users" size={52} color={colors[currTheme].text} />
          <Heading ml={5} my="auto">
            Private Event
          </Heading>
        </Box>
      </Box>
    </Box>
  );
};

export default ChooseEvents;
