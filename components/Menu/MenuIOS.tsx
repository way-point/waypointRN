import React from 'react';
import ContextMenu from 'react-native-context-menu-view';
import {menuOptionProps} from '../../constants/types';

interface MenuIOSProps {
  children: React.ReactNode;
  menuOptions: menuOptionProps[];
}

const MenuIOS = ({children, menuOptions}: MenuIOSProps) => {
  const menuActions = [];

  for (let i = 0; i < menuOptions.length; i++) {
    menuActions.push(menuOptions[i].menuAction);
  }

  return (
    <ContextMenu
      actions={menuActions}
      onPress={({nativeEvent}) => {
        menuOptions[nativeEvent.index].onPress();
      }}>
      {children}
    </ContextMenu>
  );
};

export default MenuIOS;
