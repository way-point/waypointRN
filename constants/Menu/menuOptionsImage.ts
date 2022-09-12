import {menuOptionProps} from '../types';

const menuOptionsImage: menuOptionProps[] = [
  {
    onPress: () => {
      console.log('testing....');
    },
    menuAction: {title: 'Save Photo', systemIcon: 'square.and.arrow.down'},
  },
  {
    onPress: () => {
      console.log('testing 2...');
    },
    menuAction: {title: 'Share With...', systemIcon: 'square.and.arrow.up'},
  },
];

export default menuOptionsImage;
