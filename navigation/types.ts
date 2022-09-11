import {NavigatorScreenParams} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
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
};

export type SignInStackParamList = {
  Login: undefined;
  Register: undefined;
};

export type SignInProp = StackNavigationProp<SignInStackParamList>;
export type RootProp = StackNavigationProp<RootStackParamList>;
