import {Dimensions} from 'react-native';
import {moderateScale} from 'react-native-size-matters';

const {width, height} = Dimensions.get('window');

export const Colors = {
  // blue: '#000080',
  blue: '#147CF6',
  black: '#000000',
  black2: '#242423',
  black3: '#495057',
  white: '#FFFFFF',
  grey: '#B5B5B5',
  grey2: '#C4C4C4',
  lightgrey: '#EBEAF0',
  lightgrey2: '#F9F9F9',
  red: '#EF1010',
  green: '#07853b',
  skyBlue: '#09b3de',
  toast: '#808080',
};

export const Sizes = {
  F10: moderateScale(10),
  F11: moderateScale(11),
  F12: moderateScale(12),
  F13: moderateScale(13),
  F14: moderateScale(14),
  F15: moderateScale(15),
  F16: moderateScale(16),
  F17: moderateScale(17),
  F18: moderateScale(18),
  F20: moderateScale(20),
  F22: moderateScale(22),
  F24: moderateScale(24),
  F25: moderateScale(25),
  F26: moderateScale(26),
  F30: moderateScale(30),
  F50: moderateScale(50),

  S10: moderateScale(10),
  S12: moderateScale(12),
  S14: moderateScale(14),
  radius: moderateScale(30),
  width,
  height,
};

// export const Fonts = {
//   fontRegular: {
//     fontFamily: 'Lato-Regular',
//   },
//   fontBold: {
//     fontFamily: 'Lato-Bold',
//   },
//   fontSemiBold: {
//     fontFamily: 'Lato-Semibold',
//   },
//   fontLight: {
//     fontFamily: 'Lato-Light',
//   },
// };

// export const darkTheme = {
//   name: 'dark',
//   backgroundColor: Colors.black2,
//   textWhiteBlack: Colors.white,
//   textWhiteBlue: Colors.white,
//   textBlackWhite: Colors.black,
//   textGrey: Colors.grey,
//   textWhiteGrey: Colors.white,
//   textBlackGrey: Colors.grey,
//   textBlueGrey: Colors.grey,
//   textBlueBlack: Colors.black,
//   textRed: Colors.red,
//   buttonColor: Colors.white,
//   buttonTextColor: Colors.black,
//   tabBackgroundColor: Colors.lightgrey,
//   cardBackgroundColor: Colors.black3,
//   headerColorWhiteBlack: Colors.black3,
//   headerColorBlueBlack: Colors.black3,
//   statusBarColor: Colors.black3,
//   loaderColor: Colors.white,
//   lightgreyWhite: Colors.white,
// };

// export const lightTheme = {
//   name: 'light',
//   backgroundColor: Colors.white,
//   textWhiteBlack: Colors.black,
//   textWhiteBlue: Colors.blue,
//   textBlackWhite: Colors.white,
//   textGrey: Colors.grey,
//   textWhiteGrey: Colors.grey,
//   textBlackGrey: Colors.black,
//   textBlueGrey: Colors.blue,
//   textBlueBlack: Colors.blue,
//   textRed: Colors.red,
//   buttonColor: Colors.blue,
//   buttonTextColor: Colors.white,
//   tabBackgroundColor: Colors.lightgrey2,
//   cardBackgroundColor: Colors.white,
//   headerColorWhiteBlack: Colors.white,
//   headerColorBlueBlack: Colors.blue,
//   statusBarColor: Colors.blue,
//   loaderColor: Colors.blue,
//   lightgreyWhite: Colors.lightgrey,
// };

// export const selectedTheme = lightTheme;

const appTheme = {
  Colors,
  Sizes,
  // darkTheme, lightTheme
};

export default appTheme;
