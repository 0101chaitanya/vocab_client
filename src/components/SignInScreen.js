//import liraries
import React, { Component, useEffect, useState } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import {
  Card,
  Text,
  Headline,
  Button,
  TextInput,
  FAB,
  Paragraph,
  useTheme,
} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Formik } from 'formik';
import { LOGIN } from '../queries/gqlQueries';
import * as Yup from 'yup';
import { useMutation } from '@apollo/client';

const SignInSchema = Yup.object().shape({
  username: Yup.string()
    .min(4, 'Too Short!')
    .max(10, 'Too Long!')
    .required('Required'),
  password: Yup.string()
    .min(6, 'Too Short!')
    .max(12, 'Too Long!')
    .required('Required'),
});

// create a component
const SignIn = ({ user, navigation, route, setUser }) => {
  const [login, { data, called, loading, error: Error }] = useMutation(LOGIN);
  console.log(data);
  useEffect(() => {
    if (data) {
      const Token = data.login.token;
      setUser((prevUser) => ({
        ...prevUser,
        token: Token,
      }));
      console.log(Token);
      (async () => {
        await AsyncStorage.setItem('@gql_vocab_token', Token);

        const lol = await AsyncStorage.getItem('@gql_vocab_token');

        console.log('res', lol);
        return lol;
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  /*   const clearAsyncStorage = async () => {
    return AsyncStorage.clear();
  };
  clearAsyncStorage();
 */
  console.log(Error);
  const { container, headingSmall, warn, button, txtInput } = useTheme();
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <Formik
        initialValues={{ username: '', password: '' }}
        validationSchema={SignInSchema}
        onSubmit={({ username, password }) => {
          console.log(username, password);
          login({
            variables: {
              username,
              password,
            },
          });
        }}>
        {({ handleChange, errors, handleBlur, handleSubmit, values }) => (
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <Text style={headingSmall}>Sign In</Text>
            <TextInput
              style={txtInput}
              onChangeText={handleChange('username')}
              onBlur={handleBlur('username')}
              value={values.username}
              mode='outlined'
              label='Username'
            />
            <Text style={warn}>{errors.username}</Text>
            <TextInput
              style={txtInput}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              mode='outlined'
              label='Password'
              secureTextEntry={true}
            />

            <Text style={warn}>{errors.password}</Text>

            <Button mode='contained' onPress={handleSubmit} style={button}>
              Submit
            </Button>
            <Text
              style={{
                color: 'red',
                alignSelf: 'center',
              }}>
              OR
            </Text>
            <Button
              mode='contained'
              onPress={() => navigation.navigate('SignUp')}
              style={button}>
              SignUp
            </Button>
          </ScrollView>
        )}
      </Formik>
    </ScrollView>
  );
};

// define your styles

//make this component available to the app
export default SignIn;
/* style={{
        ...container,
        alignItems: 'center',
        justifyContent: 'center',
      }}
       */
/* <Paragraph style={warn}>
              {called
                ? error
                  ? `Error: ${error}`
                  : called && data && data.login.token
                  ? `Login successful`
                  : 'Login failed'
                : ''}
            </Paragraph>
          */
