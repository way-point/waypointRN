import React from 'react';
import ContextMenu from 'react-native-context-menu-view';

interface MenuIOSProps {
  children: React.ReactNode;
}

const MenuIOS = ({children}: MenuIOSProps) => {
  return (
    <ContextMenu
      actions={[{title: 'Title 1'}, {title: 'Title 2'}]}
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
