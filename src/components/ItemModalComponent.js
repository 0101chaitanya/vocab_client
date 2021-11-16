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

  return (
    <Card style={{ ...wordContainer }}>
      <Pressable onPress={showModal}>
        <Headline
          style={{
            color: colors.primary,
            paddingLeft: 15,
          }}>
          {item.word.toUpperCase()}
        </Headline>

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

              <Headline>Word : {item.word.toUpperCase()}</Headline>
              <Text style={pos}>Origin : {item.origin}</Text>
              <Text style={pos}>Phonetic : {item.phonetic}</Text>

              {item.meanings.map((item, i) => (
                <View key={i}>
                  <Text style={pos}>Part of speech : {item.partOfSpeech}</Text>
                  {item.definitions.map((definitionItem, j) => (
                    <View key={j}>
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
