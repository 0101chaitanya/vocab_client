import React from 'react';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { Platform } from 'react-native';
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'red',
  },
  font: {
    fontFamily: 'KumbhSans',
  },
  container: {
    flex: 1,
    fontFamily: 'KumbhSans',
  },
  get diag() {
    return {
      alignSelf: 'center',
      margin: 10,
      padding: 15,
      width: Platform.OS === 'web' ? '60%' : '80%',
      fontFamily: 'KumbhSans',
    };
  },

  get wordContainer() {
    return {
      width: Platform.OS === 'web' ? '61%' : '80%',
      alignSelf: 'center',
      padding: 5,
      margin: 5,
      fontFamily: 'KumbhSans',
    };
  },

  get headingSmall() {
    return {
      fontFamily: 'KumbhSans',

      padding: 20,
      fontSize: 25,
      alignSelf: 'flex-start',
      margin: 10,
    };
  },
  get pos() {
    return {
      padding: 5,
      margin: 5,
      fontFamily: 'KumbhSans',
    };
  },

  get button() {
    return {
      margin: 10,
      backgroundColor: this.colors.primary,
      borderRadius: 10,
      width: Platform.OS === 'web' ? '40%' : '80%',
      alignSelf: 'center',
      fontFamily: 'KumbhSans',
    };
  },
  get warn() {
    return {
      fontSize: 18,
      color: this.colors.primary,
      margin: 10,
      alignSelf: 'center',
      fontFamily: 'KumbhSans',
    };
  },
  get txtInput() {
    return {
      backgroundColor: 'white',
      color: this.colors.primary,
      width: Platform.OS === 'web' ? '40%' : '80%',
      alignSelf: 'center',
      fontFamily: 'KumbhSans',
    };
  },
  get search() {
    return {
      margin: 10,
      width: Platform.OS === 'web' ? '60%' : '80%',
      alignSelf: 'center',
      borderRadius: 10,
      fontFamily: 'KumbhSans',
    };
  },
  get fab() {
    return {
      backgroundColor: this.colors.primary,
      position: 'absolute',
      margin: 20,
      right: 0,
      bottom: 0,
      fontFamily: 'KumbhSans',
    };
  },
};

export default theme;
