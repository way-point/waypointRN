import {atom} from 'jotai';
import {atomWithMachine} from 'jotai/xstate';
import {ThemeType} from '../nativebase/themes';
import CreateEventMachine from './states/CreateEventState';
import RegisterMachine from './states/RegisterState';
import {Event} from 'expo-calendar';
import {definitions} from '../api/generated/schema';

export const ASYNC_THEME_VAL = 'theme';

export const currentTheme = atom('light' as ThemeType);

export const RegMachine = atomWithMachine(RegisterMachine);
export const EventMachine = atomWithMachine(CreateEventMachine);
export const cityAtom = atom('');

type userType = {
  username: string;
  profile_uri?: string;
};

export const userAtom = atom({
  username: '',
  profile_uri: '',
} as userType);

export const calendarSyncAtom = atom(null as Event[] | null);
export const ifSignedIn = atom(true);

export const UserRecommendations = atom({
  relations_new: [],
  relations_old: [],
} as definitions['NestedFollowersRelation']);
