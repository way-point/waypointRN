import React, {useEffect, useRef, useState} from 'react';
import {Box, FlatList, Text, useTheme} from 'native-base';
import {FlatList as FL} from 'react-native';
import {StyleSheet, ImageBackground} from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import {CONTAINER_WIDTH} from '../constants/Layout';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {useAtom} from 'jotai';
import {currentTheme} from '../constants/atoms';

interface LibraryProps {
  albums: MediaLibrary.Album[];
}

const Library: React.FC<LibraryProps> = ({albums}) => {
  const [photos, setPhotos] = useState(
    undefined as MediaLibrary.PagedInfo<MediaLibrary.Asset> | undefined,
  );

  const {colors} = useTheme();
  const [currTheme] = useAtom(currentTheme);

  const styles = StyleSheet.create({
    paddingBottom: {
      paddingBottom: 60,
    },
    flatlistPadding: {
      padding: 1,
    },
    videoText: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      paddingHorizontal: 3,
      paddingVertical: 2,
      borderRadius: 5,
      color: colors[currTheme].text,
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

  useEffect(() => {
    const adding = async () => {
      if (photos && photos.hasNextPage) {
        const getPhotos = await MediaLibrary.getAlbumAsync(albums[index].title);
        const getAllPhotos = await MediaLibrary.getAssetsAsync({
          first: 100,
          after: photos.assets[photos.assets.length - 1],
          album: getPhotos,
          sortBy: 'creationTime',
          mediaType: ['photo', 'video'],
        });
        let temp = JSON.parse(
          JSON.stringify(photos),
        ) as MediaLibrary.PagedInfo<MediaLibrary.Asset>;
        temp.assets.push(...getAllPhotos.assets);
        setPhotos(temp);
      }
    };
    adding();
  }, [albums, photos]);

  return (
    <Box>
      <FlatList
        ref={flatListRef}
        nestedScrollEnabled
        data={photos?.assets}
        numColumns={3}
        contentContainerStyle={styles.paddingBottom}
        renderItem={item => {
          const e = item.item;
          const i = item.index;

          return (
            <TouchableWithoutFeedback key={i} style={styles.flatlistPadding}>
              <ImageBackground
                source={{uri: e.uri}}
                style={{
                  width: CONTAINER_WIDTH / 3 - 2,
                  height: CONTAINER_WIDTH / 3 - 2,
                }}>
                {e.mediaType === 'video' && (
                  <Box mt="auto" bg="transparent" alignItems="flex-end" p={5}>
                    <Text style={styles.videoText}>
                      {new Date(Math.round(e.duration) * 1000)
                        .toISOString()
                        .substring(14, 19)}
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
