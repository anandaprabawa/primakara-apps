import React from 'react';
import {ScrollView, View, StyleSheet, Image, Dimensions} from 'react-native';
import {
  Text,
  IconButton,
  Dialog,
  Button,
  ActivityIndicator,
} from 'react-native-paper';
import firebase from 'react-native-firebase';

const DetailedNoteScreen = ({navigation}) => {
  const {id, title, body, image} = navigation.getParam('note');

  const [showDialog, setShowDialog] = React.useState(false);
  const [loadingDelete, setLoadingDelete] = React.useState(false);

  const handleDismissDialog = () => {
    setShowDialog(false);
  };

  const handleOpenDialog = () => {
    setShowDialog(true);
  };

  const handleDeleteNote = async () => {
    setLoadingDelete(true);
    try {
      await firebase
        .firestore()
        .collection('notes')
        .doc(id)
        .delete();
      navigation.goBack();
    } catch (error) {
      setLoadingDelete(false);
      return null;
    }
  };

  const handleNavigateToEditNote = () => {
    navigation.navigate('EditNote', {note: {id, title, body, image}});
  };

  React.useEffect(() => {
    navigation.setParams({
      onPressDeleteIcon: handleOpenDialog,
      onPressEditIcon: handleNavigateToEditNote,
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          {image && (
            <Image
              source={{uri: image}}
              resizeMode="cover"
              style={styles.image}
            />
          )}
          <View style={styles.field}>
            <Text style={styles.label}>Title</Text>
            <Text style={styles.text}>{title}</Text>
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>Notes</Text>
            <Text style={styles.text}>{body}</Text>
          </View>
        </View>
      </ScrollView>
      <Dialog visible={showDialog} onDismiss={handleDismissDialog}>
        {!loadingDelete && <Dialog.Title>Alert</Dialog.Title>}
        <Dialog.Content>
          {loadingDelete ? (
            <ActivityIndicator />
          ) : (
            <Text>Are you sure to delete this note?</Text>
          )}
        </Dialog.Content>
        {!loadingDelete && (
          <Dialog.Actions>
            <Button onPress={handleDeleteNote}>Yes</Button>
            <Button onPress={handleDismissDialog}>No</Button>
          </Dialog.Actions>
        )}
      </Dialog>
    </>
  );
};

DetailedNoteScreen.navigationOptions = ({navigation}) => ({
  title: 'Detailed Note',
  headerRight: (
    <>
      <IconButton
        icon="pencil"
        color="#ffffff"
        onPress={navigation.getParam('onPressEditIcon')}
      />
      <IconButton
        icon="delete"
        color="#ffffff"
        onPress={navigation.getParam('onPressDeleteIcon')}
      />
    </>
  ),
});

const screenWidth = Dimensions.get('screen').width;
const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  field: {
    marginBottom: 24,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 4,
    fontSize: 16,
  },
  text: {
    fontSize: 16,
  },
  image: {
    width: '100%',
    height: screenWidth - 48,
    marginBottom: 24,
  },
});

export default DetailedNoteScreen;
