import React, { useEffect, useState } from 'react';
import { useMutation, useLazyQuery, useQuery } from '@apollo/client';
import {
  Modal,
  Platform,
  Text,
  View,
  //RefreshControl,
  StyleSheet,
  ScrollView,
  FlatList,
} from 'react-native';

import { ADD_WORD, CURRENT_USER } from '../queries/gqlQueries';
import { RefreshControl } from 'react-native-web-refresh-control';
import { patchFlatListProps } from 'react-native-web-refresh-control';

import { Ionicons } from '@expo/vector-icons';
import {
  Searchbar,
  TextInput,
  ActivityIndicator,
  Colors,
  Modal as WebModal,
  Paragraph,
  FAB,
  useTheme,
  Portal,
  Button,
} from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';
import { Formik } from 'formik';
import * as Yup from 'yup';
import ItemModal from './ItemModalComponent';

const wordSchema = Yup.object().shape({
  word: Yup.string().required('Required'),
});

const Home = ({ user, navigation, route, setUser }) => {
  const { container, headingSmall, pos, txtInput, warn, button, search, fab } =
    useTheme();
  const [
    wordQuery,
    { called, loading: addWordLoading, error: addWordError, data: addWordData },
  ] = useMutation(ADD_WORD);
  const { loading, error, data, refetch } = useQuery(CURRENT_USER);
  const [visible, setVisible] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [flatData, setFlatData] = React.useState([]);
  const onChangeSearch = (query) => setSearchQuery(query);
  const [refreshing, setRefreshing] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  console.log(flatData);

  React.useEffect(() => {
    setFlatData(data?.currentUser?.words);
  }, [data?.currentUser?.words]);

  React.useEffect(() => {
    const dataField =
      searchQuery !== ''
        ? flatData.filter((data) => data.word.includes(searchQuery))
        : data?.currentUser?.words;
    console.log(searchQuery, dataField);
    setFlatData(dataField);
  }, [searchQuery]);
  //data?.currentUser?.words ??

  if (loading)
    return <ActivityIndicator animating={true} color={Colors.red800} />;
  if (error) return <Text>Error! {error.message}</Text>;
  return (
    <View style={container}>
      <Searchbar
        placeholder='Search'
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={{ ...search }}
      />

      <Text style={{ ...pos, alignSelf: 'center' }}>Pull down to refetch</Text>

      <FlatList
        data={flatData}
        renderItem={(item) => <ItemModal {...item} />}
        keyExtractor={(item) => item._id}
        /*  refreshControl={
          <RefreshControl
            onLayout={(e) => console.log(e.nativeEvent)}
            // all properties must be transparent
            tintColor='red'
            colors={['red']}
            style={{ backgroundColor: 'red' }}
            refreshing={refreshing}
            onRefresh={() => {
              setRefreshing(true);
              /*    setTimeout(() => {
                this._addRows();
              }, 2000);
           }} */
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              setRefreshing(true);
              setTimeout(() => {
                setRefreshing(false);
                refetch();
              }, 5000);
            }}
          />
        }
      />

      <Portal>
        <RenderModal
          visible={visible}
          animationType='slide'
          onDismiss={hideModal}
          contentContainerStyle={{
            backgroundColor: 'white',
            padding: 10,
            flex: 1,
            width: '100%',
            justifyContent: 'start',
          }}>
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
                <Button
                  icon='close'
                  onPress={hideModal}
                  style={{
                    position: 'absolute',
                    top: 5,
                    margin: 10,
                    right: 10,
                  }}
                />

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
                <Paragraph style={warn}>
                  {called
                    ? addWordError || error
                      ? JSON.stringify(addWordError.graphQLErrors[0].message) +
                        JSON.stringify(error)
                      : addWordData?.addWord
                    : ''}
                </Paragraph>
              </View>
            )}
          </Formik>
        </RenderModal>
      </Portal>
      <FAB small icon='plus' style={fab} onPress={showModal} />
    </View>
  );
};

export default Home;

/*< FlatList
        data={DATA}
        renderItem={ItemModal}
        keyExtractor={(item) => item.id}
      /> */

function RenderModal(props) {
  if (Platform.OS === 'web') {
    return <WebModal {...props} />;
  }

  return <Modal {...props} />;
}
/* {<AntDesign name='close' size={24} color='black' />}
 */

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
