import {useAtom} from 'jotai';
import {Box, Pressable, Text, useTheme} from 'native-base';
import React from 'react';
import {currentTheme, EventMachine} from '../constants/atoms';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

interface DatePicker {
  showPicker: boolean;
  setShowPicker: React.Dispatch<React.SetStateAction<boolean>>;
}

export const StartDatePicker = ({showPicker, setShowPicker}: DatePicker) => {
  const [currTheme] = useAtom(currentTheme);
  const [curr, send] = useAtom(EventMachine);
  const {colors} = useTheme();
  const initialDate = new Date();

  console.log(showPicker);

  const hideDatePicker = () => {
    setShowPicker(false);
  };

  const handleConfirm = (date: Date) => {
    send({type: 'ENTER_START_DATE', value: {startDate: date}});
    hideDatePicker();
  };

  return (
    <DateTimePickerModal
      isVisible={showPicker}
      minimumDate={initialDate}
      maximumDate={curr.context.eventDate.endDate}
      mode="datetime"
      onConfirm={handleConfirm}
      onCancel={hideDatePicker}
      customConfirmButtonIOS={({onPress}) => {
        return (
          <Box h={50} bg={currTheme + '.textField'} alignItems="center">
            <Pressable my="auto" onPress={onPress}>
              <Text fontSize={20} color="constants.primary">
                Confirm
              </Text>
            </Pressable>
          </Box>
        );
      }}
      customCancelButtonIOS={({onPress}) => {
        return (
          <Box
            h={50}
            borderRadius={15}
            mb={5}
            bg={currTheme + '.textField'}
            alignItems="center">
            <Pressable my="auto" onPress={onPress}>
              <Text fontSize={20} color="constants.primary">
                Cancel
              </Text>
            </Pressable>
          </Box>
        );
      }}
      pickerStyleIOS={{backgroundColor: colors[currTheme].textField}}
      pickerContainerStyleIOS={{
        backgroundColor: colors[currTheme].textField,
      }}
    />
  );
};

export const EndDatePicker = ({showPicker, setShowPicker}: DatePicker) => {
  const [currTheme] = useAtom(currentTheme);
  const [curr, send] = useAtom(EventMachine);
  const {colors} = useTheme();

  const hideDatePicker = () => {
    setShowPicker(false);
  };

  const handleConfirm = (date: Date) => {
    send({type: 'ENTER_END_DATE', value: {endDate: date}});
    hideDatePicker();
  };

  return (
    <DateTimePickerModal
      isVisible={showPicker}
      minimumDate={curr.context.eventDate.startDate}
      mode="datetime"
      onConfirm={handleConfirm}
      onCancel={hideDatePicker}
      customConfirmButtonIOS={({onPress}) => {
        return (
          <Box h={50} bg={currTheme + '.textField'} alignItems="center">
            <Pressable my="auto" onPress={onPress}>
              <Text fontSize={20} color="constants.primary">
                Confirm
              </Text>
            </Pressable>
          </Box>
        );
      }}
      customCancelButtonIOS={({onPress}) => {
        return (
          <Box
            h={50}
            borderRadius={15}
            mb={5}
            bg={currTheme + '.textField'}
            alignItems="center">
            <Pressable my="auto" onPress={onPress}>
              <Text fontSize={20} color="constants.primary">
                Cancel
              </Text>
            </Pressable>
          </Box>
        );
      }}
      pickerStyleIOS={{backgroundColor: colors[currTheme].textField}}
      pickerContainerStyleIOS={{
        backgroundColor: colors[currTheme].textField,
      }}
    />
  );
};
