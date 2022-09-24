import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useState} from 'react';
import {ASYNC_THEME_VAL, calendarSyncAtom} from '../constants/atoms';
import useColorScheme from './useColorScheme';
import * as Calendar from 'expo-calendar';
import get_events from '../constants/get_event';
import {useAtom} from 'jotai';

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);
  const colorScheme = useColorScheme();
  const [, setCalendarSyncAtom] = useAtom(calendarSyncAtom);
  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        const data = await AsyncStorage.getItem(ASYNC_THEME_VAL);
        if (data === null) {
          await AsyncStorage.setItem(ASYNC_THEME_VAL, colorScheme);
        }
        const status = await Calendar.getCalendarPermissionsAsync();
        if (status.granted) {
          const d = await get_events();
          if (d !== null) {
            setCalendarSyncAtom(d);
          }
        }
      } catch (e) {
        console.warn(e);
      } finally {
        setLoadingComplete(true);
      }
    }

    loadResourcesAndDataAsync();
  }, [colorScheme, setCalendarSyncAtom]);

  return isLoadingComplete;
}
