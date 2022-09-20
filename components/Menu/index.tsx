import {Box} from 'native-base';
import React from 'react';
import {Platform} from 'react-native';
import {
  MenuConfig,
  MenuPreviewConfig,
  RenderItem,
} from 'react-native-ios-context-menu';
import MenuIOS from './MenuIOS';

interface MenuProps {
  children: React.ReactNode;
  menuConfig?: MenuConfig;
  preview?: {
    previewConfig: MenuPreviewConfig;
    previewRenderItem: RenderItem;
  };
}

const Menu = ({children, menuConfig, preview}: MenuProps) => {
  if (Platform.OS === 'ios') {
    return (
      <MenuIOS menuConfig={menuConfig} preview={preview}>
        {children}
      </MenuIOS>
    );
  }
  return <Box bg="transparent">{children}</Box>;
};

export default Menu;
