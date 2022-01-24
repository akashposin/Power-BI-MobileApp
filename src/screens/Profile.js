import React from 'react';
import {View, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {HeaderComponent} from '../components';

const Profile = () => {
  const renderHeader = () => {
    return <HeaderComponent title="My Profile" />;
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      {renderHeader()}
      <View>
        <Text>Profile data goes here</Text>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
