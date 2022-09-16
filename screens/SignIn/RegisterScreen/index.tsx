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
import {TextInput} from 'react-native';
import {currentTheme, RegMachine} from '../../../constants/atoms';
import {SignInProp} from '../../../navigation/types';
import AuthButtons from '../AuthButtons';
import SubmitButton from '../../../components/SubmitButton';

const RegisterScreen = () => {
  const [currTheme] = useAtom(currentTheme);
  const navigation = useNavigation<SignInProp>();

  const PasswordRef = useRef<TextInput>(null);
  const ConfirmPasswordRef = useRef<TextInput>(null);

  const [curr, send] = useAtom(RegMachine);

  return (
    <Box flex={1}>
      <ScrollView
        contentContainerStyle={{justifyContent: 'center', flexGrow: 1}}>
        <Stack space={4} w="75%" maxW="450px" mx="auto">
          <Text fontSize={25} fontWeight={500}>
            SignUp
          </Text>

          <FormControl isInvalid={curr.matches('emailErr')}>
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
              Invalid Email
            </FormControl.ErrorMessage>
          </FormControl>

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
              ConfirmPasswordRef.current && ConfirmPasswordRef.current.focus();
            }}
          />
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

          <SubmitButton
            onPress={() => {
              console.log('test');
            }}
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
                navigation.navigate('Login');
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

export default RegisterScreen;
