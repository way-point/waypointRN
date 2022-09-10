import {Box, useTheme} from 'native-base';
import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import MapView, {LatLng, Marker, Region} from 'react-native-maps';
import {useAtom} from 'jotai';
import {cityAtom, currentTheme} from '../../constants/atoms';
import AddPostButton from '../../components/AddPostButton';
import Menu from '../../components/Menu';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {enableLatestRenderer} from 'react-native-maps';

enableLatestRenderer();

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

  useEffect(() => {
    getCurrentCity(region.latitude, region.longitude);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box flex={1} alignContent="center" justifyContent="center">
      <MapView
        initialRegion={region}
        style={StyleSheet.absoluteFill}
        customMapStyle={colors[currTheme].map}
        toolbarEnabled={false}
        onRegionChangeComplete={({latitude, longitude}) => {
          getCurrentCity(latitude, longitude);
        }}>
        {Markers.map(e => {
          return (
            <Marker
              coordinate={e.coordinate}
              onPress={() => {
                console.log('testing...');
              }}>
              <Menu>
                <Box
                  borderRadius={10}
                  borderColor={colors[currTheme].text}
                  borderWidth={1}>
                  <MaterialCommunityIcons
                    name="roller-skate"
                    size={24}
                    color={colors[currTheme].text}
                    style={styles.padding}
                  />
                </Box>
              </Menu>
            </Marker>
          );
        })}
      </MapView>
      <AddPostButton />
    </Box>
  );
};

const styles = StyleSheet.create({
  padding: {
    padding: 3,
  },
});

export default HomeScreen;
