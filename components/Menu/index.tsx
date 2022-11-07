import {Box} from 'native-base';
import React from 'react';
import {Platform} from 'react-native';
import {
  ContextMenuView,
  MenuConfig,
  MenuPreviewConfig,
  OnPressMenuPreviewEvent,
  RenderItem,
} from 'react-native-ios-context-menu';
import {copy_image, share_image} from '../../constants/Menu/menuConfigImage';
import {COPY, SHARE} from '../../constants/Menu/menuOptionConstants';

interface MenuProps {
  children: React.ReactNode;
  menuConfig?: MenuConfig;
  preview?: {
    previewConfig: MenuPreviewConfig;
    previewRenderItem: RenderItem;
  };
  metaData?: {
    imageURL?: string;
  };
  onPressMenuPreview?: OnPressMenuPreviewEvent;
}

const Menu = ({
  children,
  menuConfig,
  preview,
  metaData,
  onPressMenuPreview,
}: MenuProps) => {
  if (Platform.OS === 'ios') {
    return (
      <ContextMenuView
        menuConfig={menuConfig}
        previewConfig={preview?.previewConfig}
        renderPreview={preview?.previewRenderItem}
        onPressMenuPreview={onPressMenuPreview}
        onPressMenuItem={({nativeEvent}) => {
          switch (nativeEvent.actionKey) {
            case COPY:
              copy_image(metaData?.imageURL || '');
              break;
            case SHARE:
              share_image(metaData?.imageURL || '');
          }
        }}>
        {children}
      </ContextMenuView>
    );
  }
  return <Box bg="transparent">{children}</Box>;
};

export default Menu;
