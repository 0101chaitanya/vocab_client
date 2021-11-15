import { useLazyQuery, useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import {
  Text,
  Modal,
  View,
  StyleSheet,
  FlatList,
  ScrollView,
} from 'react-native';
import { ADD_WORD, CURRENT_USER } from '../queries/gqlQueries';
import { Ionicons } from '@expo/vector-icons';
import {
  Searchbar,
  TextInput,
  ActivityIndicator,
  Colors,
  FAB,
  useTheme,
  Portal,
  Button,
} from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@apollo/client';

const wordSchema = Yup.object().shape({
  word: Yup.string().required('Required'),
});

const Home = ({ user, navigation, route, setUser }) => {
  const { container, headingSmall, txtInput, warn, button, search, fab } =
    useTheme();
  const [wordQuery, { data: wordData }] = useMutation(ADD_WORD);
  const { loading, error, data } = useQuery(CURRENT_USER);
  const [visible, setVisible] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const onChangeSearch = (query) => setSearchQuery(query);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  useEffect(() => {
    console.log(wordData, data);
  }, [wordData]);

  if (loading)
    return <ActivityIndicator animating={true} color={Colors.red800} />;
  if (error) return <Text>Error! {error.message}</Text>;
  return (
    <View style={container}>
      <Searchbar
        placeholder='Search'
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={search}
      />
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={{
            backgroundColor: 'white',
            padding: 10,
            flex: 1,
            width: '100%',
            justifyContent: 'start',
          }}>
          <Button
            icon={() => <AntDesign name='close' size={24} color='black' />}
            onPress={hideModal}
            style={{
              position: 'absolute',
              top: 20,
              right: 20,
            }}
          />
          <Formik
            initialValues={{ word: '' }}
            validationSchema={wordSchema}
            onSubmit={({ word }) => {
              console.log(word);
              wordQuery({
                variables: {
                  word,
                },
              });
            }}>
            {({ handleChange, errors, handleBlur, handleSubmit, values }) => (
              <View
                style={{
                  ...container,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={headingSmall}>ADD NEW WORD </Text>

                <TextInput
                  style={txtInput}
                  onChangeText={handleChange('word')}
                  onBlur={handleBlur('word')}
                  value={values.word}
                  mode='outlined'
                  label='New Word'
                />

                <Button mode='contained' onPress={handleSubmit} style={button}>
                  Submit
                </Button>
              </View>
            )}
          </Formik>
        </Modal>
      </Portal>

      <FAB small icon='plus' style={fab} onPress={showModal} />
    </View>
  );
};

export default Home;

/*< FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      /> */

/*  <Portal>
           <Modal
             visible={visible}
             onDismiss={hideModal}
             contentContainerStyle={{
               backgroundColor: 'white',
               padding: 10,
               flex: 1,
               width: '100%',
               justifyContent: 'start',
             }}>
             <Button
               icon={() => <AntDesign name='close' size={24} color='black' />}
               onPress={hideModal}
               style={{
                 position: 'absolute',
                 top: 20,
                 right: 20,
               }}
             />
             <Text>Example Modal. Click outside this area to dismiss.</Text>
           </Modal>
         </Portal>
          
 */
