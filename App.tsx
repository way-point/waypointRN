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
import {StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import useCachedResources from './hooks/useCachedResources';
import NativeBaseWrapper from './nativebase/NativeBaseWrapper';
import Navigation from './navigation';

const App = () => {
  const isLoadingComplete = useCachedResources();
  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <NativeBaseWrapper>
          <Navigation />
          <StatusBar />
        </NativeBaseWrapper>
      </SafeAreaProvider>
    );
  }
};

export default App;
