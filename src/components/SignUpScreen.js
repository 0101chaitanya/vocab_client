//import liraries
import React, { Component, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import {
  Card,
  Text,
  Headline,
  Button,
  TextInput,
  Paragraph,
  useTheme,
} from 'react-native-paper';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@apollo/client';
import { REGISTER } from '../queries/gqlQueries';

const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .min(4, 'Too Short!')
    .max(10, 'Too Long!')
    .required('Required'),
  password: Yup.string()
    .min(6, 'Too Short!')
    .max(12, 'Too Long!')
    .required('Required'),
  passwordConfirmation: Yup.string().oneOf(
    [Yup.ref('password'), null],
    'Passwords must match'
  ),
});

// create a component
const SignIn = ({ user, navigation, route, setUser }) => {
  const { container, headingSmall, warn, button, txtInput } = useTheme();

  const [register, registerResult] = useMutation(REGISTER);
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <Formik
        initialValues={{ username: '', password: '', passwordConfirmation: '' }}
        validationSchema={SignupSchema}
        onSubmit={({ username, password }) => {
          register({
            variables: {
              username,
              password,
            },
          });
        }}>
        {({ handleChange, errors, handleBlur, handleSubmit, values }) => (
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <Text style={headingSmall}>Sign Up</Text>
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
            <TextInput
              style={txtInput}
              onChangeText={handleChange('passwordConfirmation')}
              onBlur={handleBlur('passwordConfirmation')}
              value={values.passwordConfirmation}
              mode='outlined'
              label='Confirm Password'
              secureTextEntry={true}
            />

            <Text style={warn}>{errors.passwordConfirmation}</Text>

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
              onPress={() => navigation.navigate('SignIn')}
              style={button}>
              SignIn
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

/*   <Paragraph style={warn}>
              {registerResult.called
                ? error
                  ? `Error: ${error}`
                  : registerResult.called &&
                    registerResult.data &&
                    registerResult.data.register
                  ? ` successfully registered`
                  : 'Registration failed'
                : ''}
            </Paragraph>
          */
