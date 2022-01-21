import React from 'react';
import {Keyboard} from 'react-native';
import {theme} from '../constants';
import {TextInput} from 'react-native-paper';

const TextInputComponent = ({
  label,
  mode,
  refs,
  onChangeText,
  value,
  keyboardType,
  placeholder,
  placeholderTextColor,
  secureTextEntry,
  outlineColor,
  editable,
  autoCapitalize,
  style,
  multiline,
  maxLength,
  customTheme,
}) => {
  const submit = () => {
    Keyboard.dismiss();
  };

  return (
    <TextInput
      label={label}
      mode={mode ? mode : 'outlined'}
      ref={refs}
      underlineColorAndroid="transparent"
      value={value}
      autoCorrect={false}
      outlineColor={outlineColor}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor={placeholderTextColor}
      autoCapitalize={autoCapitalize ? autoCapitalize : 'none'}
      blurOnSubmit={false}
      editable={editable}
      keyboardType={keyboardType}
      onSubmitEditing={submit}
      secureTextEntry={secureTextEntry}
      multiline={multiline}
      maxLength={maxLength}
      style={[
        {
          height: theme.Sizes.S14 * 3.5,
          backgroundColor: theme.Colors.white,
        },
        style,
      ]}
      theme={customTheme}
    />
  );
};

export default TextInputComponent;
