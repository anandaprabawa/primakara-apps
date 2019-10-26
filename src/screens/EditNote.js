import React from 'react';
import {View, StyleSheet, ScrollView, Image, Dimensions} from 'react-native';
import {TextInput, Button, Snackbar, IconButton} from 'react-native-paper';
import ImagePicker from 'react-native-image-crop-picker';
import firebase from 'react-native-firebase';

const EditNoteScreen = ({navigation}) => {
  const {id, title, body, image: img} = navigation.getParam('note');

  const [notes, setNotes] = React.useState({title, body});
  const [image, setImage] = React.useState(img);
  const [loading, setLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState(null);

  const handleChangeNotes = field => text => {
    setNotes({...notes, [field]: text});
    setErrorMessage(null);
  };

  const handlePressCamera = async () => {
    try {
      const imageResult = await ImagePicker.openCamera({});
      const croppedImage = await ImagePicker.openCropper({
        path: imageResult.path,
        width: 512,
        height: 512,
        compressImageQuality: 0.7,
        includeBase64: true,
      });
      const base64 = `data:${croppedImage.mime};base64,${croppedImage.data}`;
      setImage(base64);
      await ImagePicker.clean();
    } catch (error) {
      return null;
    }
  };

  React.useEffect(() => {
    navigation.setParams({handlePressCamera});
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const validateForm = () => {
    if (notes.title !== '' && notes.body !== '') {
      return Promise.resolve();
    }
    return Promise.reject(new Error('Field cannot be empty'));
  };

  const handleEditNote = async () => {
    setLoading(true);
    try {
      await validateForm();
      await firebase
        .firestore()
        .collection('notes')
        .doc(id)
        .set({...notes, image});
      navigation.popToTop();
    } catch (error) {
      setLoading(false);
      setErrorMessage(error.message);
    }
  };

  const handleDismissSnackBar = () => {
    setErrorMessage(null);
  };

  const handleDismissImage = () => {
    setImage(null);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollviewContent}>
      <View style={styles.container}>
        {image && (
          <View>
            <Image
              style={styles.image}
              source={{uri: image}}
              resizeMode="cover"
            />
            <IconButton
              icon="close"
              color="#ffffff"
              style={styles.closeImageIcon}
              onPress={handleDismissImage}
            />
          </View>
        )}
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
          onPress={handleEditNote}>
          Save
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

EditNoteScreen.navigationOptions = ({navigation}) => ({
  title: 'Edit Note',
  headerRight: (
    <IconButton
      icon="camera"
      color="#ffffff"
      onPress={navigation.getParam('handlePressCamera')}
    />
  ),
});

const screenWidth = Dimensions.get('screen').width;
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
  image: {
    width: '100%',
    height: screenWidth - 48,
    marginBottom: 24,
  },
  closeImageIcon: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
});

export default EditNoteScreen;
