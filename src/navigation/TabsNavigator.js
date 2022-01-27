import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Svg, {Path} from 'react-native-svg';

import Maps from '../screens/Maps';
import {theme} from '../constants';
import Sites from '../screens/Sites';
import Profile from '../screens/Profile';
import Settings from '../screens/Settings';
import {Container} from '../components';
import {TouchableOpacity} from 'react-native';

const Tabs = createBottomTabNavigator();

const TabBarCustomButton = ({accessibilityState, children, onPress}) => {
  let isSelected = accessibilityState.selected;

  if (isSelected) {
    return (
      <Container center>
        <Container row style={{position: 'absolute', top: 0}}>
          <Container color="white" />
          <Svg
            width={theme.Sizes.S14 * 5}
            height={theme.Sizes.S14 * 4}
            viewBox="0 0 75 61">
            <Path
              d="M75.2 0v61H0V0c4.1 0 7.4 3.1 7.9 7.1C10 21.7 22.5 33 37.7 33c15.2 0 27.7-11.3 29.7-25.9.5-4 3.9-7.1 7.9-7.1h-.1z"
              fill={theme.Colors.white}
            />
          </Svg>
          <Container color="white" />
        </Container>

        <TouchableOpacity
          style={{
            top: -theme.Sizes.S10 * 2.3,
            justifyContent: 'center',
            alignItems: 'center',
            width: 50,
            height: 50,
            borderRadius: 25,
            backgroundColor: theme.Colors.blue,
          }}
          onPress={onPress}>
          {children}
        </TouchableOpacity>
      </Container>
    );
  } else {
    return (
      <TouchableOpacity
        style={{
          flex: 1,
          height: 60,
          backgroundColor: theme.Colors.white,
        }}
        activeOpacity={1}
        onPress={onPress}>
        {children}
      </TouchableOpacity>
    );
  }
};

const TabsNavigator = () => {
  return (
    <Tabs.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        // tabBarActiveTintColor: theme.Colors.white,
        // tabBarInactiveTintColor: theme.Colors.grey,
        tabBarStyle: {
          backgroundColor: 'transparent',
          borderTopWidth: 0,
          elevation: 0,
        },
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
          tabBarButton: props => <TabBarCustomButton {...props} />,
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
          tabBarButton: props => <TabBarCustomButton {...props} />,
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
          tabBarButton: props => <TabBarCustomButton {...props} />,
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
          tabBarButton: props => <TabBarCustomButton {...props} />,
        }}
      />
    </Tabs.Navigator>
  );
};

export default TabsNavigator;
