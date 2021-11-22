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
import AsyncStorage from '@react-native-async-storage/async-storage';

import { ADD_WORD, CURRENT_USER, SEARCH_QUERY } from '../queries/gqlQueries';
import { RefreshControl } from 'react-native-web-refresh-control';
import { patchFlatListProps } from 'react-native-web-refresh-control';
import { AntDesign } from '@expo/vector-icons';
import {
  Searchbar,
  TextInput,
  ActivityIndicator,
  Colors,
  Modal as WebModal,
  Paragraph,
  FAB,
  useTheme,
  Card,
  Dialog,
  Portal,
  Button,
} from 'react-native-paper';
import { Formik, useFormik } from 'formik';
import * as Yup from 'yup';
import ItemModal from './ItemModalComponent';
import { Entypo } from '@expo/vector-icons';
const wordSchema = Yup.object().shape({
  word: Yup.string().required('Required'),
});

const Home = ({ user, navigation, route, setUser }) => {
  const {
    container,
    headingSmall,
    pos,
    txtInput,
    warn,
    button,
    scrollContainer,
    search,
    colors,
    card,
    fab,
    diag,
  } = useTheme();
  const [visible, setVisible] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [flatData, setFlatData] = React.useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const [
    getData,
    { loading: searchLoading, error: searchError, data: searchData },
  ] = useLazyQuery(SEARCH_QUERY);

  const [
    wordQuery,
    { called, loading: addWordLoading, error: addWordError, data: addWordData },
  ] = useMutation(ADD_WORD, {
    refetchQueries: [{ query: CURRENT_USER }],
  });
  const { loading, error, data, refetch } = useQuery(CURRENT_USER);
  const [pages, setPages] = useState({
    current: 0,
    data: [],
  });
  const onChangeSearch = (query) => setSearchQuery(query);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  console.log(flatData);
  const formRef = React.useRef(null);
  React.useEffect(() => {
    setFlatData(data?.currentUser?.words);
  }, [data?.currentUser?.words]);
  console.log(searchData);
  React.useEffect(() => {
    console.log(searchData);
    const dataField =
      searchQuery || !searchError
        ? searchData?.matchingWords
        : data?.currentUser?.words;
    setFlatData(dataField);
  }, [searchQuery, searchData, searchError]);
  //  getData({ variables: { searchQuery } });
  React.useEffect(() => {
    if (flatData) {
      console.log(flatData.length);
      let arrayAfterProcess = [];
      let TargetArr;
      const fun = (input) => {
        TargetArr = [...input];
        if (TargetArr.length > 8) {
          arrayAfterProcess.push(TargetArr.splice(0, 4));
          console.log(arrayAfterProcess);
          console.log(TargetArr);
          fun(TargetArr);
        }
        //return arrayAfterProcess.push(TargetArr);
      };
      fun(flatData);
      setPages({ ...pages, data: arrayAfterProcess.concat([TargetArr]) });
      console.log(pages);
    }
    //fun(flatData);
  }, [flatData]);

  const [state, setState] = React.useState({ open: false });

  const onStateChange = ({ open }) => setState({ open });

  const { open } = state;
  if (loading)
    return <ActivityIndicator animating={true} color={Colors.primary} />;
  if (error) return <Text>Error! {error.message}</Text>;
  return (
    <View style={{ ...container, alignItems: 'center' }}>
      <View
        style={{
          ...container(),
          flexDirection: 'row',
          alignSelf: 'center',
          marginTop: 0,
          padding: 20,
          flex: 1,
          justifyContent: 'center',
          width: '100%',
          backgroundColor: colors.primary,
        }}>
        <Text
          style={{
            ...headingSmall(),
            position: 'absolute',
            left: 10,
            color: 'white',
          }}>
          Vocab
        </Text>
        <Searchbar
          onChangeText={onChangeSearch}
          value={searchQuery}
          style={{
            ...search(),
            backgroundColor: '#db6ac3',
          }}
          inputStyle={{
            color: 'white',
          }}
          placeholder='Search'
          onIconPress={() => {
            getData({ variables: { searchQuery } });
          }}
        />
        <Button
          icon={() => <AntDesign name='logout' size={30} color='white' />}
          style={{ position: 'absolute', right: 10 }}
          onPress={() => {
            AsyncStorage.clear();
            setUser({
              token: null,
              user: {},
            });
          }}
        />
      </View>
      <Card style={card(undefined, 'flex-start')}>
        <Card.Title title='Words List' />
      </Card>
      <FlatList
        contentContainerStyle={{ scrollContainer }}
        data={pages.data[pages.current]}
        renderItem={(item) => <ItemModal {...item} />}
        keyExtractor={(item) => item._id ?? item.id}
      />

      <Portal>
        <Dialog
          visible={visible}
          dismissable
          style={diag()}
          onDismiss={hideModal}>
          <View>
            <Dialog.Title style={headingSmall()}>
              Add to Dictionary
            </Dialog.Title>
            <Dialog.Content>
              <Formik
                initialValues={{ word: '' }}
                innerRef={formRef}
                validationSchema={wordSchema}
                onSubmit={({ word }) => {
                  console.log(word);
                  wordQuery({
                    variables: {
                      word,
                    },
                  });
                  addWordLoading ? null : hideModal();
                }}>
                {({
                  handleChange,
                  errors,
                  handleBlur,
                  handleSubmit,
                  values,
                }) => (
                  <View style={container()}>
                    <TextInput
                      style={txtInput()}
                      onChangeText={handleChange('word')}
                      onBlur={handleBlur('word')}
                      value={values.word}
                      label='New Word'
                      mode='flat'
                    />
                  </View>
                )}
              </Formik>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideModal}>CANCEL</Button>
              {addWordLoading ? (
                <ActivityIndicator animating={true} color='red' />
              ) : (
                <Button onPress={() => formRef.current.handleSubmit()}>
                  ADD
                </Button>
              )}
            </Dialog.Actions>
          </View>
        </Dialog>
      </Portal>
      <Portal>
        <FAB.Group
          open={open}
          icon={() => <Entypo name='menu' size={24} color='black' />}
          actions={[
            {
              icon: 'plus',
              label: 'Add word',
              onPress: () => showModal(),
              small: false,
            },
            {
              icon: () => <Entypo name='forward' size={24} color='black' />,
              label: 'Go Forward',
              onPress: () => {
                let length = pages.data.length;

                if (pages.current < pages.data.length - 1) {
                  setPages({
                    ...pages,
                    current: pages.current + 1,
                  });
                } else {
                  setPages({
                    ...pages,
                    current: 0,
                  });
                }
              },
              small: false,
            },
            {
              icon: () => <Entypo name='back' size={24} color='black' />,
              label: 'Go Back',
              onPress: () => {
                let length = pages.data.length;

                if (pages.current > 1) {
                  setPages({
                    ...pages,
                    current: pages.current - 1,
                  });
                } else {
                  setPages({
                    ...pages,
                    current: pages.data.length - 1,
                  });
                }
              },
              small: false,
            },
          ]}
          onStateChange={onStateChange}
          onPress={() => {
            if (open) {
              // do something if the speed dial is open
            }
          }}
        />
      </Portal>
    </View>
  );
};

export default Home;

/*

      <FAB small icon='plus' style={fab()}  />
      <FAB small icon='plus' style={fab()} onPress={showModal} />

      <FAB small icon='plus' style={fab()} onPress={showModal} />

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
*/

/*< FlatList
        data={DATA}
        renderItem={ItemModal}
        keyExtractor={(item) => item.id}
      /> */

/* <Paragraph style={warn}>
        {called
          ? addWordError || error
            ? JSON.stringify(addWordError.graphQLErrors[0].message) +
              JSON.stringify(error)
            : addWordData?.addWord
          : ''}
      </Paragraph>;
               
function RenderModal(props) {
  if (Platform.OS === 'web') {
    return <WebModal {...props} />;
  }

  return <Modal {...props} />;
}
 */
/* 

/*{' '}
                  <Button
                    mode='contained'
                    onPress={handleSubmit}
                    style={button}>
                    Submit
                  </Button>
                  */

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

/* 
         
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
            onSubmit={(values) => {
              const { word } = values;
              console.log(word);
              wordQuery({
                variables: {
                  word,
                },
              });
              values.word = '';
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
      */
