import React from 'react';
import {StyleSheet} from 'react-native';
import {theme} from '../constants';
import {Appbar} from 'react-native-paper';

const HeaderComponent = ({
  headerStyle,
  title,
  titleStyle,
  subtitle,
  subtitleStyle,
  children,
  backButtonPress,
  backButtonStyle,
  backButton,
  actionIcon,
  actionStyle,
  actionPress,
  actionIconColor,
  actionSize,
  actionIcon2,
  actionStyle2,
  actionPress2,
  actionIconColor2,
  actionSize2,
  visible,
}) => {
  return (
    <Appbar.Header style={[styles.header, headerStyle]}>
      {backButton ? (
        <Appbar.BackAction style={backButtonStyle} onPress={backButtonPress} />
      ) : null}
      {/* <Text style={[styles.title, titleStyle]}>{title}</Text> */}
      <Appbar.Content
        title={title}
        titleStyle={[styles.title, titleStyle]}
        subtitle={subtitle}
        subtitleStyle={subtitleStyle}
      />

      <Appbar.Action
        icon={actionIcon}
        style={actionStyle}
        onPress={actionPress}
        color={actionIconColor}
        size={actionSize}
      />
      <Appbar.Action
        icon={actionIcon2}
        style={actionStyle2}
        onPress={actionPress2}
        color={actionIconColor2}
        size={actionSize2}
      />

      {children}
    </Appbar.Header>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: theme.Colors.blue,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    // ...theme.Fonts.fontBold,
    color: theme.Colors.white,
    fontSize: theme.Sizes.F16,
  },
});

export default HeaderComponent;
