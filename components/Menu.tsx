import {useAtom} from 'jotai';
import {Box, useTheme} from 'native-base';
import React from 'react';
import {StyleSheet} from 'react-native';
import ContextMenu from 'react-native-context-menu-view';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {currentTheme} from '../constants/atoms';

const styles = StyleSheet.create({
  padding: {
    padding: 3,
  },
});

const Menu = () => {
  const [currTheme] = useAtom(currentTheme);
  const {colors} = useTheme();
  return (
    <ContextMenu
      actions={[{title: 'Title 1'}, {title: 'Title 2'}]}
      onPress={e => {
        console.warn(
          `Pressed ${e.nativeEvent.name} at index ${e.nativeEvent.index}`,
        );
      }}>
      <Box
        borderRadius={10}
        borderColor={colors[currTheme].text}
        borderWidth={1}>
        <MaterialCommunityIcons
          name="roller-skate"
          size={24}
          color={colors[currTheme].text}
          style={styles.padding}
        />
      </Box>
    </ContextMenu>
  );
};

export default Menu;
