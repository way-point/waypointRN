import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {useAtom} from 'jotai';
import {Pressable, Stack, Text} from 'native-base';
import auth from '@react-native-firebase/auth';
import {
  AppleButton,
  appleAuth,
} from '@invertase/react-native-apple-authentication';
import React, {useEffect} from 'react';
import {Platform, StyleSheet} from 'react-native';
import Google from '../../../assets/images/SignIn/Google';
import {currentTheme, RegMachine} from '../../../constants/atoms';
import {WEB_CLIENT_ID} from '../../../secrets';

const styles = StyleSheet.create({
  google: {
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  apple: {
    width: 230,
    height: 50,
    alignSelf: 'center',
  },
});

async function onAppleButtonPress() {
  // Start the sign-in request
  const appleAuthRequestResponse = await appleAuth.performRequest({
    requestedOperation: appleAuth.Operation.IMPLICIT,
    requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
  });

  // Ensure Apple returned a user identityToken
  if (!appleAuthRequestResponse.identityToken) {
    throw new Error('Apple Sign-In failed - no identify token returned');
  }

  // Create a Firebase credential from the response
  const {identityToken, nonce} = appleAuthRequestResponse;
  const appleCredential = auth.AppleAuthProvider.credential(
    identityToken,
    nonce,
  );

  // Sign the user in with the credential
  await auth().signInWithCredential(appleCredential);
}

async function onGoogleButtonPress() {
  // Get the users ID token
  const {idToken} = await GoogleSignin.signIn();

  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  // Sign-in the user with the credential
  await auth().signInWithCredential(googleCredential);
}

const AuthButtons = () => {
  const [currTheme] = useAtom(currentTheme);
  const [, send] = useAtom(RegMachine);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: WEB_CLIENT_ID,
    });
  }, []);

  return (
    <Stack space={4}>
      <Pressable
        onPress={() => {
          onGoogleButtonPress().then(() => {
            send({type: 'ENTER_SOCIAL_PROVIDER'});
          });
        }}
        bg={currTheme + '.navigation.card'}
        w={230}
        h={50}
        alignSelf="center"
        justifyContent="space-evenly"
        flexDirection="row"
        borderRadius={5}>
        <Google width={25} height={25} style={styles.google} />
        <Text my="auto" fontSize={19} fontWeight={600}>
          Continue with Google
        </Text>
      </Pressable>
      {Platform.OS === 'ios' && (
        <AppleButton
          buttonStyle={AppleButton.Style.BLACK}
          buttonType={AppleButton.Type.CONTINUE}
          style={styles.apple}
          onPress={() =>
            onAppleButtonPress().then(() => {
              send({type: 'ENTER_SOCIAL_PROVIDER'});
            })
          }
        />
      )}
    </Stack>
  );
};

export default AuthButtons;
