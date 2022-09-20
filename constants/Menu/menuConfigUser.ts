import {MenuConfig} from 'react-native-ios-context-menu';

const menuConfigUser: MenuConfig = {
  menuTitle: '',
  menuItems: [
    {
      actionKey: 'key-01',
      actionTitle: 'Follow',
      icon: {
        type: 'IMAGE_SYSTEM',
        imageValue: {
          systemName: 'person.crop.circle.badge.plus',
        },
      },
    },
    {
      actionKey: 'key-03',
      actionTitle: 'Report',
      menuAttributes: ['destructive'],
      icon: {
        type: 'IMAGE_SYSTEM',
        imageValue: {
          systemName: 'flag.fill',
        },
      },
    },
  ],
};

export default menuConfigUser;
