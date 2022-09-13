import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useState} from 'react';
import {ASYNC_THEME_VAL} from '../constants/atoms';
import useColorScheme from './useColorScheme';

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);
  const colorScheme = useColorScheme();
  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
      } catch (e) {
        const data = await AsyncStorage.getItem(ASYNC_THEME_VAL);
        if (data === null) {
          await AsyncStorage.setItem(ASYNC_THEME_VAL, colorScheme);
        }
        console.warn(e);
      } finally {
        setLoadingComplete(true);
      }
    }

    loadResourcesAndDataAsync();
  }, [colorScheme]);

  return isLoadingComplete;
}
