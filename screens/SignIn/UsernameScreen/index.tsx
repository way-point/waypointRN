import React, {useEffect, useState} from 'react';
import {
  Box,
  FormControl,
  Input,
  Pressable,
  ScrollView,
  Stack,
  Text,
  useTheme,
} from 'native-base';
import {StyleSheet} from 'react-native';
import {AntDesign, Feather} from '@expo/vector-icons';
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

const UsernameScreen = () => {
  const [curr, send] = useAtom(RegMachine);
  const navigation = useNavigation<SignInProp>();
  const [, setIfSignIn] = useAtom(ifSignedIn);
  const [, setUser] = useAtom(userAtom);
  const [errMessage, setErrMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const createUser = async (username: string, profile_uri?: string) => {
    setLoading(true);
    UserCreate(username, profile_uri)
      .then(res => {
        setUser({username: res.username, profile_uri: res.profile_uri});
        setLoading(false);
        send({type: 'SIGN_IN'});
      })
      .catch(err => {
        if (err[0] === 'username already exists') {
          setErrMessage('Username already exists');
          setLoading(false);
        }
      });
  };

  useEffect(() => {
    if (curr.matches('signedIn')) {
      setIfSignIn(false);
    }
  }, [curr, navigation, setIfSignIn]);

  const [searchTerm, setSearchTerm] = useState('');
  const {colors} = useTheme();
  const [currTheme] = useAtom(currentTheme);
  const [profileUri, setProfileUri] = useState(
    auth().currentUser?.photoURL || undefined,
  );

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
            <ProfileImage id={auth().currentUser?.uid} size={100} />
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
            Your username will be permanent so choose wisely
          </Text>

          <FormControl isInvalid={errMessage !== ''}>
            <Input
              placeholder="Username"
              w={'100%'}
              autoCapitalize="none"
              onChangeText={text => {
                setErrMessage('');
                if (/\s/.test(text) || text.length > 50) {
                  setErrMessage(
                    "can't contain spaces or contain more than 50 characters",
                  );
                }
                setSearchTerm(text);
              }}
            />
            <FormControl.ErrorMessage pl={3}>
              {errMessage}
            </FormControl.ErrorMessage>
          </FormControl>
          <SubmitButton
            ifLoading={loading}
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
          />
        </Stack>
      </ScrollView>
    </Box>
  );
};

export default UsernameScreen;
