import React from 'react';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { Platform } from 'react-native';
import { Dimensions } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

class Theme {
  DefaultTheme;

  constructor(DefaultTheme) {
    this.DefaultTheme = DefaultTheme;
    this.colors = {
      ...this.DefaultTheme.colors,
      primary: 'purple',
    };
    this.animation = this.DefaultTheme.animation;
    this.dark = this.DefaultTheme.dark;
    this.fonts = this.DefaultTheme.fonts;
    this.roundness = this.DefaultTheme.roundness;
    this.fontFamily = 'KumbhSans';
  }
  wordContainer = (width = 60, space = 5) => {
    return {
      width: Platform.OS === 'web' ? `${width}%` : `${width + 20}%`,
      alignSelf: 'center',
      padding: space,
      margin: space,
      fontFamily: this.fontFamily,
      borderWidth: 2,
    };
  };
  headline = () => {
    return {
      fontFamily: this.fontFamily,
      fontWeight: 'bold',
      paddingLeft: 15,
      justifyContent: 'flex-start',
    };
  };
  card = (wid = 30, align = 'center') => {
    return {
      width: Platform.OS === 'web' ? `${wid}%` : `${wid + 20}%`,
      justifySelf: 'center',
      alignSelf: 'center',
      alignItems: align ?? 'center',
      borderRadius: 10,
      marginTop: 5,
    };
  };

  headingSmall = (fontSize = 19, space = 10) => {
    return {
      fontFamily: this.fontFamily,
      color: this.colors.primary,
      fontSize: fontSize,
      alignSelf: 'center',
      margin: space,
      fontSize: 22,
      fontWeight: 'bold',
    };
  };
  pos = () => {
    return {
      padding: 5,
      margin: 5,
      fontFamily: this.fontFamily,
    };
  };

  button = (size = 40) => {
    console.log(this);
    return {
      color: 'white',
      margin: 10,
      borderRadius: 10,
      width: Platform.OS === 'web' ? `${size}%` : `${size + 30}`,
      alignSelf: 'center',
      fontFamily: this.fontFamily,
    };
  };
  warn = () => {
    return {
      fontSize: 18,
      color: this.colors.primary,
      margin: 10,
      alignSelf: 'center',
      fontFamily: this.fontFamily,
    };
  };
  txtInput = () => {
    return {
      alignSelf: 'center',
      backgroundColor: 'white',
      color: this.colors.primary,
      width: Platform.OS === 'web' ? '40%' : '80%',
      fontFamily: this.fontFamily,
    };
  };
  search = () => {
    return {
      margin: 10,
      width: Platform.OS === 'web' ? '40%' : '70%',
      alignSelf: 'center',
      borderRadius: 10,
      fontFamily: this.fontFamily,
      color: 'white',
    };
  };
  fab = () => {
    return {
      position: Platform.OS === 'web' ? 'fixed' : 'absolute',
      top: hp('50%'), // 70% of height device screen
      right: wp('5%'), // 80% of width device screen
      fontFamily: this.fontFamily,
    };
  };

  container = () => {
    return {
      flex: 1,
    };
  };
  supplText = (align = 'center') => {
    return {
      margin: 10,
      fontSize: 18,
      color: this.colors.primary,
      alignSelf: 'center',
    };
  };

  diag = (padding) => {
    return {
      fontFamily: this.fontFamily,
      alignSelf: 'center',
      fontSize: Platform.OS === 'web' ? 20 : 30,
      margin: 10,
      padding: padding ?? 10,
      width: Platform.OS === 'web' ? '60%' : '90%',
    };
  };
  scrollContainer = () => {
    return { flexGrow: 1 };
  };
}
const theme = new Theme(DefaultTheme);
console.log(theme.diag(20));
export default theme;
