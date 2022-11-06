import {useNavigation} from '@react-navigation/native';
import {useAtom} from 'jotai';
import {
  Box,
  Divider,
  Pressable,
  ScrollView,
  Spinner,
  Stack,
  Text,
  useTheme,
} from 'native-base';
import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {currentTheme, ifSignedIn, RegMachine} from '../../../constants/atoms';
import {SAFE_AREA_PADDING} from '../../../constants/Layout';
import {Ionicons} from '@expo/vector-icons';
import UidFind from '../../../api/route/User/UidFind';
import auth from '@react-native-firebase/auth';

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
  },
  opacity: {opacity: 0.6},
});

const AccountInformationScreen = () => {
  const {colors} = useTheme();
  const [currTheme] = useAtom(currentTheme);
  const navigation = useNavigation();
  const [data, setData] = useState(null as any);
  const [, send] = useAtom(RegMachine);
  const [, setIfSignIn] = useAtom(ifSignedIn);

  const LoadUserInfo = async () => {
    const d = await UidFind(auth().currentUser?.uid || '');
    if ('username' in d) {
      setData(d);
    }
    return 'err';
  };

  useEffect(() => {
    LoadUserInfo();
  }, []);

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
                Account Information
              </Text>
            </Box>
            <Divider mt={3} opacity={0.4} />
          </Box>

          {data === null ? (
            <Spinner color="constants.primary" />
          ) : (
            <Stack space={4}>
              <Box flexDir="row" justifyContent="space-between">
                <Box flexDir="row">
                  <Text fontWeight={500} fontSize={16} ml={5}>
                    Username
                  </Text>
                </Box>

                <Text color={colors[currTheme].text} style={styles.opacity}>
                  @{data.username}
                </Text>
              </Box>

              <Box flexDir="row" justifyContent="space-between">
                <Box flexDir="row">
                  <Text fontWeight={500} fontSize={16} ml={5}>
                    Email
                  </Text>
                </Box>

                <Text color={colors[currTheme].text} style={styles.opacity}>
                  {auth().currentUser?.email}
                </Text>
              </Box>

              <Pressable
                alignSelf="center"
                onPress={() => {
                  auth()
                    .signOut()
                    .then(() => {
                      send({type: 'RESET'});
                      setIfSignIn(true);
                    });
                }}>
                <Text fontSize={16} color={colors[currTheme].error}>
                  Log out
                </Text>
              </Pressable>
            </Stack>
          )}
        </Stack>
      </ScrollView>
    </Box>
  );
};

export default AccountInformationScreen;
