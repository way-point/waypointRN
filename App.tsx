/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {StatusBar, StyleSheet} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import useCachedResources from './hooks/useCachedResources';
import NativeBaseWrapper from './nativebase/NativeBaseWrapper';
import Navigation from './navigation';

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
});

const App = () => {
  const isLoadingComplete = useCachedResources();
  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <GestureHandlerRootView style={styles.flex}>
          <NativeBaseWrapper>
            <Navigation />
            <StatusBar />
          </NativeBaseWrapper>
        </GestureHandlerRootView>
      </SafeAreaProvider>
    );
  }
};

export default App;
