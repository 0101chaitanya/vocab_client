import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Platform, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts } from 'expo-font';

import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  split,
  ApolloProvider,
  gql,
  useQuery,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import MainComponent from './src/Main';
import theme from './src/styles';

const authLink = setContext(async (_, { headers }) => {
  const token1 = await AsyncStorage.getItem('@gql_vocab_token');

  return {
    headers: {
      ...headers,
      authorization: token1 ? token1 : null,
    },
  };
});
const httpLink = new HttpLink({
  uri: 'https://apollo-vocab-serve.herokuapp.com/',

  //uri: 'http://192.168.0.105:4001/',
  //uri: 'http://localhost:4001/',
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
  connectToDevTools: true,
});

export default function App() {
  const [loaded] = useFonts({
    KumbhSans: require('./assets/fonts/KumbhSans-VariableFont_wght.ttf'),
  });

  if (!loaded) {
    return null;
  }
  return (
    <SafeAreaView
      style={{
        ...theme.container(),
      }}>
      <StatusBar style='auto' />
      <ApolloProvider client={client}>
        <PaperProvider theme={theme}>
          <MainComponent />
        </PaperProvider>
      </ApolloProvider>
    </SafeAreaView>
  );
}
