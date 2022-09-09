import React from 'react';
import {Platform} from 'react-native';
import MenuIOS from './MenuIOS';

interface MenuProps {
  children: React.ReactNode;
}

const Menu = ({children}: MenuProps) => {
  if (Platform.OS === 'ios') {
    return <MenuIOS>{children}</MenuIOS>;
  }
  return children;
};

export default Menu;
