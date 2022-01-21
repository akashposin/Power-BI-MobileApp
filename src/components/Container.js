import React from 'react';
import {View, StyleSheet} from 'react-native';
import {theme} from '../constants';

const Container = ({
  flex,
  row,
  center,
  middle,
  space,
  shadow,
  radius,
  style,
  color,
  children,
}) => {
  const containerStyles = [
    styles.container,
    flex && {flex},
    flex === false && {flex: 0},
    row && styles.row,
    center && styles.center,
    middle && styles.middle,
    radius && styles.radius,
    space && {justifyContent: `space-${space}`},
    shadow && styles.shadow,
    color && styles[color],
    color && !styles[color] && {backgroundColor: color},
    style,
  ];
  return <View style={containerStyles}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
  },
  center: {
    alignItems: 'center',
  },
  middle: {
    justifyContent: 'center',
  },
  radius: {
    borderRadius: theme.Sizes.radius,
  },
  shadow: {
    shadowColor: theme.Colors.black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 13,
    elevation: theme.Sizes.S10 / 1.5,
  },

  blue: {backgroundColor: theme.Colors.blue},
  black: {backgroundColor: theme.Colors.black},
  white: {backgroundColor: theme.Colors.white},
  grey: {backgroundColor: theme.Colors.grey},
  lightgrey: {backgroundColor: theme.Colors.lightgrey},
  lightgrey2: {backgroundColor: theme.Colors.lightgrey2},
  grey2: {backgroundColor: theme.Colors.grey2},
  red: {backgroundColor: theme.Colors.red},
});

export default Container;
