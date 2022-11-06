import {Box} from 'native-base';
import React from 'react';
import {MenuPreviewConfig, RenderItem} from 'react-native-ios-context-menu';
import EventDetailsScreen from '../../screens/CreateEvent/EventDetailScreen';
import ProfileScreen from '../../screens/ProfileScreen';

export const menuUserPreviewConfig: MenuPreviewConfig = {
  previewType: 'CUSTOM',
  previewSize: 'STRETCH',
};

export const menuUserRenderItem: RenderItem = () => {
  return (
    <Box>
      <ProfileScreen />
    </Box>
  );
};

export const menuEventRenderItem: RenderItem = () => {
  return (
    <Box>
      <EventDetailsScreen />
    </Box>
  );
};
