import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {useAtom} from 'jotai';
import {Pressable, Stack, Text} from 'native-base';
// import {useAuthRequest} from 'expo-auth-session/providers/google';
import React, {useEffect} from 'react';
import Google from '../../../assets/images/SignIn/Google';
import {currentTheme} from '../../../constants/atoms';

const handlePress = async () => {
  try {
    await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
    const {idToken} = await GoogleSignin.signIn();
    console.log(idToken);
  } catch (e) {
    console.error(e);
  }
};

const AuthButtons = () => {
  const [currTheme] = useAtom(currentTheme);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '240891037955-ae2ss81rvuurg7df2238rk4lves2famf.apps.googleusercontent.com',
      iosClientId:
        '240891037955-d0r3mnd7u2ld2dqkdl92k5iba4ge0vg9.apps.googleusercontent.com',
      profileImageSize: 120,
    });
  }, []);

  return (
    <Stack space={4}>
      <Pressable
        onPress={() => {
          handlePress();
        }}
        bg={currTheme + '.navigation.card'}
        w={230}
        h={50}
        alignSelf="center"
        justifyContent="space-evenly"
        flexDirection="row"
        borderRadius={5}>
        <Google
          width={25}
          height={25}
          style={{marginTop: 'auto', marginBottom: 'auto'}}
        />
        <Text my="auto" fontSize={19} fontWeight={600}>
          Continue with Google
        </Text>
      </Pressable>

      {/* <AppleAuthenticationButton
        buttonType={AppleAuthenticationButtonType.CONTINUE}
        buttonStyle={AppleAuthenticationButtonStyle.BLACK}
        onPress={() => handlePress()}
        cornerRadius={5}
        style={{
          width: 230,
          height: 50,
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      /> */}
    </Stack>
  );
};

export default AuthButtons;
