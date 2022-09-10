import {Box} from 'native-base';
import React from 'react';
import {Platform} from 'react-native';
import MenuIOS from './MenuIOS';

interface MenuProps {
  children: React.ReactNode;
}

const Menu: React.FC<MenuProps> = ({children}) => {
  if (Platform.OS === 'ios') {
    return <MenuIOS>{children}</MenuIOS>;
  }
  return <Box>{children}</Box>;
};

export default Menu;
