import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {useAtom} from 'jotai';
import {Box, Spinner, Text, useTheme} from 'native-base';
import {Platform, StyleSheet} from 'react-native';
import React from 'react';
import {cityAtom, currentTheme} from '../constants/atoms';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/SignIn/LoginScreen';
import RegisterScreen from '../screens/SignIn/RegisterScreen';
import {FontAwesome5, Feather, Ionicons, Octicons} from '@expo/vector-icons';
import {
  RootStackParamList,
  RootTabParamList,
  SignInStackParamList,
} from '../types';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ProfileImage from '../components/ProfileImage';
import {BlurView} from 'expo-blur';

const BottomTabNavigator = () => {
  const Stack = createBottomTabNavigator<RootTabParamList>();
  const [city] = useAtom(cityAtom);
  const [currTheme] = useAtom(currentTheme);
  const {colors} = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        headerBackground: () => {
          return Platform.OS === 'ios' ? (
            <BlurView
              tint={colors[currTheme].blur}
              intensity={30}
              style={StyleSheet.absoluteFill}
            />
          ) : null;
        },
      }}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({color, focused}) => {
            return (
              <FontAwesome5
                name="map-marker-alt"
                size={24}
                color={focused ? colors.constants.primary : color}
              />
            );
          },
          headerLeft: () => {
            return (
              <Box backgroundColor="transparent" pl={3}>
                <ProfileImage />
              </Box>
            );
          },
          headerTitle: () => {
            return city ? <Text fontSize={18}>{city}</Text> : <Spinner />;
          },
        }}
      />

      <Stack.Screen
        name="Search"
        component={HomeScreen}
        options={{
          tabBarIcon: ({color, focused}) => {
            return (
              <Feather
                name="search"
                size={24}
                color={focused ? colors.constants.primary : color}
              />
            );
          },
          headerLeft: () => {
            return (
              <Box backgroundColor="transparent" pl={3}>
                <ProfileImage />
              </Box>
            );
          },
          title: 'Santa Cruz',
        }}
      />

      <Stack.Screen
        name="Notification"
        component={HomeScreen}
        options={{
          tabBarIcon: ({color, focused}) => {
            return (
              <Ionicons
                name="notifications-outline"
                size={24}
                color={focused ? colors.constants.primary : color}
              />
            );
          },
          headerLeft: () => {
            return (
              <Box backgroundColor="transparent" pl={3}>
                <ProfileImage />
              </Box>
            );
          },
          title: 'Santa Cruz',
        }}
      />

      <Stack.Screen
        name="Account"
        component={HomeScreen}
        options={{
          tabBarIcon: ({color, focused}) => {
            return (
              <Feather
                name="user"
                size={24}
                color={focused ? colors.constants.primary : color}
              />
            );
          },
          headerLeft: () => {
            return (
              <Box backgroundColor="transparent" pl={3}>
                <ProfileImage />
              </Box>
            );
          },
          title: 'Santa Cruz',
        }}
      />
    </Stack.Navigator>
  );
};

const RootNavigator = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>();

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Root" component={BottomTabNavigator} />
    </Stack.Navigator>
  );
};

const SignInNavigator = () => {
  const Stack = createStackNavigator<SignInStackParamList>();

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
};

const ifSignIn = false;

const Navigation = () => {
  const [currTheme] = useAtom(currentTheme);
  const {colors} = useTheme();

  const theme = {
    ...DefaultTheme,
    colors: {
      primary: colors[currTheme].navigation.primary,
      background: colors[currTheme].navigation.background,
      card: colors[currTheme].navigation.card,
      text: colors[currTheme].navigation.text,
      border: colors[currTheme].navigation.border,
      notification: colors[currTheme].navigation.notification,
    },
  };

  return (
    <NavigationContainer theme={theme}>
      {ifSignIn ? <SignInNavigator /> : <RootNavigator />}
    </NavigationContainer>
  );
};

export default Navigation;
