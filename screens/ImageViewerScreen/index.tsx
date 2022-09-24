import React from 'react';
import {Box, Image, Pressable, useTheme} from 'native-base';
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
import Layout, {SAFE_AREA_PADDING} from '../../constants/Layout';
import {StyleSheet} from 'react-native';
import {feedDataItemProps} from '../../constants/types';
import Video from 'react-native-video';
import {AntDesign, Feather} from '@expo/vector-icons';
import {useAtom} from 'jotai';
import {currentTheme} from '../../constants/atoms';

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

interface HeaderProps {
  animatedStyle: {
    transform: {
      translateY: number;
    }[];
  };
  opStyle: {
    opacity: number;
  };
}

const Header = ({animatedStyle, opStyle}: HeaderProps) => {
  const AnimatedBox = Animated.createAnimatedComponent(Box);
  const navigation = useNavigation();

  return (
    <AnimatedBox
      zIndex={2}
      style={[animatedStyle, opStyle]}
      position="absolute"
      width={Layout.window.width}
      height={SAFE_AREA_PADDING.paddingTop + 20}
      bg="constants.transparentDark">
      <Box
        position="absolute"
        bg="transparent"
        width={Layout.window.width}
        bottom={2}
        flexDir="row"
        px={SAFE_AREA_PADDING.paddingLeft}
        justifyContent="space-between">
        <Pressable
          onPress={() => {
            navigation.goBack();
          }}>
          <AntDesign name="close" size={20} color="white" />
        </Pressable>
        <Pressable>
          <Feather name="share" size={20} color="white" />
        </Pressable>
      </Box>
    </AnimatedBox>
  );
};

const SwipeToLeave = ({children}: SwipeToLeaveProps) => {
  const y = useSharedValue(0);
  const opacity = useSharedValue(1);
  const AnimatedBox = Animated.createAnimatedComponent(Box);

  const navigation = useNavigation();

  const back = () => {
    setTimeout(() => {
      navigation.goBack();
    }, 20);
    opacity.value = withTiming(0, {duration: 20});
  };

  const gestureHandler =
    useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
      onActive: event => {
        y.value = event.translationY;
        opacity.value =
          50 / Math.abs(event.translationY === 0 ? 100 : event.translationY);
      },
      onEnd: event => {
        console.log(event.translationY);
        if (Math.abs(event.translationY) > 150) {
          runOnJS(back)();
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

  const animatedHeaderStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: -Math.abs(y.value),
        },
      ],
    };
  });

  const {colors} = useTheme();
  const [currTheme] = useAtom(currentTheme);

  const opacity_color = (color: string, op: number) => {
    'worklet';
    let pre = color.split(')')[0];
    let new_pre = pre.slice(0, -1) + op + ')';
    return new_pre;
  };

  const opacityStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: opacity_color(
        colors[currTheme].background,
        opacity.value,
      ),
    };
  });

  const opStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  return (
    <AnimatedBox style={[styles.flex, opacityStyle]}>
      <Header animatedStyle={animatedHeaderStyle} opStyle={opStyle} />
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
