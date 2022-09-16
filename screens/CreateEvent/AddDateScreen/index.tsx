import {Box, Divider, Flex, Heading, Input, Pressable, Text} from 'native-base';
import React, {useState} from 'react';
import {SAFE_AREA_PADDING} from '../../../constants/Layout';
import {useAtom} from 'jotai';
import {currentTheme, EventMachine} from '../../../constants/atoms';
import {EndDatePicker, StartDatePicker} from '../../../components/DatePickers';
import ProfileImage from '../../../components/ProfileImage';
import {uri} from '../../../navigation';
import {useNavigation} from '@react-navigation/native';
import {RootProp} from '../../../navigation/types';

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

const AddDateScreen = () => {
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const navigation = useNavigation<RootProp>();
  const [curr] = useAtom(EventMachine);
  const [currTheme] = useAtom(currentTheme);

  return (
    <Box flex={1} bg="transparent">
      <Box
        mt={SAFE_AREA_PADDING.paddingTop}
        px={SAFE_AREA_PADDING.paddingLeft}
        h="100%">
        <Box
          flexDir="row"
          justifyContent="space-between"
          mb={5}
          mt={SAFE_AREA_PADDING.paddingLeft}>
          <Box flexDir="row">
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
              curr.context.eventDate.startDate >= curr.context.eventDate.endDate
            }
            onPress={() => {
              // navigation.navigate('AddDate');
            }}
            px={2}
            py={1}
            my="auto"
            borderRadius={10}>
            <Text>Review</Text>
          </Pressable>
        </Box>
        <Heading mb={5}>When</Heading>
        <Box flexDir="row" justifyContent="space-around">
          <Box alignItems="center" px={2} py={1} borderRadius={10}>
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
          <Box alignItems="center" px={2} py={1} borderRadius={10}>
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
        <Input placeholder="Search by address" />
        <Flex my={3} direction="row" alignSelf="center">
          <Divider
            bg={currTheme + '.text'}
            thickness="1"
            my="auto"
            mx="2"
            w={100}
            orientation="horizontal"
          />
          <Text>Or</Text>
          <Divider
            bg={currTheme + '.text'}
            thickness="1"
            my="auto"
            mx="2"
            w={100}
            orientation="horizontal"
          />
        </Flex>
        <Pressable
          bg="constants.primary"
          p={2}
          borderRadius={10}
          alignSelf="center">
          <Text>Use current location</Text>
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
