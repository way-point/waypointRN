import {useNavigation} from '@react-navigation/native';
import {useAtom} from 'jotai';
import {
  Box,
  Divider,
  Flex,
  FormControl,
  Input,
  Pressable,
  ScrollView,
  Stack,
  Text,
} from 'native-base';
import React, {useEffect, useRef} from 'react';
import {StyleSheet, TextInput} from 'react-native';
import {currentTheme, ifSignedIn, RegMachine} from '../../../constants/atoms';
import {SignInProp} from '../../../navigation/types';
import AuthButtons from '../AuthButtons';
import SubmitButton from '../../../components/SubmitButton';
import {SAFE_AREA_PADDING} from '../../../constants/Layout';

const styles = StyleSheet.create({
  scrollView: {
    justifyContent: 'center',
    flexGrow: 1,
  },
});

const LoginScreen = () => {
  const [currTheme] = useAtom(currentTheme);
  const navigation = useNavigation<SignInProp>();
  const [, setIfSignIn] = useAtom(ifSignedIn);

  const PasswordRef = useRef<TextInput>(null);

  const [curr, send] = useAtom(RegMachine);

  useEffect(() => {
    if (curr.matches('emailVerify')) {
      navigation.navigate('EmailVerify');
    }
    if (curr.matches('attachUsername')) {
      navigation.navigate('Username');
    }
    if (curr.matches('signedIn')) {
      setIfSignIn(false);
    }
  }, [curr, navigation, setIfSignIn]);

  const emailErr = () => {
    if (curr.matches('errors.invalidEmail')) {
      return 'invalid email';
    }
    if (curr.matches('errors.userDisabled')) {
      return 'user is disabled';
    }
    if (curr.matches('errors.userNotFound')) {
      return 'email is not found';
    }
    return '';
  };

  const passwordErr = () => {
    if (curr.matches('errors.wrongPassword')) {
      return 'password is incorrect';
    }
    if (curr.matches('errors.invalidPassword')) {
      return 'invalid password. Must be at least 6 characters.';
    }
    return '';
  };

  return (
    <Box flex={1}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Stack space={4} px={SAFE_AREA_PADDING.paddingLeft} maxW="450px">
          <Text fontSize={25} fontWeight={500}>
            SignIn
          </Text>

          <FormControl isInvalid={emailErr() !== ''}>
            <Input
              placeholder="Email"
              returnKeyType="next"
              value={curr.context.email}
              onChangeText={text => {
                send({
                  type: 'ENTER_EMAIL',
                  value: text,
                });
              }}
              onSubmitEditing={() => {
                PasswordRef.current && PasswordRef.current.focus();
              }}
            />
            <FormControl.ErrorMessage pl={3}>
              {emailErr()}
            </FormControl.ErrorMessage>
          </FormControl>
          <FormControl isInvalid={passwordErr() !== ''}>
            <Input
              ref={PasswordRef}
              placeholder="Password"
              returnKeyType="next"
              value={curr.context.password}
              onChangeText={text => {
                send({
                  type: 'ENTER_PASSWORD',
                  value: text,
                });
              }}
            />
            <FormControl.ErrorMessage pl={3}>
              {passwordErr()}
            </FormControl.ErrorMessage>
          </FormControl>

          <SubmitButton
            onPress={() => {
              send({
                type: 'ENTER_SUBMIT_LOGIN',
              });
            }}
            ifLoading={curr.matches('authenticating_login')}
          />
          <Flex direction="row" alignSelf="center">
            <Divider
              bg={currTheme + '.text'}
              thickness="1"
              my="auto"
              mx="2"
              w={100}
              orientation="horizontal"
            />
            <Text>Or</Text>
            <Divider
              bg={currTheme + '.text'}
              thickness="1"
              my="auto"
              mx="2"
              w={100}
              orientation="horizontal"
            />
          </Flex>
          <AuthButtons />

          <Box flexDir="row" alignSelf="center">
            <Text>Don't have an account? </Text>
            <Pressable
              onPress={() => {
                send({type: 'RESET'});
                navigation.navigate('Register');
              }}>
              <Text color="constants.primary" fontWeight={600}>
                Sign Up
              </Text>
            </Pressable>
          </Box>
        </Stack>
      </ScrollView>
    </Box>
  );
};

export default LoginScreen;
