import {useIsFocused, useNavigation} from '@react-navigation/native';
import {useAtom} from 'jotai';
import {Box, Checkbox} from 'native-base';
import React, {useEffect, useState} from 'react';
import {EventMachine} from '../../../constants/atoms';
import {SAFE_AREA_PADDING} from '../../../constants/Layout';
import SubmitButton from '../../../components/SubmitButton';
import CancelButton from '../../../components/CancelButton';
import {RootProp} from '../../../navigation/types';

const RepeatScreen = () => {
  const [curr, send] = useAtom(EventMachine);
  const [group, setGroup] = useState([] as string[]);

  const isFocused = useIsFocused();
  const navigation = useNavigation<RootProp>();

  useEffect(() => {
    if (isFocused) {
      setGroup(curr.context.eventDate.repeat);
    }
  }, [curr.context.eventDate.repeat, isFocused]);

  return (
    <Box
      mt={SAFE_AREA_PADDING.paddingTop}
      p={SAFE_AREA_PADDING.paddingLeft}
      flex={1}>
      <Checkbox.Group
        colorScheme="info"
        onChange={values => {
          //
          setGroup(values);
        }}
        value={group}
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
      <Box mt="auto">
        <SubmitButton
          onPress={() => {
            send({type: 'ENTER_REPEAT', value: {repeat: group}});
            navigation.goBack();
          }}
        />
        <CancelButton
          onPress={() => {
            navigation.goBack();
          }}
        />
      </Box>
    </Box>
  );
};

export default RepeatScreen;
