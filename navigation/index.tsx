import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  DefaultTheme,
  NavigationContainer,
  useNavigation,
} from '@react-navigation/native';
import {useAtom} from 'jotai';
import {
  Box,
  Heading,
  Input,
  Pressable,
  Spinner,
  Switch,
  Text,
  useTheme,
  useThemeProps,
  VStack,
} from 'native-base';
import {Platform, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {Feather, Ionicons, FontAwesome5} from '@expo/vector-icons';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {
  RootProp,
  RootStackParamList,
  RootTabParamList,
  SignInStackParamList,
} from './types';
import {
  ASYNC_THEME_VAL,
  cityAtom,
  currentTheme,
  ifSignedIn,
} from '../constants/atoms';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/SignIn/LoginScreen';
import RegisterScreen from '../screens/SignIn/RegisterScreen';
import ProfileImage from '../components/ProfileImage';
import {BlurView} from '@react-native-community/blur';
import ExploreScreen from '../screens/ExploreScreen';
import Layout, {SAFE_AREA_PADDING} from '../constants/Layout';
import AddTitleScreen from '../screens/CreateEvent/AddTitleScreen';
import EventDetailsScreen from '../screens/EventDetailScreen';
import AddDateScreen from '../screens/CreateEvent/AddDateScreen';
import RepeatScreen from '../screens/CreateEvent/RepeatScreen';
import SearchAddressScreen from '../screens/CreateEvent/SearchAdressScreen';
import ReviewScreen from '../screens/CreateEvent/ReviewScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ImageViewerScreen from '../screens/ImageViewerScreen';
import CalendarSyncScreen from '../screens/SignIn/CalendarSyncScreen';
import useColorScheme from '../hooks/useColorScheme';
import {ThemeType} from '../nativebase/themes';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const uri =
  'https://media-exp1.licdn.com/dms/image/C5603AQEQZuyIujt9xA/profile-displayphoto-shrink_200_200/0/1640233246542?e=2147483647&v=beta&t=06q_FRXOtNMMPTnZmHt7CDL6g3C6tC_0erJ4JaWTNgo';

const BottomTabNavigator = () => {
  const Stack = createBottomTabNavigator<RootTabParamList>();
  const [city] = useAtom(cityAtom);
  const [currTheme] = useAtom(currentTheme);
  const {colors} = useTheme();
  const navigation = useNavigation<RootProp>();

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
              <Pressable
                onPress={() => {
                  navigation.openDrawer();
                }}
                backgroundColor="transparent"
                pl={3}>
                <ProfileImage uri={uri} />
              </Pressable>
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
        component={ProfileScreen}
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
          title: 'Account',
        }}
      />
    </Stack.Navigator>
  );
};

const store_theme = async (theme: ThemeType) => {
  await AsyncStorage.setItem(ASYNC_THEME_VAL, theme);
};

function CustomDrawerContent(props: DrawerContentComponentProps) {
  return (
    <DrawerContentScrollView {...props}>
      <Box bg="transparent" px={SAFE_AREA_PADDING.paddingLeft} mb={10}>
        <ProfileImage uri={uri} size={16} />
      </Box>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

const DrawerNavigator = () => {
  const Stack = createDrawerNavigator();
  const {colors} = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        overlayColor: 'rgba(0, 0, 0, 0.8)',
      }}
      drawerContent={CustomDrawerContent}>
      <Stack.Screen
        name="Home"
        component={BottomTabNavigator}
        options={{
          drawerIcon: ({color, size, focused}) => {
            return (
              <Feather
                name="home"
                size={size}
                color={focused ? colors.constants.primary : color}
              />
            );
          },
        }}
      />
    </Stack.Navigator>
  );
};

const RootNavigator = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>();

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Root" component={DrawerNavigator} />
      <Stack.Screen
        name="ImageView"
        component={ImageViewerScreen}
        options={{presentation: 'containedTransparentModal'}}
      />
      <Stack.Group>
        <Stack.Screen name="CreateTitle" component={AddTitleScreen} />
        <Stack.Screen name="EventDetails" component={EventDetailsScreen} />
        <Stack.Screen name="AddDate" component={AddDateScreen} />
        <Stack.Screen name="Repeat" component={RepeatScreen} />
        <Stack.Screen name="SearchAddress" component={SearchAddressScreen} />
        <Stack.Screen name="Review" component={ReviewScreen} />
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
      <Stack.Screen name="CalendarSync" component={CalendarSyncScreen} />
    </Stack.Navigator>
  );
};

const Navigation = () => {
  const [currTheme] = useAtom(currentTheme);
  const {colors} = useTheme();

  const [ifSignIn] = useAtom(ifSignedIn);

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
