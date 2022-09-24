import React from 'react';
import {Box, ScrollView, Stack, Text, useTheme} from 'native-base';
import {StyleSheet} from 'react-native';
import SubmitButton from '../../../components/SubmitButton';
import {FontAwesome5} from '@expo/vector-icons';
import {useAtom} from 'jotai';
import {
  calendarSyncAtom,
  currentTheme,
  ifSignedIn,
} from '../../../constants/atoms';
import CancelButton from '../../../components/CancelButton';
import {SAFE_AREA_PADDING} from '../../../constants/Layout';
import get_events from '../../../constants/get_event';

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

export default function App() {
  const {colors} = useTheme();
  const [currTheme] = useAtom(currentTheme);
  const [, setCalendarSyncAtom] = useAtom(calendarSyncAtom);
  const [, setIfSignedIn] = useAtom(ifSignedIn);

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
            friends, check your availability for new events, all in one place.
          </Text>

          <SubmitButton
            onPress={async () => {
              const d = await get_events();
              if (d !== null) {
                setCalendarSyncAtom(d);
              }
              setIfSignedIn(false);
            }}
            submitText="Sync calendar"
          />
          <CancelButton
            onPress={() => {
              setIfSignedIn(false);
            }}
            cancelText="Skip"
          />
        </Stack>
      </ScrollView>
    </Box>
  );
}
