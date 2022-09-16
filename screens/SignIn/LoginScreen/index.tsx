import {useNavigation} from '@react-navigation/native';
import {useAtom} from 'jotai';
import {
  Box,
  Divider,
  Flex,
  Input,
  Pressable,
  ScrollView,
  Stack,
  Text,
} from 'native-base';
import React, {useRef} from 'react';
import {StyleSheet, TextInput} from 'react-native';
import {currentTheme} from '../../../constants/atoms';
import {SignInProp} from '../../../navigation/types';
import AuthButtons from '../AuthButtons';
import SubmitButton from '../../../components/SubmitButton';

const styles = StyleSheet.create({
  scrollView: {
    justifyContent: 'center',
    flexGrow: 1,
  },
});

const LoginScreen = () => {
  const [currTheme] = useAtom(currentTheme);
  const navigation = useNavigation<SignInProp>();

  const PasswordRef = useRef<TextInput>(null);

  return (
    <Box flex={1}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Stack space={4} w="75%" maxW="450px" mx="auto">
          <Text fontSize={25} fontWeight={500}>
            SignIn
          </Text>

          <Input
            variant="filled"
            placeholder="Email"
            returnKeyType="next"
            onSubmitEditing={() => {
              PasswordRef.current && PasswordRef.current.focus();
            }}
          />
          <Input
            ref={PasswordRef}
            variant="filled"
            placeholder="Password"
            returnKeyType="done"
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
