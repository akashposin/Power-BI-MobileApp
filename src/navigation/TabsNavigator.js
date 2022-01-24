import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Maps from '../screens/Maps';
import {theme} from '../constants';
import Sites from '../screens/Sites';
import Profile from '../screens/Profile';
import Settings from '../screens/Settings';

const Tabs = createBottomTabNavigator();

const TabsNavigator = () => {
  return (
    <Tabs.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: theme.Colors.white,
        tabBarInactiveTintColor: theme.Colors.grey,
        tabBarStyle: {backgroundColor: theme.Colors.blue},
      }}>
      <Tabs.Screen
        name="Home"
        component={Maps}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({focused}) => (
            <MaterialCommunityIcons
              name="home"
              color={focused ? theme.Colors.white : theme.Colors.grey}
              size={theme.Sizes.F30}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Sites"
        component={Sites}
        options={{
          tabBarLabel: 'Site',
          tabBarIcon: ({focused}) => (
            <MaterialCommunityIcons
              name="sitemap"
              color={focused ? theme.Colors.white : theme.Colors.grey}
              size={theme.Sizes.F30}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({focused}) => (
            <FontAwesome
              name="user"
              color={focused ? theme.Colors.white : theme.Colors.grey}
              size={theme.Sizes.F30}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({focused}) => (
            <MaterialIcons
              name="settings"
              color={focused ? theme.Colors.white : theme.Colors.grey}
              size={theme.Sizes.F30}
            />
          ),
        }}
      />
    </Tabs.Navigator>
  );
};

export default TabsNavigator;
