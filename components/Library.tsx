import React, {useEffect, useRef, useState} from 'react';
import {Box, FlatList, Pressable, Text, useTheme} from 'native-base';
import {FlatList as FL, TextInput} from 'react-native';
import {StyleSheet, ImageBackground} from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import Layout, {CONTAINER_WIDTH} from '../constants/Layout';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {useAtom} from 'jotai';
import {currentTheme, EventMachine} from '../constants/atoms';
import {Feather, AntDesign} from '@expo/vector-icons';
// @ts-ignore
import RNConvertPhAsset from 'react-native-convert-ph-asset';
import {
  launchImageLibraryAsync,
  MediaTypeOptions,
  requestMediaLibraryPermissionsAsync,
} from 'expo-image-picker';
import TimeFormat from '../constants/timeFormat';

interface LibraryProps {
  albums: MediaLibrary.Album[];
  setShowImagePicker: React.Dispatch<React.SetStateAction<boolean>>;
  descriptionRef: React.MutableRefObject<TextInput | null>;
}

const pickImage = async () => {
  let result = await launchImageLibraryAsync({
    mediaTypes: MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  return result;
};

const getPermissionAsync = async () => {
  const {status} = await requestMediaLibraryPermissionsAsync();
  return status === 'granted';
};

const Library: React.FC<LibraryProps> = ({
  albums,
  setShowImagePicker,
  descriptionRef,
}) => {
  const [photos, setPhotos] = useState(
    undefined as MediaLibrary.PagedInfo<MediaLibrary.Asset> | undefined,
  );

  const {colors} = useTheme();
  const [currTheme] = useAtom(currentTheme);
  const [, send] = useAtom(EventMachine);

  const styles = StyleSheet.create({
    paddingBottom: {
      paddingBottom: 60,
    },
    flatlistPadding: {
      padding: 1,
    },
    videoText: {
      backgroundColor: colors.constants.transparentDark,
      paddingHorizontal: 1,
      paddingVertical: 1,
      borderRadius: 5,
      overflow: 'hidden',
      color: 'white',
    },
    icon: {
      alignSelf: 'center',
      marginTop: 'auto',
      marginBottom: 'auto',
      padding: 5,
    },
  });

  albums.sort((a, b) => b.assetCount - a.assetCount);

  let als = [];
  for (let i = 0; i < albums.length; i++) {
    als.push({label: albums[i].title, value: `${i}`});
    if (i > 5) {
      break;
    }
  }

  const index = 0;
  const flatListRef = useRef<FL>(null);

  useEffect(() => {
    const get_pics = async (album: MediaLibrary.Album) => {
      if (album) {
        let getPhotos = await MediaLibrary.getAlbumAsync(album.title);
        let getAllPhotos = await MediaLibrary.getAssetsAsync({
          first: 50,
          album: getPhotos,
          sortBy: 'creationTime',
          mediaType: ['photo', 'video'],
        });
        setPhotos(getAllPhotos);
      }
    };

    get_pics(albums[index]);
    flatListRef.current?.scrollToOffset({animated: false, offset: 0});
  }, [albums, index]);

  return (
    <Box pt={5} bg="transparent">
      <Box flexDir="row" mb={5} bg="transparent">
        <Pressable
          bg={currTheme + '.background'}
          borderRadius={15}
          mr={5}
          onPress={() => {
            setShowImagePicker(false);
            if (descriptionRef.current) {
              descriptionRef.current.focus();
            }
          }}>
          <AntDesign
            name="close"
            size={30}
            style={styles.icon}
            color={colors[currTheme].text}
          />
        </Pressable>
        <Pressable
          bg={currTheme + '.background'}
          borderRadius={15}
          mr={5}
          onPress={async () => {
            const granted = await getPermissionAsync();
            if (granted) {
              await pickImage();
            }
          }}>
          <Feather
            name="image"
            size={30}
            style={styles.icon}
            color={colors[currTheme].text}
          />
        </Pressable>
      </Box>
      <FlatList
        ref={flatListRef}
        style={{height: Layout.window.height / 2}}
        contentContainerStyle={styles.paddingBottom}
        data={photos?.assets}
        numColumns={3}
        renderItem={item => {
          const e = item.item;
          const i = item.index;

          return (
            <TouchableWithoutFeedback
              key={i}
              style={styles.flatlistPadding}
              onPress={async () => {
                let uri = e.uri;
                if (uri.startsWith('ph://') && e.mediaType === 'video') {
                  const data = await RNConvertPhAsset.convertVideoFromUrl({
                    url: uri,
                    convertTo: 'mov',
                    quality: 'medium',
                  });
                  uri = data.path;
                }
                send({
                  type: 'ENTER_ATTACHMENT',
                  value: {
                    uri: uri,
                    attachmentType: e.mediaType,
                    duration: e.duration,
                  },
                });
              }}>
              <ImageBackground
                source={{uri: e.uri}}
                style={{
                  width: CONTAINER_WIDTH / 3 - 2,
                  height: CONTAINER_WIDTH / 3 - 2,
                }}>
                {e.mediaType === 'video' && (
                  <Box mt="auto" bg="transparent" alignItems="flex-end" p={1}>
                    <Text style={styles.videoText}>
                      {TimeFormat(e.duration)}
                    </Text>
                  </Box>
                )}
              </ImageBackground>
            </TouchableWithoutFeedback>
          );
        }}
      />
    </Box>
  );
};

export default Library;
