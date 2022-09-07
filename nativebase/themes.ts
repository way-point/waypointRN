import customStyleDark from '../constants/mapStyle/customStyleDark';
import customStyleLight from '../constants/mapStyle/customStyleLight';

export interface ThemeProps {
  navigation: {
    primary: string;
    background: string;
    card: string;
    text: string;
    border: string;
    notification: string;
  };
  map: any;
  blur: 'light' | 'dark';
  background: string;
  text: string;
  textField: string;
  error: string;
}

const constants = {
  primary: '#1DA1F2',
};

const LightTheme: ThemeProps = {
  navigation: {
    primary: '#1DA1F2',
    background: '#F7F8FA',
    card: '#F6F6F6',
    text: '#000',
    border: '#888',
    notification: '#FF881E',
  },
  map: customStyleLight,
  blur: 'light',
  background: '#FFF',
  text: '#000',
  textField: '#F6F6F6',
  error: '#FF8A8A',
};

const DarkTheme: ThemeProps = {
  navigation: {
    primary: '#1DA1F2',
    background: '#05121F',
    card: '#1E2F47',
    text: '#E5E6E7',
    border: 'transparent',
    notification: '#FF881E',
  },
  map: customStyleDark,
  blur: 'dark',
  background: '#0D1C2D',
  text: '#E5E6E7',
  textField: '#1E2F47',
  error: '#FF8A8A',
};

export const Themes = {
  light: LightTheme,
  dark: DarkTheme,
  constants,
};

export type ThemeType = 'light' | 'dark';
