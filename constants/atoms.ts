import AsyncStorage from '@react-native-async-storage/async-storage';
import {atom} from 'jotai';
import {atomWithMachine} from 'jotai/xstate';
import {ThemeType} from '../nativebase/themes';
import RegisterMachine from './states/RegisterState';

export const ASYNC_THEME_VAL = 'theme';

const atomWithAsyncStorage = (key: string, initialValue: ThemeType) => {
  const baseAtom = atom(initialValue);
  baseAtom.onMount = setValue => {
    (async () => {
      const item = (await AsyncStorage.getItem(key)) as ThemeType;
      setValue(JSON.parse(item));
    })();
  };
  const derivedAtom = atom(
    get => get(baseAtom),
    (get, set, update) => {
      const nextValue =
        typeof update === 'function' ? update(get(baseAtom)) : update;
      set(baseAtom, nextValue);
      AsyncStorage.setItem(key, JSON.stringify(nextValue));
    },
  );
  return derivedAtom;
};

export const currentTheme = atomWithAsyncStorage(
  ASYNC_THEME_VAL,
  'light' as ThemeType,
);

export const RegMachine = atomWithMachine(RegisterMachine);
export const cityAtom = atom('');
