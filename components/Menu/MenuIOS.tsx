import React from 'react';
import ContextMenu from 'react-native-context-menu-view';

interface MenuIOSProps {
  children: React.ReactNode;
}

const MenuIOS = ({children}: MenuIOSProps) => {
  return (
    <ContextMenu
      actions={[
        {title: 'Follow', systemIcon: 'person'},
        {title: 'Share', systemIcon: 'square.and.arrow.up'},
        {title: 'Report', systemIcon: 'flag.fill', destructive: true},
      ]}
      onPress={e => {
        console.warn(
          `Pressed ${e.nativeEvent.name} at index ${e.nativeEvent.index}`,
        );
      }}>
      {children}
    </ContextMenu>
  );
};

export default MenuIOS;
