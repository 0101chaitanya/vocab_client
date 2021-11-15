import React from 'react';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { Platform } from 'react-native';
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'red',
  },
  container: {
    flex: 1,
  },
  get headingSmall() {
    return {
      fontSize: 30,
      color: this.colors.primary,
      textDecorationLine: 'underline',
      alignSelf: 'center',
      margin: 10,
    };
  },
  get button() {
    return {
      margin: 10,
      backgroundColor: this.colors.primary,
      borderRadius: 10,
      width: Platform.OS === 'web' ? '40%' : '80%',
      alignSelf: 'center',
    };
  },
  get warn() {
    return {
      fontSize: 18,
      color: this.colors.primary,
      margin: 10,
      alignSelf: 'center',
    };
  },
  get txtInput() {
    return {
      color: this.colors.primary,
      width: Platform.OS === 'web' ? '40%' : '80%',
      alignSelf: 'center',
    };
  },
  get search() {
    return {
      margin: 10,
      width: Platform.OS === 'web' ? '60%' : '80%',
      alignSelf: 'center',
      borderRadius: 10,
    };
  },
  get fab() {
    return {
      backgroundColor: this.colors.primary,
      position: 'absolute',
      margin: 20,
      right: 0,
      bottom: 0,
    };
  },
};

export default theme;
