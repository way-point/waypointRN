import {NavigatorScreenParams} from '@react-navigation/native';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {feedDataProps} from '../constants/types';

export type RootTabParamList = {
  Home: undefined;
  Search: undefined;
  Notification: undefined;
  Account: undefined;
};

export type DrawerTabParamList = {
  Home: NavigatorScreenParams<RootTabParamList> | undefined;
};

export type RootStackParamList = {
  Root: NavigatorScreenParams<DrawerTabParamList> | undefined;
  EventDetails: {event: feedDataProps};
  CreateTitle: undefined;
  AddDate: undefined;
  Repeat: undefined;
  SearchAddress: undefined;
  Review: undefined;
  ImageView: {item: feedDataProps};
};

export type SignInStackParamList = {
  Login: undefined;
  Register: undefined;
  CalendarSync: undefined;
};

export type SignInProp = NativeStackNavigationProp<SignInStackParamList>;
export type RootProp = DrawerNavigationProp<RootStackParamList>;
