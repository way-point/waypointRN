import {useNavigation} from '@react-navigation/native';
import {useAtom} from 'jotai';
import {
  Box,
  Divider,
  Pressable,
  ScrollView,
  Stack,
  Text,
  useTheme,
} from 'native-base';
import React from 'react';
import {StyleSheet} from 'react-native';
import {currentTheme} from '../../../constants/atoms';
import {SAFE_AREA_PADDING} from '../../../constants/Layout';
import {AntDesign, Feather, Ionicons} from '@expo/vector-icons';
import {SettingProp} from '../../../navigation/types';

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
  },
  opacity: {opacity: 0.6},
});

const SettingScreen = () => {
  const {colors} = useTheme();
  const [currTheme] = useAtom(currentTheme);
  const navigation = useNavigation<SettingProp>();

  return (
    <Box flex={1}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Stack
          mt={SAFE_AREA_PADDING.paddingTop}
          space={4}
          px={SAFE_AREA_PADDING.paddingLeft}
          maxW="450px">
          <Box>
            <Box flexDir="row">
              <Pressable
                onPress={() => {
                  navigation.goBack();
                }}
                position="absolute"
                mt={1}>
                <Ionicons
                  name="arrow-back-outline"
                  size={24}
                  color={colors[currTheme].text}
                />
              </Pressable>
              <Text fontSize={20} fontWeight={500} ml="auto" mr="auto">
                Settings
              </Text>
            </Box>
            <Divider mt={3} opacity={0.4} />
          </Box>

          <Pressable
            onPress={() => {
              navigation.navigate('accountInfo');
            }}
            flexDir="row"
            justifyContent="space-between">
            <Box flexDir="row">
              <Feather
                name="user"
                size={24}
                color={colors[currTheme].text}
                style={styles.opacity}
              />
              <Text fontWeight={500} fontSize={16} ml={5}>
                Account Information
              </Text>
            </Box>

            <AntDesign
              color={colors[currTheme].text}
              style={styles.opacity}
              name="right"
              size={24}
            />
          </Pressable>
        </Stack>
      </ScrollView>
    </Box>
  );
};

export default SettingScreen;
