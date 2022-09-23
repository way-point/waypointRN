import React from 'react';
import * as Calendar from 'expo-calendar';
import {Box, ScrollView, Stack, Text, useTheme} from 'native-base';
import {StyleSheet} from 'react-native';
import SubmitButton from '../../../components/SubmitButton';
import {FontAwesome5} from '@expo/vector-icons';
import {useAtom} from 'jotai';
import {currentTheme} from '../../../constants/atoms';
import CancelButton from '../../../components/CancelButton';
import {SAFE_AREA_PADDING} from '../../../constants/Layout';

const styles = StyleSheet.create({
  scrollView: {
    justifyContent: 'center',
    flexGrow: 1,
  },
  icon: {
    alignSelf: 'center',
    marginVertical: 20,
  },
});

function getLastWeeksDate() {
  const now = new Date();

  return new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);
}

function getNextWeeksDate() {
  const now = new Date();

  return new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7);
}

export default function App() {
  const get_events = async () => {
    const {status} = await Calendar.requestCalendarPermissionsAsync();
    if (status === 'granted') {
      const calendars = await Calendar.getCalendarsAsync(
        Calendar.EntityTypes.EVENT,
      );

      let ids = [];

      for (let i = 0; i < calendars.length; i++) {
        ids.push(calendars[i].id as string);
      }

      const dates = await Calendar.getEventsAsync(
        ids,
        getLastWeeksDate(),
        getNextWeeksDate(),
      );

      console.log(dates);
    }
  };

  const {colors} = useTheme();
  const [currTheme] = useAtom(currentTheme);

  return (
    <Box flex={1}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Stack
          space={4}
          maxW="450px"
          mx="auto"
          px={SAFE_AREA_PADDING.paddingLeft}
          mt={SAFE_AREA_PADDING.paddingTop}>
          <Text fontSize={25} fontWeight={500}>
            Sync with your calendar
          </Text>
          <FontAwesome5
            style={styles.icon}
            name="sync"
            size={100}
            color={colors[currTheme].text}
          />
          <Text opacity={0.5} px={SAFE_AREA_PADDING.paddingLeft}>
            Add events to your calendar app, schedule events best for your
            friends, all in one place.
          </Text>

          <SubmitButton
            onPress={() => get_events()}
            submitText="Sync calendar"
          />
          <CancelButton onPress={() => {}} cancelText="Skip" />
        </Stack>
      </ScrollView>
    </Box>
  );
}
