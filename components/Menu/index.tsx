import {Box} from 'native-base';
import React from 'react';
import {Platform} from 'react-native';
import {menuOptionProps} from '../../constants/types';
import MenuIOS from './MenuIOS';

interface MenuProps {
  children: React.ReactNode;
  menuOptions: menuOptionProps[];
}

const Menu = ({children, menuOptions}: MenuProps) => {
  if (Platform.OS === 'ios') {
    return <MenuIOS menuOptions={menuOptions}>{children}</MenuIOS>;
  }
  return <Box bg="transparent">{children}</Box>;
};

export default Menu;
