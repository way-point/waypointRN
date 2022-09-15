import {Box, Pressable, Text} from 'native-base';
import React, {useState} from 'react';
import {SAFE_AREA_PADDING} from '../../../constants/Layout';
import {useAtom} from 'jotai';
import {EventMachine} from '../../../constants/atoms';
import {EndDatePicker, StartDatePicker} from '../../../components/DatePickers';

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
        <Pressable
          onPress={() => {
            setShowStartPicker(true);
            setShowEndPicker(false);
          }}>
          <Text>Start {showDate(curr.context.eventDate.startDate)}</Text>
        </Pressable>
        <Pressable
          disabled={!curr.context.eventDate.startDate}
          _disabled={{opacity: 0.5}}
          onPress={() => {
            setShowStartPicker(false);
            setShowEndPicker(true);
          }}>
          <Text>End {showDate(curr.context.eventDate.endDate)}</Text>
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
