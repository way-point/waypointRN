import {MenuConfig} from 'react-native-ios-context-menu';

const menuConfigEvent: MenuConfig = {
  menuTitle: '',
  menuItems: [
    {
      actionKey: 'key-01',
      actionTitle: 'Join Event',
      icon: {
        type: 'IMAGE_SYSTEM',
        imageValue: {
          systemName: 'person.3.sequence',
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

export default menuConfigEvent;
