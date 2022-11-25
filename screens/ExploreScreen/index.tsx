import {Box, useTheme} from 'native-base';
import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import MapView, {
  LatLng,
  Marker,
  PROVIDER_GOOGLE,
  Region,
} from 'react-native-maps';
import {useAtom} from 'jotai';
import {cityAtom, currentTheme} from '../../constants/atoms';
import AddPostButton from '../../components/AddPostButton';
import {enableLatestRenderer} from 'react-native-maps';
import Layout from '../../constants/Layout';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import Geolocation from '@react-native-community/geolocation';
import feedData from '../../data/feedData';
import {feedDataItemProps} from '../../constants/types';
import ProfileImage from '../../components/ProfileImage';

enableLatestRenderer();
interface MarkerProps {
  coordinate: LatLng;
  id: number;
}

const Markers: MarkerProps[] = [
  {
    coordinate: {
      latitude: 37.789,
      longitude: -122.433,
    },
    id: 1,
  },
];

// const calc_size = (subscribers: number) => {
//   const min_size = 30;
//   const max_size = 100;

//   if (min_size >= subscribers) {
//     return min_size;
//   }
//   if (max_size <= subscribers) {
//     return max_size;
//   }
//   return subscribers;
// };

const RenderMaker = ({item}: feedDataItemProps) => {
  const {colors} = useTheme();
  const [currTheme] = useAtom(currentTheme);
  return (
    <Box
      borderRadius={30}
      borderColor={colors[currTheme].background}
      borderWidth={3}>
      <ProfileImage id={item.host_id as string} size={10} />
    </Box>
  );
};

const ExploreScreen = () => {
  const {colors} = useTheme();
  const [currTheme] = useAtom(currentTheme);
  const [, setCity] = useAtom(cityAtom);
  const bottomTabHeight = useBottomTabBarHeight();

  const [region, setRegion] = useState(null as Region | null);

  useEffect(() => {
    Geolocation.getCurrentPosition(success => {
      const coords = {
        latitude: success.coords.latitude,
        longitude: success.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      };
      setRegion(coords);
    });
  }, []);

  const getCurrentCity = async (latitude: number, longitude: number) => {
    const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;
    const res = await fetch(url);
    const data = await res.json();
    let city = data.city || data.locality || '';

    if (city.length > 30) {
      city = city.substring(0, 30) + '...';
    }
    setCity(city);
  };

  const styles = StyleSheet.create({
    maps: {
      width: Layout.window.width,
      height: Layout.window.height,
      bottom: bottomTabHeight + 5,
    },
  });

  return (
    <Box flex={1} alignContent="center" justifyContent="center">
      {region && (
        <MapView
          provider={PROVIDER_GOOGLE}
          initialRegion={region}
          style={styles.maps}
          customMapStyle={colors[currTheme].map}
          toolbarEnabled={false}
          onRegionChangeComplete={({latitude, longitude}) => {
            getCurrentCity(latitude, longitude);
          }}>
          {Markers.map((e, i) => {
            return (
              <Marker
                key={e.id}
                coordinate={e.coordinate}
                onPress={() => {
                  console.log('testing...');
                }}>
                <RenderMaker item={feedData[i]} />
              </Marker>
            );
          })}
          {/* <Heatmap points={heatMap} /> */}
        </MapView>
      )}
      <AddPostButton />
    </Box>
  );
};

export default ExploreScreen;
