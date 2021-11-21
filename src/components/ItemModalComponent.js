//import liraries
import React, { Component } from 'react';
import {
  Modal,
  View,
  Text,
  Platform,
  StyleSheet,
  Pressable,
  ScrollView,
} from 'react-native';
import {
  Headline,
  Title,
  Portal,
  Button,
  Modal as WebModal,
  Card,
  useTheme,
} from 'react-native-paper';
import { Entypo } from '@expo/vector-icons';
// create a component
const ItemModal = ({ item }) => {
  const {
    container,
    headingSmall,
    txtInput,
    warn,
    wordContainer,
    button,
    search,
    colors,
    fab,
    pos,
  } = useTheme();
  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  console.log(item);
  return (
    <Card style={{ ...wordContainer }}>
      <Pressable onPress={showModal}>
        <Headline
          style={{
            fontFamily: 'KumbhSans',
            fontWeight: 'bold',
            paddingLeft: 15,
            justifyContent: 'flex-start',
          }}>
          {item.word}
        </Headline>
        <View style={{ flexWrap: 'wrap' }}>
          {item.meanings.map((current, i) => (
            <View
              style={{
                flexDirection: 'column',
                padding: 10,
                justifyContent: 'flex-start',
              }}>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: 'KumbhSans',
                  flexWrap: 'wrap',
                  padding: 5,
                }}>
                ({current.partOfSpeech})
              </Text>

              <Text
                style={{
                  fontSize: 16,
                  fontFamily: 'KumbhSans',
                  flexWrap: 'wrap',
                  padding: 5,
                  wordBreak: 'breakWord',
                }}>
                {current.definitions[0].definition}
              </Text>
            </View>
          ))}
        </View>
        <Portal>
          <RenderModal
            visible={visible}
            animationType='slide'
            onDismiss={hideModal}
            contentContainerStyle={{
              backgroundColor: 'white',
              padding: 20,
              flex: 1,
              width: '100%',
              justifyContent: 'start',
            }}>
            <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 20 }}>
              <Button
                icon='close'
                onPress={hideModal}
                style={{
                  position: 'absolute',
                  top: 10,
                  right: 10,
                }}
              />

              <Headline
                style={{
                  fontSize: 30,
                  margin: 10,
                  fontFamily: 'KumbhSans',
                  fontWeight: 'bold',
                }}>
                {item.word}
              </Headline>
              <Text style={pos}>Origin : {item.origin}</Text>
              <Text style={pos}>Phonetic : {item.phonetic}</Text>

              {item.meanings.map((current, i) => (
                <View key={i} style={{ padding: 10 }}>
                  <Text style={{ ...pos, fontStyle: 'italic' }}>
                    <Entypo name='dot-single' size={24} color='black' />
                    Part of speech : {current.partOfSpeech}
                  </Text>
                  {current.definitions.map((definitionItem, j) => (
                    <View
                      key={j}
                      style={{ paddingLeft: 30, paddingBottom: 20 }}>
                      <Text style={pos}>
                        Definition : {definitionItem.definition}
                      </Text>
                      <Text style={pos}>
                        Example : {definitionItem.example}
                      </Text>
                      <Text style={pos}>
                        Synonyms : {definitionItem.synonyms.join(', ')}
                      </Text>
                      <Text style={pos}>
                        Antonyms : {definitionItem.antonyms.join(', ')}
                      </Text>
                    </View>
                  ))}
                </View>
              ))}
            </ScrollView>
          </RenderModal>
        </Portal>
      </Pressable>
    </Card>
  );
};

// define your styles
function RenderModal(props) {
  if (Platform.OS === 'web') {
    return <WebModal {...props} />;
  }

  return <Modal {...props} />;
}

//make this component available to the app
export default ItemModal;
