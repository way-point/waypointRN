import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  DefaultTheme,
  NavigationContainer,
  useNavigation,
} from '@react-navigation/native';
import {useAtom} from 'jotai';
import {Box, Input, Pressable, Spinner, Text, useTheme} from 'native-base';
import {Platform, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import {Feather, Ionicons, FontAwesome5, AntDesign} from '@expo/vector-icons';
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
  SettingTabParamList,
  SignInStackParamList,
} from './types';
import {
  cityAtom,
  currentTheme,
  ifSignedIn,
  userAtom,
  UserRecommendations,
} from '../constants/atoms';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/SignIn/LoginScreen';
import RegisterScreen from '../screens/SignIn/RegisterScreen';
import ProfileImage from '../components/ProfileImage';
import {BlurView} from '@react-native-community/blur';
import ExploreScreen from '../screens/ExploreScreen';
import Layout, {SAFE_AREA_PADDING} from '../constants/Layout';
import AddTitleScreen from '../screens/CreateEvent/AddTitleScreen';
import EventDetailsScreen from '../screens/CreateEvent/EventDetailScreen';
import AddDateScreen from '../screens/CreateEvent/AddDateScreen';
import RepeatScreen from '../screens/CreateEvent/RepeatScreen';
import SearchAddressScreen from '../screens/CreateEvent/SearchAdressScreen';
import ReviewScreen from '../screens/CreateEvent/ReviewScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ImageViewerScreen from '../screens/ImageViewerScreen';
import CalendarSyncScreen from '../screens/SignIn/CalendarSyncScreen';
import EmailVerifyScreen from '../screens/SignIn/EmailVerifyScreen';
import UsernameScreen from '../screens/SignIn/UsernameScreen';
import SettingScreen from '../screens/Settings/SettingScreen';
import AccountInformationScreen from '../screens/Settings/AccountInformationScreen';
import auth from '@react-native-firebase/auth';
import findFollowerRequests from '../api/route/User/FindFollowerRequests';
import NotificationScreen from '../screens/NotificationScreen';

const BottomTabNavigator = () => {
  const Stack = createBottomTabNavigator<RootTabParamList>();
  const [city] = useAtom(cityAtom);
  const [userRecommendations, setUserRecommendations] =
    useAtom(UserRecommendations);
  const [currTheme] = useAtom(currentTheme);
  const {colors} = useTheme();
  const navigation = useNavigation<RootProp>();

  useEffect(() => {
    const findRequests = async () => {
      findFollowerRequests(undefined).then(res => {
        setUserRecommendations(res);
      });
    };
    findRequests();
    // setTimeout(findRequests, 1000 * 60);
  }, [setUserRecommendations]);

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
                <ProfileImage id={auth().currentUser?.uid} />
              </Pressable>
            );
          },
          headerTitle: () => {
            return (
              <Input
                width={Layout.window.width - 100}
                h={33}
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
              <Pressable
                onPress={() => {
                  navigation.openDrawer();
                }}
                backgroundColor="transparent"
                pl={3}>
                <ProfileImage id={auth().currentUser?.uid} />
              </Pressable>
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
        component={NotificationScreen}
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
          tabBarBadge: userRecommendations.relations_new?.length || undefined,
          headerLeft: () => {
            return (
              <Box backgroundColor="transparent" pl={3}>
                <ProfileImage id={auth().currentUser?.uid} />
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

function CustomDrawerContent(props: DrawerContentComponentProps) {
  const [{username}] = useAtom(userAtom);
  return (
    <DrawerContentScrollView {...props}>
      <Pressable
        bg="transparent"
        px={SAFE_AREA_PADDING.paddingLeft}
        flexDir="row">
        <ProfileImage id={auth().currentUser?.uid} />
        <Text fontSize={18} mt="auto" mb="auto" ml={2} opacity={0.8}>
          @{username}
        </Text>
      </Pressable>
      <Box mt={5} backgroundColor="transparent">
        <DrawerItemList {...props} />
      </Box>
    </DrawerContentScrollView>
  );
}

const SettingsNavigator = () => {
  const Stack = createNativeStackNavigator<SettingTabParamList>();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="general" component={SettingScreen} />
      <Stack.Screen name="accountInfo" component={AccountInformationScreen} />
    </Stack.Navigator>
  );
};

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
        name="Initial"
        component={BottomTabNavigator}
        options={{
          title: 'Home',
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
      <Stack.Screen
        name="Settings"
        component={SettingsNavigator}
        options={{
          drawerIcon: ({color, size, focused}) => {
            return (
              <AntDesign
                name="setting"
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
      <Stack.Screen name="EmailVerify" component={EmailVerifyScreen} />
      <Stack.Screen name="Username" component={UsernameScreen} />
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
