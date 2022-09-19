import React from 'react';
import {Box, Image} from 'native-base';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {RootStackParamList} from '../../navigation/types';
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {
  GestureHandlerRootView,
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
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

interface SwipeToLeaveProps {
  children: React.ReactNode;
}

const SwipeToLeave = ({children}: SwipeToLeaveProps) => {
  const y = useSharedValue(0);
  const opacity = useSharedValue(1);
  const AnimatedBox = Animated.createAnimatedComponent(Box);

  const navigation = useNavigation();

  const gestureHandler =
    useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
      onActive: event => {
        y.value = event.translationY;
        opacity.value =
          100 / Math.abs(event.translationY === 0 ? 100 : event.translationY);
      },
      onEnd: event => {
        console.log(event.translationY);
        if (Math.abs(event.translationY) > 10) {
          runOnJS(navigation.goBack)();
        } else {
          y.value = withTiming(0);
          opacity.value = withTiming(1);
        }
      },
    });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: y.value,
        },
      ],
    };
  });

  const opacityStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  return (
    <AnimatedBox style={[styles.flex, opacityStyle]}>
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View style={[styles.flex, animatedStyle]}>
          {children}
        </Animated.View>
      </PanGestureHandler>
    </AnimatedBox>
  );
};

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
    <SwipeToLeave>
      <Pinchable item={item} />
    </SwipeToLeave>
  );
};

export default ImageViewerScreen;
