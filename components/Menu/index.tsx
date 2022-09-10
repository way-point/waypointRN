import {Box} from 'native-base';
import React from 'react';
import {Platform} from 'react-native';
import {ContextMenuAction} from 'react-native-context-menu-view';
import MenuIOS from './MenuIOS';

interface MenuProps {
  children: React.ReactNode;
  menuActions: ContextMenuAction[];
}

const Menu: React.FC<MenuProps> = ({children, menuActions}) => {
  if (Platform.OS === 'ios') {
    return <MenuIOS menuActions={menuActions}>{children}</MenuIOS>;
  }
  return <Box>{children}</Box>;
};

export default Menu;
