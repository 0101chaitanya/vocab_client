//import liraries
import React, { Component, useLayoutEffect, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import SignIn from './components/SignInScreen';
import SignUp from './components/SignUpScreen';
import Home from './components/Home';
const Stack = createNativeStackNavigator();

// create a component
const MainComponent = () => {
  const [user, setUser] = React.useState({
    token: null,
    user: {},
  });
  useLayoutEffect(() => {
    const res = async () => {
      try {
        const token = await AsyncStorage.getItem('@gql_vocab_token');

        setUser((prevUser) => ({
          ...prevUser,
          token,
        }));
      } catch (e) {}
    };

    res();
  }, [user.token]);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user.token ? (
          <>
            <Stack.Screen name='Home'>
              {(props) => <Home user={user} setUser={setUser} {...props} />}
            </Stack.Screen>
          </>
        ) : (
          <>
            <Stack.Screen
              name='SignIn'
              options={{
                title: 'Sign in',
              }}>
              {(props) => <SignIn user={user} setUser={setUser} {...props} />}
            </Stack.Screen>
            <Stack.Screen name='SignUp' component={SignUp} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainComponent;
//animationTypeForReplace: !user.id ? 'pop' : 'push',