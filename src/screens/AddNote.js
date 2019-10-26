import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {TextInput, Button, Snackbar} from 'react-native-paper';
import firebase from 'react-native-firebase';

const AddNoteScreen = ({navigation}) => {
  const [notes, setNotes] = React.useState({title: '', body: ''});
  const [loading, setLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState(null);

  const handleChangeNotes = field => text => {
    setNotes({...notes, [field]: text});
    setErrorMessage(null);
  };

  const validateForm = () => {
    if (notes.title !== '' && notes.body !== '') {
      return Promise.resolve();
    }
    return Promise.reject(new Error('Field cannot be empty'));
  };

  const handleAddNote = async () => {
    setLoading(true);
    try {
      await validateForm();
      await firebase
        .firestore()
        .collection('notes')
        .add(notes);
      navigation.goBack();
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDismissSnackBar = () => {
    setErrorMessage(null);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollviewContent}>
      <View style={styles.container}>
        <TextInput
          style={styles.field}
          label="Title"
          value={notes.title}
          onChangeText={handleChangeNotes('title')}
        />
        <TextInput
          style={styles.field}
          multiline
          label="Notes..."
          numberOfLines={6}
          value={notes.body}
          onChangeText={handleChangeNotes('body')}
        />
        <Button
          style={styles.button}
          contentStyle={styles.contentButton}
          mode="contained"
          loading={loading}
          onPress={handleAddNote}>
          Add
        </Button>
      </View>
      <Snackbar
        visible={!!errorMessage}
        onDismiss={handleDismissSnackBar}
        action={{label: 'Dismiss', onPress: handleDismissSnackBar}}>
        {errorMessage}
      </Snackbar>
    </ScrollView>
  );
};

AddNoteScreen.navigationOptions = {
  title: 'Add Note',
};

const styles = StyleSheet.create({
  scrollviewContent: {
    flexGrow: 1,
  },
  container: {
    flexGrow: 1,
    padding: 24,
  },
  field: {
    marginBottom: 16,
  },
  contentButton: {
    height: 48,
  },
  button: {
    marginTop: 'auto',
  },
});

export default AddNoteScreen;
