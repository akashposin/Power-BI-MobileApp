import React from 'react';
import {View, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {HeaderComponent} from '../components';

const Sites = () => {
  const renderHeader = () => {
    return <HeaderComponent title={'Sites'} />;
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      {renderHeader()}
      <View>
        <Text>Sites data goes here</Text>
      </View>
    </SafeAreaView>
  );
};

export default Sites;
