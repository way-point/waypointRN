// File is pretty tightly coupled. Might need to refactor later
import {
  Box,
  KeyboardAvoidingView,
  Pressable,
  Text,
  TextArea,
  useTheme,
} from 'native-base';
import React, {useEffect, useRef, useState} from 'react';
import {
  ImageBackground,
  Keyboard,
  Platform,
  StyleSheet,
  TextInput,
} from 'react-native';
import ProfileImage from '../../../components/ProfileImage';
import Layout, {SAFE_AREA_PADDING} from '../../../constants/Layout';
import {Feather, AntDesign} from '@expo/vector-icons';
import {useAtom} from 'jotai';
import {currentTheme, EventMachine} from '../../../constants/atoms';
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
import TimeFormat from '../../../constants/timeFormat';
import {useNavigation} from '@react-navigation/native';
import {RootProp} from '../../../navigation/types';
import Video from 'react-native-video';
import {feedDataProps} from '../../../constants/types';
import auth from '@react-native-firebase/auth';

const styles = StyleSheet.create({
  scrollView: {
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
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  iconX: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 20,
  },
  transparent: {backgroundColor: 'transparent'},
});

const getPermissionAsync = async () => {
  const {status} = await requestMediaLibraryPermissionsAsync();
  return status === 'granted';
};

const getCameraPermsAsync = async () => {
  const {status} = await requestCameraPermissionsAsync();
  return status === 'granted';
};

const AddTitleScreen = () => {
  const {colors} = useTheme();
  const [currTheme] = useAtom(currentTheme);
  const height = useSharedValue(0);
  const [albums, setAlbums] = useState([] as Album[]);
  const [curr, send] = useAtom(EventMachine);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const heightAnimatedStyle = useAnimatedStyle(() => {
    return {
      height: height.value,
    };
  });

  const [showImagePicker, setShowImagePicker] = useState(false);
  const navigation = useNavigation<RootProp>();

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
    if (!result.cancelled) {
      send({
        type: 'ENTER_ATTACHMENT',
        value: {attachmentType: result.type || 'image', uri: result.uri},
      });
    }
    return result;
  };

  const [hostId, setHostId] = useState('');

  useEffect(() => {
    const getHost = async () => {
      const jwt_token = await auth().currentUser?.getIdToken();
      setHostId(jwt_token || '');
    };
    getHost();
  }, []);

  const postData: feedDataProps = {
    host_id: hostId,
    attachment: {
      attachment_type: curr.context.attachment.type || 'photo',
      url: curr.context.attachment.uri,
      duration: curr.context.attachment.duration,
    },
    event_details: {
      address: curr.context.eventLocation.address || '',
      coordinate: {
        longitude: curr.context.eventLocation.coordinate.longitude || 0,
        latitude: curr.context.eventLocation.coordinate.latitude || 0,
        geoPoint: [
          curr.context.eventLocation.coordinate.longitude,
          curr.context.eventLocation.coordinate.latitude,
        ],
      },
      time_of_event: {
        start_time: curr.context.eventDate.startDate?.toISOString() || '',
        end_time: curr.context.eventDate.endDate?.toISOString() || '',
      },
    },
    description: curr.context.message,
  };

  const descriptionRef = useRef<TextInput>(null);
  return (
    <Box bg="transparent" flex={1}>
      <BottomSheetModalProvider>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'android' ? 10 : 90}
          style={styles.scrollView}>
          <Box
            bg="transparent"
            p={SAFE_AREA_PADDING.paddingLeft}
            borderRadius={10}
            h="100%">
            <Box bg="transparent" flexDir="row" justifyContent="space-between">
              <Box bg="transparent" flexDir="row">
                <ProfileImage id={auth().currentUser?.uid} />
              </Box>
              <Pressable
                bg="constants.primary"
                _disabled={{
                  opacity: 0.5,
                }}
                disabled={curr.context.message.length === 0}
                onPress={() => {
                  navigation.navigate('AddDate');
                }}
                px={2}
                py={1}
                my="auto"
                borderRadius={10}>
                <Text color="white">Next</Text>
              </Pressable>
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
              value={curr.context.message}
              onChangeText={text => {
                send({type: 'ENTER_MESSAGE', value: text});
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

            {curr.context.attachment.type === 'photo' &&
              curr.context.attachment.uri && (
                <Pressable
                  onPress={() => {
                    navigation.navigate('ImageView', {item: postData});
                  }}>
                  <ImageBackground
                    source={{uri: curr.context.attachment.uri}}
                    style={styles.iconX}
                    resizeMode="cover">
                    <Pressable
                      onPress={() => {
                        send({
                          type: 'ENTER_ATTACHMENT',
                          value: {attachmentType: '', uri: ''},
                        });
                      }}
                      bg={currTheme + '.background'}
                      borderRadius={15}
                      alignSelf="flex-end"
                      mr={2}
                      mt={2}>
                      <AntDesign
                        name="close"
                        size={20}
                        style={styles.icon}
                        color={colors[currTheme].text}
                      />
                    </Pressable>
                  </ImageBackground>
                </Pressable>
              )}

            {curr.context.attachment.type === 'video' &&
              curr.context.attachment.uri && (
                <Box bg="transparent">
                  <Video
                    source={{uri: curr.context.attachment.uri}}
                    style={styles.iconX}
                    paused
                    controls={false}
                    poster={curr.context.attachment.uri}
                    resizeMode="cover"
                  />
                  <Pressable
                    position="absolute"
                    onPress={() => {
                      send({
                        type: 'ENTER_ATTACHMENT',
                        value: {attachmentType: '', uri: ''},
                      });
                    }}
                    bg={currTheme + '.background'}
                    borderRadius={15}
                    alignSelf="flex-end"
                    top={30}
                    right={1}>
                    <AntDesign
                      name="close"
                      size={20}
                      style={styles.icon}
                      color={colors[currTheme].text}
                    />
                  </Pressable>

                  <Box
                    position="absolute"
                    bg="constants.transparentDark"
                    alignSelf="flex-end"
                    bottom={0}
                    right={3}
                    p={1}
                    borderRadius={8}
                    mb={3}>
                    <Text>{TimeFormat(curr.context.attachment.duration)}</Text>
                  </Box>
                </Box>
              )}
            <Box mt="auto" bg="transparent">
              <Box
                flexDir="row"
                bg="transparent"
                display={showImagePicker ? 'none' : 'flex'}>
                <Pressable
                  mr={5}
                  bg={currTheme + '.background'}
                  borderRadius={15}
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
                      size={20}
                      style={styles.icon}
                      color={colors.constants.primary}
                    />
                  ) : (
                    <Feather
                      name="paperclip"
                      size={20}
                      style={styles.icon}
                      color={colors.constants.primary}
                    />
                  )}
                </Pressable>
                <Pressable
                  bg={currTheme + '.background'}
                  borderRadius={15}
                  onPress={async () => {
                    const loaded = await getCameraPermsAsync();
                    if (loaded) {
                      await openCamera();
                    }
                  }}
                  mr={5}>
                  <Feather
                    name="camera"
                    size={20}
                    style={styles.icon}
                    color={colors.constants.primary}
                  />
                </Pressable>
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
