import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SplashScreen from 'react-native-splash-screen';
import {useAtom} from 'jotai';
import {useEffect, useState} from 'react';
import {currentTheme} from '../constants/atoms';
import {ThemeType} from '../nativebase/themes';
import useColorScheme from './useColorScheme';

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);
  const [, setCurrTheme] = useAtom(currentTheme);
  const colorScheme = useColorScheme();

  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        const theme = (await AsyncStorage.getItem('theme')) as ThemeType;
        if (theme) {
          setCurrTheme(theme);
        } else {
          setCurrTheme(colorScheme);
        }
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.default.hide();
      }
    }

    loadResourcesAndDataAsync();
  }, [colorScheme, setCurrTheme]);

  return isLoadingComplete;
}
