import {MenuView} from '@react-native-menu/menu';
import {View} from 'native-base';
import React from 'react';
import {Platform} from 'react-native';

// ...

const Example = () => {
  if (Platform.OS === 'android') {
    return null;
  }
  return (
    <View w={30} h={60} bg="black">
      <MenuView
        style={{width: 50, height: 50, backgroundColor: 'white'}}
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
        ]}
      />
    </View>
  );
};

export default Example;
