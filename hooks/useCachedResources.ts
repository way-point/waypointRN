import {useEffect, useState} from 'react';
import {calendarSyncAtom, currentTheme, ifSignedIn} from '../constants/atoms';
import useColorScheme from './useColorScheme';
import * as Calendar from 'expo-calendar';
import get_events from '../constants/get_event';
import {useAtom} from 'jotai';
import {configureFetcher} from '../api/config/fetcher';
import UidFind from '../api/route/User/UidFind';
import auth from '@react-native-firebase/auth';

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);
  const colorScheme = useColorScheme();
  const [, setIfSignIn] = useAtom(ifSignedIn);
  const [, setCalendarSyncAtom] = useAtom(calendarSyncAtom);
  const [, setCurrTheme] = useAtom(currentTheme);
  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        setCurrTheme(colorScheme);
        // checks if user already exists in database and moves to
        // signed in state instead.
        await configureFetcher();
        const ifUid = await UidFind(auth().currentUser?.uid || '');
        if (ifUid && 'username' in ifUid) {
          setIfSignIn(false);
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
  }, [colorScheme, setCalendarSyncAtom, setCurrTheme, setIfSignIn]);

  return isLoadingComplete;
}
