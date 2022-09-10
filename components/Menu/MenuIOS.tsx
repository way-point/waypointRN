import React from 'react';
import ContextMenu, {ContextMenuAction} from 'react-native-context-menu-view';

interface MenuIOSProps {
  children: React.ReactNode;
  menuActions: ContextMenuAction[];
}

const MenuIOS = ({children, menuActions}: MenuIOSProps) => {
  return (
    <ContextMenu
      actions={menuActions}
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
