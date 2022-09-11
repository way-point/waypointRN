import {useIsFocused} from '@react-navigation/native';
import {Box} from 'native-base';
import React, {useEffect, useRef} from 'react';
import {StyleSheet} from 'react-native';
import {Camera, useCameraDevices} from 'react-native-vision-camera';

const CameraScreen = () => {
  useEffect(() => {
    const get_perms = async () => {
      await Camera.requestCameraPermission();
      await Camera.requestMicrophonePermission();
    };
    get_perms();
  }, []);

  const isFocused = useIsFocused();

  const devices = useCameraDevices('wide-angle-camera');
  const device = devices.back;

  const camera = useRef<Camera>(null);

  if (device == null) {
    return <Box />;
  }
  return (
    <Camera
      ref={camera}
      style={StyleSheet.absoluteFill}
      device={device}
      isActive={isFocused}
      preset="photo"
      photo
    />
  );
};

export default CameraScreen;
