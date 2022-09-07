import {atom} from 'jotai';
import {atomWithMachine} from 'jotai/xstate';
import {ThemeType} from '../nativebase/themes';
import RegisterMachine from './states/RegisterState';

export const currentTheme = atom('light' as ThemeType);
export const RegMachine = atomWithMachine(RegisterMachine);
export const cityAtom = atom('');
