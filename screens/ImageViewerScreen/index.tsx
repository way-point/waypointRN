import React from 'react';
import {Box, Image} from 'native-base';
import {RouteProp, useRoute} from '@react-navigation/native';
import {RootStackParamList} from '../../navigation/types';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {
  GestureHandlerRootView,
  PinchGestureHandler,
  PinchGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Layout from '../../constants/Layout';
import {StyleSheet} from 'react-native';
import {feedDataItemProps} from '../../constants/types';
import Video from 'react-native-video';

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  video: {
    width: '100%',
    height: '100%',
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  flex: {
    flex: 1,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const Pinchable = ({item}: feedDataItemProps) => {
  const scale = useSharedValue(1);
  const focalX = useSharedValue(0);
  const focalY = useSharedValue(0);
  const width = Layout.window.width;
  const height = Layout.window.height;
  const AnimatedImage = Animated.createAnimatedComponent(Image);
  const AnimatedVideo = Animated.createAnimatedComponent(Video);

  const pinchHandler =
    useAnimatedGestureHandler<PinchGestureHandlerGestureEvent>({
      onActive: event => {
        scale.value = event.scale;
        focalX.value = event.focalX;
        focalY.value = event.focalY;
      },
      onEnd: () => {
        scale.value = withTiming(1);
      },
    });

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: focalX.value},
        {translateY: focalY.value},
        {translateX: -width / 2},
        {translateY: -height / 2},
        {scale: scale.value},
        {translateX: -focalX.value},
        {translateY: -focalY.value},
        {translateX: width / 2},
        {translateY: height / 2},
      ],
    };
  });

  const focalPointStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: focalX.value}, {translateY: focalY.value}],
    };
  });
  return (
    <GestureHandlerRootView style={styles.flex}>
      <PinchGestureHandler onGestureEvent={pinchHandler}>
        <Animated.View style={styles.flex}>
          {item.type === 'photo' && item.image && (
            <AnimatedImage
              alt="Image"
              resizeMode="contain"
              style={[styles.image, rStyle]}
              source={{uri: item.image}}
            />
          )}
          {item.type === 'video' && item.video && (
            <AnimatedVideo
              style={[styles.video, rStyle]}
              source={{uri: item.video.uri}}
              resizeMode="contain"
            />
          )}
          <Animated.View style={focalPointStyle} />
        </Animated.View>
      </PinchGestureHandler>
    </GestureHandlerRootView>
  );
};

const ImageViewerScreen = () => {
  const {item} = useRoute<RouteProp<RootStackParamList, 'ImageView'>>().params;
  return (
    <Box flex={1}>
      <Pinchable item={item} />
    </Box>
  );
};

export default ImageViewerScreen;
