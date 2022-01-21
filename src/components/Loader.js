import React from 'react';
import {ActivityIndicator} from 'react-native-paper';
import {theme} from '../constants';

const Loader = ({animate, color, size, style}) => {
  return (
    <ActivityIndicator
      animating={animate ? animate : true}
      color={color ? color : theme.Colors.grey}
      size={size ? size : 'large'}
      style={style}
    />
  );
};

export default Loader;
