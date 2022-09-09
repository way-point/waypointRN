import {MenuView} from '@react-native-menu/menu';
import {useAtom} from 'jotai';
import {Pressable, useTheme} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import React from 'react';
import {Platform, StyleSheet} from 'react-native';
import {currentTheme} from '../constants/atoms';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

const styles = StyleSheet.create({
  padding: {
    padding: 3,
  },
});

const Menu = () => {
  const [currTheme] = useAtom(currentTheme);
  const {colors} = useTheme();

  if (Platform.OS === 'android') {
    return null;
  }

  const options = {
    enableVibrateFallback: true,
    ignoreAndroidSystemSettings: false,
  };

  return (
    // @ts-ignore
    <MenuView
      shouldOpenOnLongPress
      title="Menu Title"
      onPressAction={({nativeEvent}) => {
        console.warn(JSON.stringify(nativeEvent));
      }}
      actions={[
        {
          id: 'add',
          title: 'Add to List',
          image: 'plus',
        },
        {
          id: 'share',
          title: 'Share Action',
          subtitle: 'Share action on SNS',
          image: 'square.and.arrow.up',
          state: 'on',
        },
        {
          id: 'destructive',
          title: 'Destructive Action',
          attributes: {
            destructive: true,
          },
          image: 'trash',
        },
      ]}>
      <Pressable
        onLongPress={() => {
          ReactNativeHapticFeedback.trigger('impactHeavy', options);
        }}
        bg={colors[currTheme].background}
        borderRadius={10}
        borderColor={colors[currTheme].text}
        borderWidth={1}>
        <MaterialCommunityIcons
          name="roller-skate"
          size={24}
          color={colors[currTheme].text}
          style={styles.padding}
        />
      </Pressable>
    </MenuView>
  );
};

export default Menu;
