import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {useAtom} from 'jotai';
import {Box, Input, Spinner, Text, useTheme} from 'native-base';
import {Platform, StyleSheet} from 'react-native';
import React from 'react';
import {Feather, Ionicons, FontAwesome5} from '@expo/vector-icons';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {
  RootStackParamList,
  RootTabParamList,
  SignInStackParamList,
} from './types';
import {cityAtom, currentTheme} from '../constants/atoms';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/SignIn/LoginScreen';
import RegisterScreen from '../screens/SignIn/RegisterScreen';
import ProfileImage from '../components/ProfileImage';
import {BlurView} from '@react-native-community/blur';
import ExploreScreen from '../screens/ExploreScreen';
import Layout from '../constants/Layout';
import AddTitleScreen from '../screens/CreateEvent/AddTitleScreen';
import EventDetailsScreen from '../screens/EventDetailScreen';

export const uri =
  'https://media-exp1.licdn.com/dms/image/C5603AQEQZuyIujt9xA/profile-displayphoto-shrink_200_200/0/1640233246542?e=2147483647&v=beta&t=06q_FRXOtNMMPTnZmHt7CDL6g3C6tC_0erJ4JaWTNgo';

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
              blurType={colors[currTheme].blur}
              blurAmount={30}
              style={StyleSheet.absoluteFill}
            />
          ) : (
            <Box style={StyleSheet.absoluteFill} />
          );
        },
      }}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({color, focused}) => {
            return (
              <Feather
                name="home"
                size={24}
                color={focused ? colors.constants.primary : color}
              />
            );
          },
          headerLeft: () => {
            return (
              <Box backgroundColor="transparent" pl={3}>
                <ProfileImage uri={uri} />
              </Box>
            );
          },
          headerTitle: () => {
            return (
              <Input
                width={Layout.window.width - 100}
                placeholder="What's on your mind?"
                textAlign="center"
                InputRightElement={
                  <Box mr={5} bg="transparent">
                    <Feather
                      name="search"
                      size={24}
                      color={colors[currTheme].text}
                    />
                  </Box>
                }
              />
            );
          },
        }}
      />

      <Stack.Screen
        name="Search"
        component={ExploreScreen}
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
                <ProfileImage uri={uri} />
              </Box>
            );
          },
          headerTitle: () => {
            return city ? <Text fontSize={18}>{city}</Text> : <Spinner />;
          },
          headerTitleAlign: 'center',
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
                <ProfileImage uri={uri} />
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
                <ProfileImage uri={uri} />
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
      <Stack.Group>
        <Stack.Screen name="CreateTitle" component={AddTitleScreen} />
        <Stack.Screen name="EventDetails" component={EventDetailsScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

const SignInNavigator = () => {
  const Stack = createNativeStackNavigator<SignInStackParamList>();

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
