import {Box, Heading, Pressable, Text} from 'native-base';
import React, {useState} from 'react';
import {SAFE_AREA_PADDING} from '../../../constants/Layout';
import {useAtom} from 'jotai';
import {EventMachine} from '../../../constants/atoms';
import {EndDatePicker, StartDatePicker} from '../../../components/DatePickers';
import ProfileImage from '../../../components/ProfileImage';
import {uri} from '../../../navigation';
import RepeatEvent from '../../../components/RepeatEvent';

const showDate = (date: Date | undefined): string => {
  if (date) {
    return `${date.toDateString()} at ${date.toLocaleTimeString()}`;
  }
  return '';
};

const AddDateScreen = () => {
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const [curr] = useAtom(EventMachine);

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
              //   navigation.navigate('AddDate');
            }}
            px={2}
            py={1}
            my="auto"
            borderRadius={10}>
            <Text>Next</Text>
          </Pressable>
        </Box>
        <Pressable
          bg="constants.primary"
          alignSelf="flex-start"
          px={2}
          py={1}
          borderRadius={10}
          onPress={() => {
            setShowStartPicker(true);
            setShowEndPicker(false);
          }}>
          <Heading>Start Time</Heading>
        </Pressable>
        <Text my={3} fontSize={20}>
          {showDate(curr.context.eventDate.startDate)}
        </Text>
        <Pressable
          disabled={!curr.context.eventDate.startDate}
          bg="constants.primary"
          alignSelf="flex-start"
          px={2}
          py={1}
          borderRadius={10}
          _disabled={{opacity: 0.5}}
          onPress={() => {
            setShowStartPicker(false);
            setShowEndPicker(true);
          }}>
          <Heading>End Time</Heading>
        </Pressable>
        <Text my={3} fontSize={20}>
          {showDate(curr.context.eventDate.endDate)}
        </Text>
        <RepeatEvent />
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
