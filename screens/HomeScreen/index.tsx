import {Box, useTheme} from 'native-base';
import React from 'react';
import {StyleSheet} from 'react-native';
import MapView, {LatLng, Marker, Region} from 'react-native-maps';
import Layout from '../../constants/Layout';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useAtom} from 'jotai';
import {cityAtom, currentTheme} from '../../constants/atoms';
import AddPostButton from '../../components/AddPostButton';
import Menu from '../../components/Menu';

const region: Region = {
  latitude: 37.78825,
  longitude: -122.4324,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

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

const HomeScreen = () => {
  const {colors} = useTheme();
  const [currTheme] = useAtom(currentTheme);
  const [, setCity] = useAtom(cityAtom);

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

  return (
    <Box flex={1} alignContent="center" justifyContent="center">
      <AddPostButton />
      <MapView
        initialRegion={region}
        style={styles.map}
        // provider={PROVIDER_GOOGLE}
        customMapStyle={colors[currTheme].map}
        onRegionChangeComplete={({latitude, longitude}) => {
          getCurrentCity(latitude, longitude);
        }}>
        {Markers.map(e => {
          return (
            <Marker
              onPress={() => {
                console.log('test');
              }}
              key={e.id}
              coordinate={e.coordinate}>
              <Menu />
            </Marker>
          );
        })}
      </MapView>
    </Box>
  );
};

const styles = StyleSheet.create({
  map: {
    width: Layout.window.width,
    height: Layout.window.height,
  },
});

export default HomeScreen;
