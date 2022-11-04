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
import React, {useRef} from 'react';
import {StyleSheet, TextInput} from 'react-native';
import {currentTheme, RegMachine} from '../../../constants/atoms';
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

const RegisterScreen = () => {
  const [currTheme] = useAtom(currentTheme);
  const navigation = useNavigation<SignInProp>();

  const PasswordRef = useRef<TextInput>(null);
  const ConfirmPasswordRef = useRef<TextInput>(null);

  const [curr, send] = useAtom(RegMachine);

  const emailErr = () => {
    if (curr.matches('errors.invalidEmail')) {
      return 'invalid email';
    }
    if (curr.matches('errors.emailAlreadyInUse')) {
      return 'email already in use';
    }
    return '';
  };

  const passwordErr = () => {
    if (curr.matches('errors.invalidPassword')) {
      return 'invalid password. Must be at least 6 characters.';
    }
    if (curr.matches('errors.passwordsNotMatch')) {
      return "passwords don't match";
    }
    return '';
  };

  const confirmPasswordErr = () => {
    if (curr.matches('errors.passwordsNotMatch')) {
      return "passwords don't match";
    }
    return '';
  };

  console.log(curr.matches('authenticating'));

  return (
    <Box flex={1}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Stack space={4} px={SAFE_AREA_PADDING.paddingLeft} maxW="450px">
          <Text fontSize={25} fontWeight={500}>
            SignUp
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
              onSubmitEditing={() => {
                ConfirmPasswordRef.current &&
                  ConfirmPasswordRef.current.focus();
              }}
            />
            <FormControl.ErrorMessage pl={3}>
              {passwordErr()}
            </FormControl.ErrorMessage>
          </FormControl>

          <FormControl isInvalid={confirmPasswordErr() !== ''}>
            <Input
              ref={ConfirmPasswordRef}
              placeholder="Confirm Password"
              returnKeyType="done"
              value={curr.context.confirmPassword}
              onChangeText={text => {
                send({
                  type: 'ENTER_CONFIRM_PASSWORD',
                  value: text,
                });
              }}
            />
            <FormControl.ErrorMessage pl={3}>
              {confirmPasswordErr()}
            </FormControl.ErrorMessage>
          </FormControl>

          <SubmitButton
            onPress={() => {
              send({
                type: 'ENTER_SUBMIT',
              });
            }}
            ifLoading={curr.matches('authenticating')}
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
            <Text>Already have an account? </Text>
            <Pressable
              onPress={() => {
                navigation.navigate('Login');
              }}>
              <Text color="constants.primary" fontWeight={600}>
                Sign In
              </Text>
            </Pressable>
          </Box>
        </Stack>
      </ScrollView>
    </Box>
  );
};

export default RegisterScreen;
