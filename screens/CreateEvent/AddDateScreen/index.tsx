import {
  Box,
  Divider,
  Heading,
  Input,
  Pressable,
  Spinner,
  Text,
  useTheme,
} from 'native-base';
import React, {useEffect, useState} from 'react';
import {SAFE_AREA_PADDING} from '../../../constants/Layout';
import {useAtom} from 'jotai';
import {currentTheme, EventMachine} from '../../../constants/atoms';
import {EndDatePicker, StartDatePicker} from '../../../components/DatePickers';
import ProfileImage from '../../../components/ProfileImage';
import {uri} from '../../../navigation';
import {useNavigation} from '@react-navigation/native';
import {RootProp} from '../../../navigation/types';
import {Feather} from '@expo/vector-icons';
import Geolocation from '@react-native-community/geolocation';
import AddressAutocomplete from 'react-native-address-autocomplete';
import {Platform} from 'react-native';
import {GEOCODE_API_KEY} from '../../../secrets';

const formatAMPM = (date: Date) => {
  var hours = date.getHours();
  var minutes = date.getMinutes() as number | string;
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
};

const showDate = (date: Date | undefined): string => {
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  if (date) {
    return `${date.getDate()} ${months[date.getMonth()]}, at ${formatAMPM(
      date,
    )}`;
  }
  return '--/--/--';
};

interface coordsProps {
  latitude: number | undefined;
  longitude: number | undefined;
}

const AddDateScreen = () => {
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const navigation = useNavigation<RootProp>();
  const [curr] = useAtom(EventMachine);
  const [currTheme] = useAtom(currentTheme);
  const {colors} = useTheme();
  const [, send] = useAtom(EventMachine);
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
      }
    };
    get_address();
  }, [coords, send]);

  return (
    <Box flex={1} bg="transparent">
      <Box
        bg="transparent"
        mt={SAFE_AREA_PADDING.paddingTop}
        px={SAFE_AREA_PADDING.paddingLeft}
        h="100%">
        <Box
          flexDir="row"
          bg="transparent"
          justifyContent="space-between"
          mb={5}
          mt={SAFE_AREA_PADDING.paddingLeft}>
          <Box bg="transparent" flexDir="row">
            <ProfileImage uri={uri} />
          </Box>
          <Pressable
            bg="constants.primary"
            _disabled={{
              opacity: 0.5,
            }}
            disabled={
              !curr.context.eventDate.startDate ||
              !curr.context.eventDate.endDate ||
              !curr.context.eventLocation.address ||
              !curr.context.eventLocation.coordinate.latitude ||
              !curr.context.eventLocation.coordinate.longitude ||
              curr.context.eventDate.startDate >= curr.context.eventDate.endDate
            }
            onPress={() => {
              navigation.navigate('Review');
            }}
            px={2}
            py={1}
            my="auto"
            borderRadius={10}>
            <Text>Review</Text>
          </Pressable>
        </Box>
        <Heading mb={5}>When</Heading>
        <Box bg="transparent" flexDir="row" justifyContent="space-around">
          <Box alignItems="center" bg="transparent" px={2} py={1}>
            <Text>Start Time</Text>
            <Text opacity={0.5} fontSize={18}>
              {showDate(curr.context.eventDate.startDate)}
            </Text>
            <Pressable
              onPress={() => {
                setShowStartPicker(true);
                setShowEndPicker(false);
              }}>
              <Text color="constants.primary">Edit Start</Text>
            </Pressable>
          </Box>
          <Box alignItems="center" bg="transparent" px={2} py={1}>
            <Text>End Time</Text>
            <Text opacity={0.5} fontSize={18}>
              {showDate(curr.context.eventDate.endDate)}
            </Text>
            <Pressable
              disabled={!curr.context.eventDate.startDate}
              _disabled={{
                opacity: 0.5,
              }}
              onPress={() => {
                setShowStartPicker(false);
                setShowEndPicker(true);
              }}>
              <Text color="constants.primary">Edit End</Text>
            </Pressable>
          </Box>
        </Box>
        <Pressable
          onPress={() => {
            navigation.navigate('Repeat');
          }}>
          <Text alignSelf="center" color="constants.primary">
            Repeat Every
          </Text>
        </Pressable>
        <Divider my={5} />
        <Heading mb={5}>Where</Heading>
        <Input
          placeholder="Search by address"
          value={curr.context.eventLocation.address}
          InputRightElement={
            <Box mr={5} bg="transparent">
              {loading ? (
                <Spinner />
              ) : (
                <Feather
                  name="search"
                  size={24}
                  color={colors[currTheme].text}
                />
              )}
            </Box>
          }
          onPressIn={() => {
            navigation.navigate('SearchAddress');
          }}
        />
        <Pressable
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
        <StartDatePicker
          showPicker={showStartPicker}
          setShowPicker={setShowStartPicker}
        />
        <EndDatePicker
          showPicker={showEndPicker}
          setShowPicker={setShowEndPicker}
        />
      </Box>
    </Box>
  );
};

export default AddDateScreen;
