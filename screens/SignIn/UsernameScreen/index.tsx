import React, {useEffect, useState} from 'react';
import {
  Box,
  FormControl,
  Input,
  Pressable,
  ScrollView,
  Spinner,
  Stack,
  Text,
  useTheme,
} from 'native-base';
import {StyleSheet} from 'react-native';
import {AntDesign, Feather, Ionicons} from '@expo/vector-icons';
import {useAtom} from 'jotai';
import {
  currentTheme,
  ifSignedIn,
  RegMachine,
  userAtom,
} from '../../../constants/atoms';
import {SAFE_AREA_PADDING} from '../../../constants/Layout';
import {useNavigation} from '@react-navigation/native';
import {SignInProp} from '../../../navigation/types';
import IfUsernameExist from '../../../api/route/User/IfUsernameExist';
import SubmitButton from '../../../components/SubmitButton';
import UserCreate from '../../../api/route/User/UserCreate';
import auth from '@react-native-firebase/auth';
import {
  launchImageLibraryAsync,
  MediaTypeOptions,
  requestMediaLibraryPermissionsAsync,
} from 'expo-image-picker';
import convertToUrl from '../../../constants/convertToUrl';
import ProfileImage from '../../../components/ProfileImage';

const styles = StyleSheet.create({
  scrollView: {
    justifyContent: 'center',
    flexGrow: 1,
  },
  right: {marginRight: 10},
});

const getPermissionAsync = async () => {
  const {status} = await requestMediaLibraryPermissionsAsync();
  return status === 'granted';
};

const pickImage = async () => {
  let result = await launchImageLibraryAsync({
    mediaTypes: MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  return result;
};

const UserCheck = (
  ifLoading: boolean,
  ifCanUseUsername: boolean,
  searchTerm: string,
) => {
  const {colors} = useTheme();
  const [currTheme] = useAtom(currentTheme);

  if (searchTerm === '') {
    return;
  }

  if (ifLoading) {
    return <Spinner style={styles.right} />;
  }

  return ifCanUseUsername ? (
    <Feather
      style={styles.right}
      name="x"
      size={24}
      color={colors[currTheme].error}
    />
  ) : (
    <Ionicons
      style={styles.right}
      name="checkmark"
      size={24}
      color={colors.constants.primary}
    />
  );
};

const UsernameScreen = () => {
  const [curr, send] = useAtom(RegMachine);
  const navigation = useNavigation<SignInProp>();
  const [, setIfSignIn] = useAtom(ifSignedIn);
  const [u, setUser] = useAtom(userAtom);

  // should be pretty confident this works because we already
  // checked if user exists and if username exists. This function
  // creates a user entity in mongodb.
  const createUser = async (username: string, profile_uri?: string) => {
    const data = await UserCreate(username, profile_uri);
    if (data && !('errors' in data)) {
      // user created in mongodb
      if ('username' in data) {
        setUser({username: data.username, profile_uri: u.profile_uri});
      }
      if ('profile_uri' in data) {
        setUser({username: u.username, profile_uri: data.profile_uri});
      }
      send({type: 'SIGN_IN'});
    }
  };

  useEffect(() => {
    if (curr.matches('signedIn')) {
      setIfSignIn(false);
    }
  }, [curr, navigation, setIfSignIn]);

  const [searchTerm, setSearchTerm] = useState('');
  const [ifLoading, setIfLoading] = useState(false);
  const [ifCanUseUsername, setIfCanUserUsername] = useState(false);
  const [ifErr, setIfErr] = useState(false);
  const {colors} = useTheme();
  const [currTheme] = useAtom(currentTheme);
  const [profileUri, setProfileUri] = useState(
    auth().currentUser?.photoURL || undefined,
  );

  useEffect(() => {
    setIfLoading(true);
    const delayDebounceFn = setTimeout(async () => {
      // checks if expression contains any form of whitespace
      setIfErr(false);
      if (/\s/.test(searchTerm) || searchTerm.length > 50) {
        setIfCanUserUsername(false);
        setIfErr(true);
        setIfLoading(false);
      } else {
        const data = await IfUsernameExist(searchTerm);
        if (data && 'ifUserExist' in data) {
          setIfCanUserUsername(data.ifUserExist || false);
          setIfLoading(false);
        }
      }
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  return (
    <Box flex={1}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Stack
          space={4}
          maxW="450px"
          mx="auto"
          px={SAFE_AREA_PADDING.paddingLeft}
          mt={SAFE_AREA_PADDING.paddingTop}>
          <Text fontSize={25} fontWeight={500}>
            Let's name yourself
          </Text>
          <Box ml="auto" mr="auto">
            <ProfileImage uri={profileUri} size={100} />
            <Box flexDir="row" mt={1} justifyContent="space-around">
              <Pressable
                onPress={async () => {
                  const granted = await getPermissionAsync();
                  if (granted) {
                    const data = await pickImage();
                    if (!data.cancelled) {
                      setProfileUri(data.uri);
                    }
                  }
                }}>
                <Feather name="edit" size={18} color={colors[currTheme].text} />
              </Pressable>
              <Pressable
                onPress={() => {
                  setProfileUri(undefined);
                }}>
                <AntDesign
                  name="delete"
                  size={18}
                  color={colors[currTheme].error}
                />
              </Pressable>
            </Box>
          </Box>
          <Text opacity={0.5} px={SAFE_AREA_PADDING.paddingLeft}>
            Your username willl be permanent so choose wisely
          </Text>

          <FormControl isInvalid={ifErr}>
            <Input
              placeholder="Username"
              w={'100%'}
              autoCapitalize="none"
              onChangeText={text => {
                setSearchTerm(text);
              }}
              rightElement={UserCheck(ifLoading, ifCanUseUsername, searchTerm)}
            />
            <FormControl.ErrorMessage pl={3}>
              can't contain spaces or contain more than 50 characters
            </FormControl.ErrorMessage>
          </FormControl>
          <SubmitButton
            onPress={async () => {
              let generated_url;
              if (
                profileUri !== auth().currentUser?.photoURL &&
                profileUri !== undefined
              ) {
                generated_url = await convertToUrl(
                  profileUri,
                  `/images/${auth().currentUser!.uid}/profileImage`,
                );
              } else {
                generated_url = profileUri;
              }
              await createUser(searchTerm, generated_url);
            }}
            disabled={ifCanUseUsername}
          />
        </Stack>
      </ScrollView>
    </Box>
  );
};

export default UsernameScreen;
