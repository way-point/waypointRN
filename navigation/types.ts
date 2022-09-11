import {NavigatorScreenParams} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

export type RootTabParamList = {
  Home: undefined;
  Search: undefined;
  Notification: undefined;
  Account: undefined;
};

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Camera: undefined;
  EventDetails: undefined;
};

export type SignInStackParamList = {
  Login: undefined;
  Register: undefined;
};

export type SignInProp = StackNavigationProp<SignInStackParamList>;
export type RootProp = StackNavigationProp<RootStackParamList>;
