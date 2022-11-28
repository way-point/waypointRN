import React, {useEffect, useState} from 'react';
import {Box, Pressable, ScrollView, Stack, Text, useTheme} from 'native-base';
import {StyleSheet} from 'react-native';
import SubmitButton from '../../../components/SubmitButton';
import {AntDesign} from '@expo/vector-icons';
import {useAtom} from 'jotai';
import {currentTheme, RegMachine} from '../../../constants/atoms';
import auth from '@react-native-firebase/auth';
import {SAFE_AREA_PADDING} from '../../../constants/Layout';
import {useNavigation} from '@react-navigation/native';
import {SignInProp} from '../../../navigation/types';

const styles = StyleSheet.create({
  scrollView: {
    justifyContent: 'center',
    flexGrow: 1,
  },
  icon: {
    alignSelf: 'center',
    marginVertical: 20,
  },
});

const sendEmailVerification = () => {
  if (auth().currentUser) {
    auth().currentUser?.sendEmailVerification();
  }
};

const EmailVerifyScreen = () => {
  const {colors} = useTheme();
  const [currTheme] = useAtom(currentTheme);
  const [curr, send] = useAtom(RegMachine);
  const navigation = useNavigation<SignInProp>();

  const [ifResendLinkClicked, setIfResendLinkClicked] = useState(false);
  useEffect(() => {
    if (ifResendLinkClicked) {
      sendEmailVerification();
      setTimeout(() => {
        setIfResendLinkClicked(false);
      }, 3000);
    }
  }, [ifResendLinkClicked]);

  useEffect(() => {
    if (curr.matches('attachUsername')) {
      navigation.navigate('Username');
    }
  }, [curr, navigation]);

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
            Verification Required
          </Text>
          <AntDesign
            name="mail"
            style={styles.icon}
            size={100}
            color={colors[currTheme].text}
          />
          <Text opacity={0.5} px={SAFE_AREA_PADDING.paddingLeft}>
            We sent a link to your email. Please click the link to verify your
            email.
          </Text>

          <SubmitButton
            onPress={() => {
              auth()
                .currentUser?.reload()
                .then(() => {
                  send({type: 'ENTER_VERIFY'});
                });
            }}
            submitText="Verify"
          />
          <Pressable
            disabled={ifResendLinkClicked}
            onPress={() => {
              setIfResendLinkClicked(true);
            }}
            p={3}
            borderRadius={8}>
            <Text
              alignSelf="center"
              color={ifResendLinkClicked ? 'green.300' : 'constants.primary'}
              fontSize={18}>
              {ifResendLinkClicked ? 'Link sent' : 'Resend link'}
            </Text>
          </Pressable>
        </Stack>
      </ScrollView>
    </Box>
  );
};

export default EmailVerifyScreen;
