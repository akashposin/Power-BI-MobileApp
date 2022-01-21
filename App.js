import React from 'react';
import {StatusBar, useColorScheme, LogBox} from 'react-native';

import {SafeAreaProvider} from 'react-native-safe-area-context';

import Maps from './src/screens/Maps';

LogBox.ignoreLogs(['Geojson: prop type `tappable` is invalid']);

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        translucent={true}
      />

      <Maps />
    </SafeAreaProvider>
  );
};

export default App;
