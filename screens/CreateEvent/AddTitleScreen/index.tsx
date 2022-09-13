import {
  Box,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  Text,
  TextArea,
  useTheme,
} from 'native-base';
import React, {useEffect, useRef, useState} from 'react';
import {Keyboard, Platform, StyleSheet} from 'react-native';
import ProfileImage from '../../../components/ProfileImage';
import Layout, {SAFE_AREA_PADDING} from '../../../constants/Layout';
import {uri} from '../../../navigation';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useAtom} from 'jotai';
import {currentTheme} from '../../../constants/atoms';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Library from '../../../components/Library';
import {
  getCameraPermissionsAsync,
  launchCameraAsync,
  requestMediaLibraryPermissionsAsync,
} from 'expo-image-picker';
import {Album, getAlbumsAsync} from 'expo-media-library';

const styles = StyleSheet.create({
  scrollView: {
    marginTop: SAFE_AREA_PADDING.paddingTop,
    flexGrow: 1,
  },
  carrot: {
    paddingHorizontal: 1,
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  icon: {
    alignSelf: 'center',
    marginTop: 'auto',
    marginBottom: 'auto',
    padding: 5,
  },
});

const getPermissionAsync = async () => {
  const {status} = await requestMediaLibraryPermissionsAsync();
  return status === 'granted';
};

const getCameraPermsAsync = async () => {
  const {status} = await getCameraPermissionsAsync();
  return status === 'granted';
};

const openCamera = async () => {
  let result = await launchCameraAsync({allowsEditing: true});
  return result;
};

const AddTitleScreen = () => {
  const {colors} = useTheme();
  const [currTheme] = useAtom(currentTheme);
  const height = useSharedValue(0);
  const [albums, setAlbums] = useState([] as Album[]);

  const heightAnimatedStyle = useAnimatedStyle(() => {
    return {
      height: height.value,
    };
  });

  const [showImagePicker, setShowImagePicker] = useState(false);

  useEffect(() => {
    if (showImagePicker) {
      Keyboard.dismiss();
      height.value = withTiming(Layout.window.height / 3);
    }
    if (!showImagePicker) {
      height.value = withTiming(0);
    }
  }, [height, showImagePicker]);

  const descriptionRef = useRef(null);
  return (
    <Box bg="transparent" flex={1}>
      <ScrollView
        scrollEnabled={!showImagePicker}
        contentContainerStyle={styles.scrollView}>
        <Box p={SAFE_AREA_PADDING.paddingLeft} borderRadius={10} h="100%">
          <Box flexDir="row">
            <ProfileImage uri={uri} />
            <Box
              borderColor="constants.primary"
              flexDir="row"
              borderWidth={2}
              borderRadius={10}
              ml={3}
              px={1}>
              <Text color="constants.primary" px={1} my="auto">
                Public
              </Text>
              <Feather
                name="chevron-down"
                size={24}
                style={styles.carrot}
                color={colors.constants.primary}
              />
            </Box>
          </Box>
          <TextArea
            ref={descriptionRef}
            onFocus={() => {
              setShowImagePicker(false);
            }}
            autoCompleteType="off"
            keyboardType="twitter"
            fontSize={16}
            color={currTheme + '.text'}
            borderWidth={0}
            borderRadius={10}
            mt={5}
            placeholder="Description"
            w="100%"
          />
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={80}
            mt="auto"
            mb={SAFE_AREA_PADDING.paddingBottom}>
            <Box
              flexDir="row"
              mb={showImagePicker && Platform.OS === 'ios' ? -10 : 0}>
              <Pressable
                bg={currTheme + '.textField'}
                borderRadius={15}
                mr={5}
                onPress={async () => {
                  const loaded = await getPermissionAsync();
                  if (loaded) {
                    let als = await getAlbumsAsync({
                      includeSmartAlbums: true,
                    });
                    setAlbums(als);
                    setShowImagePicker(!showImagePicker);
                  }
                }}>
                {showImagePicker ? (
                  <AntDesign
                    name="close"
                    size={30}
                    style={styles.icon}
                    color={colors[currTheme].text}
                  />
                ) : (
                  <Feather
                    name="paperclip"
                    size={30}
                    style={styles.icon}
                    color={colors[currTheme].text}
                  />
                )}
              </Pressable>
              <Pressable
                onPress={async () => {
                  const loaded = await getCameraPermsAsync();
                  if (loaded) {
                    await openCamera();
                  }
                }}
                bg={currTheme + '.textField'}
                borderRadius={15}
                mr={5}>
                <Feather
                  name="camera"
                  size={30}
                  style={styles.icon}
                  color={colors[currTheme].text}
                />
              </Pressable>
              <Box bg={currTheme + '.textField'} borderRadius={15} mr={5}>
                <Feather
                  name="link"
                  size={30}
                  style={styles.icon}
                  color={colors[currTheme].text}
                />
              </Box>
            </Box>
          </KeyboardAvoidingView>
          <Animated.View style={heightAnimatedStyle}>
            <Library albums={albums} />
          </Animated.View>
        </Box>
      </ScrollView>
    </Box>
  );
};

export default AddTitleScreen;
