import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {StatusBar, useColorScheme, LogBox} from 'react-native';

import {SafeAreaProvider} from 'react-native-safe-area-context';
import TabsNavigator from './src/navigation/TabsNavigator';

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
      <NavigationContainer>
        <TabsNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
