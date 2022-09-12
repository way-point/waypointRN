import {menuOptionProps} from '../types';

const menuOptionsEvent: menuOptionProps[] = [
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

export default menuOptionsEvent;
