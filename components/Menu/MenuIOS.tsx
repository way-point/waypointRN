import React from 'react';
import {Alert} from 'react-native';
import {
  ContextMenuView,
  MenuConfig,
  MenuPreviewConfig,
  RenderItem,
} from 'react-native-ios-context-menu';

interface MenuIOSProps {
  children: React.ReactNode;
  menuConfig?: MenuConfig;
  preview?: {
    previewConfig: MenuPreviewConfig;
    previewRenderItem: RenderItem;
  };
}

const MenuIOS = ({children, menuConfig, preview}: MenuIOSProps) => {
  return (
    <ContextMenuView
      menuConfig={menuConfig}
      previewConfig={preview?.previewConfig}
      renderPreview={preview?.previewRenderItem}
      onPressMenuItem={({nativeEvent}) => {
        Alert.alert(
          'onPressMenuItem Event',
          `actionKey: ${nativeEvent.actionKey} - actionTitle: ${nativeEvent.actionTitle}`,
        );
      }}>
      {children}
    </ContextMenuView>
  );
};

export default MenuIOS;
