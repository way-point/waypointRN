import {MenuConfig} from 'react-native-ios-context-menu';

const menuConfigImage: MenuConfig = {
  menuTitle: '',
  menuItems: [
    {
      actionKey: 'key-01',
      actionTitle: 'Save Photo',
      icon: {
        type: 'IMAGE_SYSTEM',
        imageValue: {
          systemName: 'square.and.arrow.down',
        },
      },
    },
    {
      actionKey: 'key-02',
      actionTitle: 'Share With...',
      icon: {
        type: 'IMAGE_SYSTEM',
        imageValue: {
          systemName: 'square.and.arrow.up',
        },
      },
    },
  ],
};

export default menuConfigImage;
