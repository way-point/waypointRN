// import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {useAtom} from 'jotai';
import {Pressable, Stack, Text} from 'native-base';
// import {useAuthRequest} from 'expo-auth-session/providers/google';
import React from 'react';
import {StyleSheet} from 'react-native';
import Google from '../../../assets/images/SignIn/Google';
import {currentTheme} from '../../../constants/atoms';

const styles = StyleSheet.create({
  google: {
    marginTop: 'auto',
    marginBottom: 'auto',
  },
});

const AuthButtons = () => {
  const [currTheme] = useAtom(currentTheme);

  return (
    <Stack space={4}>
      <Pressable
        onPress={() => {
          // handlePress();
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
    </Stack>
  );
};

export default AuthButtons;
