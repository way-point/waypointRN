import {useIsFocused} from '@react-navigation/native';
import {Box, Pressable} from 'native-base';
import React, {useEffect, useRef, useState} from 'react';
import {Platform, StyleSheet} from 'react-native';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import {SAFE_AREA_PADDING} from '../../constants/Layout';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {BlurView} from '@react-native-community/blur';

const CameraScreen = () => {
  const [cameraPosition, setCameraPosition] = useState<'front' | 'back'>(
    'back',
  );
  const [hasFlash, setHasFlash] = useState(false);
  useEffect(() => {
    const get_perms = async () => {
      await Camera.requestCameraPermission();
      await Camera.requestMicrophonePermission();
    };
    get_perms();
  }, []);

  const devices = useCameraDevices();
  const device = devices[cameraPosition];

  const isFocused = useIsFocused();

  const camera = useRef<Camera>(null);

  if (device == null) {
    return <Box />;
  }

  const take_photo = async () => {
    if (camera.current) {
      if (Platform.OS === 'android') {
        const photo = await camera.current.takeSnapshot({
          quality: 85,
          skipMetadata: true,
          flash: hasFlash ? 'on' : 'off',
        });
        console.log(photo);
      } else {
        const photo = await camera.current.takePhoto({
          skipMetadata: false,
          flash: hasFlash ? 'on' : 'off',
        });
        console.log(photo);
      }
    }
  };

  return (
    <Camera
      ref={camera}
      photo
      style={StyleSheet.absoluteFill}
      device={device}
      isActive={isFocused}
      preset="photo">
      <BlurView style={styles.captureLine} blurAmount={1}>
        <Pressable
          onPress={() => {
            setHasFlash(!hasFlash);
          }}>
          <Ionicons
            name={hasFlash ? 'flash' : 'flash-off'}
            size={40}
            color="white"
          />
        </Pressable>
        <Pressable
          onPress={() => {
            take_photo();
          }}>
          <Box
            size={78}
            borderRadius={39}
            bg="transparent"
            borderWidth={5}
            borderColor="white"
          />
        </Pressable>
        <Pressable
          onPress={() => {
            setCameraPosition(cameraPosition === 'back' ? 'front' : 'back');
          }}>
          <Ionicons name="camera-reverse-outline" size={40} color="white" />
        </Pressable>
      </BlurView>
    </Camera>
  );
};

const styles = StyleSheet.create({
  captureLine: {
    position: 'absolute',
    flexDirection: 'row',
    bottom: SAFE_AREA_PADDING.paddingBottom,
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '95%',
    borderRadius: 10,
    paddingVertical: 10,
    alignSelf: 'center',
  },
});

export default CameraScreen;
