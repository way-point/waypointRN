// import {
//   AppleAuthenticationButton,
//   AppleAuthenticationButtonStyle,
//   AppleAuthenticationButtonType,
//   AppleAuthenticationScope,
//   signInAsync,
// } from 'expo-apple-authentication';
// import {maybeCompleteAuthSession} from 'expo-web-browser';
import {useAtom} from 'jotai';
import {Pressable, Stack, Text} from 'native-base';
// import {useAuthRequest} from 'expo-auth-session/providers/google';
import React from 'react';
import Google from '../../../assets/images/SignIn/Google';
import {currentTheme} from '../../../constants/atoms';

// maybeCompleteAuthSession();

// const handlePress = async () => {
//   try {
//     await signInAsync({
//       requestedScopes: [
//         AppleAuthenticationScope.FULL_NAME,
//         AppleAuthenticationScope.EMAIL,
//       ],
//     });
//   } catch (e) {
//     console.error(e);
//   }
// };

const AuthButtons = () => {
  const [currTheme] = useAtom(currentTheme);

  // const [request, response, promptAsync] = useAuthRequest({
  //   expoClientId:
  //     '240891037955-s90rj4hlnaha4t42tf34lgru5jj0ig10.apps.googleusercontent.com',
  //   iosClientId:
  //     '240891037955-95es5juil94c5l8edbi2ne4okdandmve.apps.googleusercontent.com',
  //   androidClientId:
  //     '240891037955-gt2uk245k5lmafpl9o68id0enmuc5sa9.apps.googleusercontent.com',
  //   webClientId:
  //     '240891037955-mbnatgjfdaa75pillqcjsnhiusuj2dum.apps.googleusercontent.com',
  // });

  // useEffect(() => {
  //   if (response?.type === 'success') {
  //     const {authentication} = response;
  //   }
  // }, [response]);

  return (
    <Stack space={4}>
      <Pressable
        onPress={() => {
          // promptAsync();
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
