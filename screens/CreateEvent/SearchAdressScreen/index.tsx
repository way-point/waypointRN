import React, {useEffect, useState} from 'react';
import {
  Box,
  Divider,
  FlatList,
  Input,
  Pressable,
  Spinner,
  Text,
  useTheme,
} from 'native-base';
import {SAFE_AREA_PADDING} from '../../../constants/Layout';
import AddressAutocomplete from 'react-native-address-autocomplete';
import {useAtom} from 'jotai';
import {currentTheme, EventMachine} from '../../../constants/atoms';
import {Platform, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {RootProp} from '../../../navigation/types';
import {Feather} from '@expo/vector-icons';
import Geolocation from '@react-native-community/geolocation';
import {AUTOCOMPLETE_API_KEY, GEOCODE_API_KEY} from '../../../secrets';

interface coordsProps {
  latitude: number | undefined;
  longitude: number | undefined;
}

interface androidItem {
  address: string;
  latitude: number;
  longitude: number;
}
interface androidRenderItemProps {
  item: androidItem;
  index: number;
}

interface iOSrenderItemsProps {
  item: string;
  index: number;
}

const styles = StyleSheet.create({
  paddingBottom: {
    paddingBottom: 50,
  },
});

const SearchAddressScreen = () => {
  const [suggestions, setSuggestions] = useState(
    [] as string[] | androidItem[],
  );
  const [currTheme] = useAtom(currentTheme);
  const [, send] = useAtom(EventMachine);
  const navigation = useNavigation<RootProp>();
  const {colors} = useTheme();
  const [loading, setLoading] = useState(false);
  const [coords, setCoords] = useState({
    latitude: undefined,
    longitude: undefined,
  } as coordsProps);

  useEffect(() => {
    const get_address = async () => {
      if (coords.latitude && coords.longitude) {
        let address = undefined as string | undefined;
        if (Platform.OS === 'ios') {
          const data = await AddressAutocomplete.reverseGeocodeLocation(
            coords.longitude,
            coords.latitude,
          );
          address = `${data.house} ${data.street}, ${data.city}, ${data.country}`;
        }
        if (Platform.OS === 'android') {
          const fet = await fetch(
            `https://api.geoapify.com/v1/geocode/reverse?lat=${coords.latitude}&lon=${coords.longitude}&apiKey=${GEOCODE_API_KEY}`,
          );
          const data = await fet.json();
          address = data.features[0].properties.formatted;
        }

        setLoading(false);
        send({
          type: 'ENTER_LOCATION',
          value: {
            address: address,
            latitude: coords.latitude,
            longitude: coords.longitude,
          },
        });
        navigation.goBack();
      }
    };
    get_address();
  }, [coords, navigation, send]);

  const renderItem = ({
    item,
    index,
  }: iOSrenderItemsProps | androidRenderItemProps) => {
    return (
      <Box bg="transparent">
        {index !== 0 && <Divider h={0.3} />}
        <Pressable
          bg={currTheme + '.textField'}
          onPress={async () => {
            if (Platform.OS === 'ios') {
              const {coordinate} = await AddressAutocomplete.getAddressDetails(
                item as string,
              );
              send({
                type: 'ENTER_LOCATION',
                value: {
                  address: item,
                  latitude: coordinate.latitude,
                  longitude: coordinate.longitude,
                },
              });
            }

            if (Platform.OS === 'android') {
              send({
                type: 'ENTER_LOCATION',
                value: {
                  address: (item as androidItem).address,
                  latitude: (item as androidItem).latitude,
                  longitude: (item as androidItem).longitude,
                },
              });
            }

            navigation.goBack();
          }}
          px={2}
          py={3}
          borderRadius={2}
          borderTopRadius={index === 0 ? 10 : 0}
          borderBottomRadius={index === suggestions.length - 1 ? 10 : 0}>
          <Text fontSize={15} fontWeight={500}>
            {Platform.OS === 'android'
              ? (item as androidItem).address
              : (item as string)}
          </Text>
        </Pressable>
        {index !== suggestions.length - 1 && <Divider h={0.3} />}
      </Box>
    );
  };

  return (
    <Box
      mt={SAFE_AREA_PADDING.paddingTop}
      px={SAFE_AREA_PADDING.paddingLeft}
      bg="transparent"
      flex={1}>
      <Input
        mt={SAFE_AREA_PADDING.paddingLeft}
        InputRightElement={
          <Box mr={5} bg="transparent">
            {loading ? (
              <Spinner />
            ) : (
              <Feather name="search" size={24} color={colors[currTheme].text} />
            )}
          </Box>
        }
        autoFocus
        placeholder="Search by Address"
        onChangeText={async text => {
          if (text) {
            setLoading(true);
            if (Platform.OS === 'ios') {
              const addresses = await AddressAutocomplete.getAddressSuggestions(
                text,
              );
              setSuggestions(addresses);
            }

            if (Platform.OS === 'android') {
              const GeoSuggestions = await fetch(
                `https://api.geoapify.com/v1/geocode/autocomplete?text=${text}&format=json&apiKey=${AUTOCOMPLETE_API_KEY}`,
                {method: 'GET'},
              );
              const {results} = await GeoSuggestions.json();

              const adds: androidItem[] = [];
              for (let i = 0; i < results.length; i++) {
                adds.push({
                  address: results[i].formatted,
                  latitude: results[i].lat,
                  longitude: results[i].lng,
                });
              }

              setSuggestions(adds);
            }
            setLoading(false);
          }
        }}
      />
      <Pressable
        mb={SAFE_AREA_PADDING.paddingLeft}
        bg="transparent"
        onPress={async () => {
          Geolocation.getCurrentPosition(info => {
            setLoading(true);
            setCoords({
              latitude: info.coords.latitude,
              longitude: info.coords.longitude,
            });
          });
        }}
        p={2}
        borderRadius={10}
        alignSelf="flex-start">
        <Text color="constants.primary">Use current location</Text>
      </Pressable>
      <FlatList
        contentContainerStyle={styles.paddingBottom}
        // @ts-ignore
        data={suggestions}
        renderItem={renderItem}
      />
    </Box>
  );
};

export default SearchAddressScreen;
