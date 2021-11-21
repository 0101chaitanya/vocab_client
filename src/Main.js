//import liraries
import React, { Component, useLayoutEffect, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import SignIn from './components/SignInScreen';
import SignUp from './components/SignUpScreen';
import Home from './components/Home';
import { Button } from 'react-native-paper';
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
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user.token ? (
          <>
            <Stack.Screen
              name=' '
              options={({ navigation, route }) => ({
                headerShown: false,
                headerRight: (props) => (
                  <Button
                    onPress={() => {
                      AsyncStorage.clear();
                      setUser({
                        token: null,
                        user: {},
                      });
                    }}>
                    Log out
                  </Button>
                ),
              })}>
              {(props) => <Home user={user} setUser={setUser} {...props} />}
            </Stack.Screen>
          </>
        ) : (
          <>
            <Stack.Screen name='SignIn'>
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
