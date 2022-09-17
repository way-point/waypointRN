import React, {useState} from 'react';
import {Box, Divider, FlatList, Input, Pressable, Text} from 'native-base';
import {SAFE_AREA_PADDING} from '../../../constants/Layout';
import AddressAutocomplete from 'react-native-address-autocomplete';
import {useAtom} from 'jotai';
import {currentTheme, EventMachine} from '../../../constants/atoms';
import {StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {RootProp} from '../../../navigation/types';

interface renderItemsProps {
  item: string;
  index: number;
}

const styles = StyleSheet.create({
  paddingBottom: {
    paddingBottom: 50,
  },
});

const SearchAddressScreen = () => {
  const [suggestions, setSuggestions] = useState([] as string[]);
  const [currTheme] = useAtom(currentTheme);
  const [curr, send] = useAtom(EventMachine);
  const navigation = useNavigation<RootProp>();

  const renderItem = ({item, index}: renderItemsProps) => {
    return (
      <Box>
        {index !== 0 && <Divider h={0.3} />}
        <Pressable
          bg={currTheme + '.textField'}
          onPress={async () => {
            const {coordinate} = await AddressAutocomplete.getAddressDetails(
              item,
            );

            send({
              type: 'ENTER_LOCATION',
              value: {
                address: item,
                latitude: coordinate.latitude,
                longitude: coordinate.longitude,
              },
            });

            navigation.goBack();
          }}
          px={2}
          py={3}
          borderRadius={2}
          borderTopRadius={index === 0 ? 10 : 0}
          borderBottomRadius={index === suggestions.length - 1 ? 10 : 0}>
          <Text fontSize={15} fontWeight={500}>
            {item}
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
        placeholder="Search by Address"
        onChangeText={async text => {
          if (text) {
            const addresses = await AddressAutocomplete.getAddressSuggestions(
              text,
            );
            setSuggestions(addresses);
          }
        }}
      />
      <FlatList
        contentContainerStyle={styles.paddingBottom}
        data={suggestions}
        renderItem={renderItem}
      />
    </Box>
  );
};

export default SearchAddressScreen;
