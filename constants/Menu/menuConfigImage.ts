import {setImageAsync} from 'expo-clipboard';
import {MenuConfig} from 'react-native-ios-context-menu';
import RNFetchBlob from 'rn-fetch-blob';
import {COPY} from './menuOptionConstants';

const menuConfigImage: MenuConfig = {
  menuTitle: '',
  menuItems: [
    {
      actionKey: COPY,
      actionTitle: COPY,
      icon: {
        type: 'IMAGE_SYSTEM',
        imageValue: {
          systemName: 'doc.on.doc',
        },
      },
    },
    {
      actionKey: 'key-02',
      actionTitle: 'Save Photo',
      icon: {
        type: 'IMAGE_SYSTEM',
        imageValue: {
          systemName: 'square.and.arrow.down',
        },
      },
    },
    {
      actionKey: 'key-03',
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

export const copy_image = async (url: string) => {
  const fs = RNFetchBlob.fs;
  let imagePath: string | null = null;
  console.log('test');
  RNFetchBlob.config({
    fileCache: true,
  })
    .fetch('GET', url)
    .then(resp => {
      imagePath = resp.path();
      return resp.readFile('base64');
    })
    .then(base64Data => {
      setImageAsync(base64Data);
      return fs.unlink(imagePath || '');
    });
};
