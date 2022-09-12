import {Dimensions, Platform} from 'react-native';
import StaticSafeAreaInsets from 'react-native-static-safe-area-insets';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export const CONTENT_SPACING = 15;

const SAFE_BOTTOM =
  Platform.select({
    ios: StaticSafeAreaInsets.safeAreaInsetsBottom,
  }) ?? 0;

export const SAFE_AREA_PADDING = {
  paddingLeft: StaticSafeAreaInsets.safeAreaInsetsLeft + CONTENT_SPACING,
  paddingTop: StaticSafeAreaInsets.safeAreaInsetsTop + CONTENT_SPACING,
  paddingRight: StaticSafeAreaInsets.safeAreaInsetsRight + CONTENT_SPACING,
  paddingBottom: SAFE_BOTTOM + CONTENT_SPACING,
};

export const CONTAINER_WIDTH =
  width - SAFE_AREA_PADDING.paddingLeft - SAFE_AREA_PADDING.paddingRight;

export default {
  window: {
    width,
    height,
  },
  isSmallDevice: width < 375,
};
