import {useAtom} from 'jotai';
import {Box, Checkbox} from 'native-base';
import React, {useState} from 'react';
import {EventMachine} from '../constants/atoms';

const RepeatEvent = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [curr, send] = useAtom(EventMachine);
  return (
    <Box>
      <Checkbox
        colorScheme="info"
        value="Repeat"
        onChange={isSelected => {
          setIsChecked(isSelected);

          if (!isSelected) {
            send({type: 'ENTER_REPEAT', value: {repeat: []}});
          }
        }}
        mb={3}
        isDisabled={
          !curr.context.eventDate.startDate ||
          !curr.context.eventDate.endDate ||
          curr.context.eventDate.startDate >= curr.context.eventDate.endDate
        }>
        Repeat?
      </Checkbox>
      <Checkbox.Group
        colorScheme="info"
        display={isChecked ? 'flex' : 'none'}
        onChange={values => {
          send({type: 'ENTER_REPEAT', value: {repeat: values}});
        }}
        value={curr.context.eventDate.repeat}
        accessibilityLabel="choose numbers">
        <Checkbox value="Monday" my={1}>
          Monday
        </Checkbox>
        <Checkbox value="Tuesday" my={1}>
          Tuesday
        </Checkbox>
        <Checkbox value="Wednesday" my={1}>
          Wednesday
        </Checkbox>
        <Checkbox value="Thursday" my={1}>
          Thursday
        </Checkbox>
        <Checkbox value="Friday" my={1}>
          Friday
        </Checkbox>
        <Checkbox value="Saturday" my={1}>
          Saturday
        </Checkbox>
        <Checkbox value="Sunday" my={1}>
          Sunday
        </Checkbox>
      </Checkbox.Group>
    </Box>
  );
};

export default RepeatEvent;
