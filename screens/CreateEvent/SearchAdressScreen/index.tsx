import React, {useState} from 'react';
import {
  Box,
  Divider,
  FlatList,
  Input,
  Pressable,
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
  const GEO_API_KEY = '6d67af95fb4f4763b8b1e00e21888d53';

  const renderItem = ({
    item,
    index,
  }: iOSrenderItemsProps | androidRenderItemProps) => {
    return (
      <Box>
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
      flex={1}>
      <Input
        my={SAFE_AREA_PADDING.paddingLeft}
        InputRightElement={
          <Box mr={5} bg="transparent">
            <Feather name="search" size={24} color={colors[currTheme].text} />
          </Box>
        }
        placeholder="Search by Address"
        onChangeText={async text => {
          if (text) {
            if (Platform.OS === 'ios') {
              const addresses = await AddressAutocomplete.getAddressSuggestions(
                text,
              );
              setSuggestions(addresses);
            }

            if (Platform.OS === 'android') {
              const GeoSuggestions = await fetch(
                `https://api.geoapify.com/v1/geocode/autocomplete?text=${text}&format=json&apiKey=${GEO_API_KEY}`,
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
          }
        }}
      />
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
