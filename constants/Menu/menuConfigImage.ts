import {setImageAsync} from 'expo-clipboard';
import {MenuConfig} from 'react-native-ios-context-menu';
import RNFetchBlob from 'rn-fetch-blob';
import {COPY, SHARE} from './menuOptionConstants';
import Share from 'react-native-share';

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
      actionKey: SHARE,
      actionTitle: SHARE,
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

export const share_image = async (url: string) => {
  Share.open({url: url})
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      err && console.log(err);
    });
};
