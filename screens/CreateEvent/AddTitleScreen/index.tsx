import {
  Box,
  KeyboardAvoidingView,
  Pressable,
  Text,
  TextArea,
  useTheme,
} from 'native-base';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  ImageBackground,
  Keyboard,
  Platform,
  StyleSheet,
  TextInput,
} from 'react-native';
import ProfileImage from '../../../components/ProfileImage';
import Layout, {SAFE_AREA_PADDING} from '../../../constants/Layout';
import {uri} from '../../../navigation';
import {Feather, AntDesign} from '@expo/vector-icons';
import {useAtom} from 'jotai';
import {currentTheme} from '../../../constants/atoms';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Library from '../../../components/Library';
import {
  launchCameraAsync,
  requestCameraPermissionsAsync,
  requestMediaLibraryPermissionsAsync,
} from 'expo-image-picker';
import {Album, getAlbumsAsync} from 'expo-media-library';
import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import ChooseEvents from '../../../components/ChooseEvents';

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
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  radius: {
    borderTopEndRadius: 10,
  },
  iconX: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 20,
  },
});

const getPermissionAsync = async () => {
  const {status} = await requestMediaLibraryPermissionsAsync();
  return status === 'granted';
};

const getCameraPermsAsync = async () => {
  const {status} = await requestCameraPermissionsAsync();
  console.log(status);
  return status === 'granted';
};

const AddTitleScreen = () => {
  const {colors} = useTheme();
  const [currTheme] = useAtom(currentTheme);
  const height = useSharedValue(0);
  const [albums, setAlbums] = useState([] as Album[]);

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = useMemo(() => ['25%', '50%'], []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log(index);
    if (index === -1 && descriptionRef.current) {
      descriptionRef.current.focus();
    }
  }, []);
  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const heightAnimatedStyle = useAnimatedStyle(() => {
    return {
      height: height.value,
    };
  });

  const [showImagePicker, setShowImagePicker] = useState(false);

  useEffect(() => {
    if (showImagePicker) {
      Keyboard.dismiss();
      height.value = withTiming(Layout.window.height / 2);
    }
    if (!showImagePicker) {
      height.value = withTiming(0);
    }
  }, [height, showImagePicker]);

  const openCamera = async () => {
    let result = await launchCameraAsync({allowsEditing: true});
    setShowImagePicker(false);
    if (descriptionRef.current) {
      descriptionRef.current.focus();
    }
    return result;
  };

  const descriptionRef = useRef<TextInput>(null);
  return (
    <Box bg="transparent" flex={1}>
      <BottomSheetModalProvider>
        <KeyboardAvoidingView
          bg={currTheme + '.background'}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'android' ? 10 : 0}
          style={styles.scrollView}>
          <Box p={SAFE_AREA_PADDING.paddingLeft} borderRadius={10} h="100%">
            <Box flexDir="row">
              <ProfileImage uri={uri} />
              <Box my="auto">
                <Pressable
                  onPress={() => {
                    Keyboard.dismiss();
                    handlePresentModalPress();
                  }}
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
                </Pressable>
                <BottomSheetModal
                  stackBehavior="push"
                  handleStyle={[
                    {backgroundColor: colors[currTheme].textField},
                    styles.radius,
                  ]}
                  handleIndicatorStyle={{
                    backgroundColor: colors[currTheme].text,
                  }}
                  ref={bottomSheetModalRef}
                  index={1}
                  snapPoints={snapPoints}
                  onChange={handleSheetChanges}>
                  <ChooseEvents />
                </BottomSheetModal>
              </Box>
            </Box>
            <TextArea
              autoFocus
              ref={descriptionRef}
              onFocus={() => {
                setShowImagePicker(false);
                if (bottomSheetModalRef.current) {
                  bottomSheetModalRef.current.close();
                }
              }}
              allowFontScaling
              autoCompleteType="off"
              keyboardType="twitter"
              fontSize={16}
              color={currTheme + '.text'}
              borderWidth={0}
              borderRadius={10}
              mt={5}
              placeholder="What's the occasion?"
              w="100%"
            />
            <ImageBackground
              source={{uri: uri}}
              style={styles.iconX}
              resizeMode="cover">
              <Pressable
                bg={currTheme + '.textField'}
                borderRadius={15}
                alignSelf="flex-end"
                mr={2}
                mt={2}>
                <AntDesign
                  name="close"
                  size={30}
                  style={styles.icon}
                  color={colors[currTheme].text}
                />
              </Pressable>
            </ImageBackground>
            <Box mt="auto">
              <Box flexDir="row" display={showImagePicker ? 'none' : 'flex'}>
                <Pressable
                  bg={currTheme + '.textField'}
                  borderRadius={15}
                  mr={5}
                  onPress={async () => {
                    const loaded = await getPermissionAsync();
                    if (loaded) {
                      getAlbumsAsync({
                        includeSmartAlbums: true,
                      }).then(res => {
                        setAlbums(res);
                      });
                      if (showImagePicker) {
                        if (descriptionRef.current) {
                          descriptionRef.current.focus();
                        }
                      }
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
            </Box>
            <Animated.View style={heightAnimatedStyle}>
              <Library
                albums={albums}
                setShowImagePicker={setShowImagePicker}
                descriptionRef={descriptionRef}
              />
            </Animated.View>
          </Box>
        </KeyboardAvoidingView>
      </BottomSheetModalProvider>
    </Box>
  );
};

export default AddTitleScreen;
