import React from 'react';
import {StyleSheet} from 'react-native';
import {theme} from '../constants';
import {Button} from 'react-native-paper';

const ButtonComponent = ({
  mode,
  uppercase,
  color,
  contentStyle,
  labelStyle,
  onPress,
  icon,
  style,
  children,
  disabled,
  loading,
}) => {
  return (
    <Button
      icon={icon}
      mode={mode ? mode : 'contained'}
      disabled={disabled}
      uppercase={uppercase ? uppercase : false}
      color={color}
      contentStyle={[styles.content, contentStyle]}
      labelStyle={[styles.label, labelStyle]}
      onPress={onPress}
      loading={loading}
      style={style}>
      {children}
    </Button>
  );
};

const styles = StyleSheet.create({
  content: {
    height: theme.Sizes.S14 * 3,
  },
  label: {
    // ...theme.Fonts.fontBold,
    letterSpacing: 1.5,
    fontSize: theme.Sizes.F14,
  },
});

export default ButtonComponent;
