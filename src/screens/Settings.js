import React from 'react';
import {View, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {HeaderComponent} from '../components';

const Settings = () => {
  const renderHeader = () => {
    return <HeaderComponent title="Settings" />;
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      {renderHeader()}
      <View>
        <Text>Settings data goes here</Text>
      </View>
    </SafeAreaView>
  );
};

export default Settings;
