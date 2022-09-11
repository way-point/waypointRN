import {menuOptionProps} from '../../constants/types';

export const menuOptionsImage: menuOptionProps[] = [
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

export const menuOptionsBox: menuOptionProps[] = [
  {
    onPress: () => {
      console.log('let the party start....');
    },
    menuAction: {title: 'Join Event', systemIcon: 'person.3.sequence'},
  },
  {
    onPress: () => {
      console.log('testing 2...');
    },
    menuAction: {title: 'Share With...', systemIcon: 'square.and.arrow.up'},
  },
  {
    onPress: () => {
      console.log('testing 2...');
    },
    menuAction: {title: 'Report', systemIcon: 'flag.fill', destructive: true},
  },
];
