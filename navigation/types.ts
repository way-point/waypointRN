import {NavigatorScreenParams} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {feedDataProps} from '../constants/types';

export type RootTabParamList = {
  Home: undefined;
  Search: undefined;
  Notification: undefined;
  Account: undefined;
};

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Camera: undefined;
  EventDetails: {event: feedDataProps};
  CreateTitle: undefined;
  AddDate: undefined;
  Repeat: undefined;
};

export type SignInStackParamList = {
  Login: undefined;
  Register: undefined;
};

export type SignInProp = NativeStackNavigationProp<SignInStackParamList>;
export type RootProp = NativeStackNavigationProp<RootStackParamList>;
