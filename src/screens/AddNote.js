import React from 'react';
import {ScrollView, StyleSheet, View, Image, Dimensions} from 'react-native';
import {TextInput, Button, Snackbar, IconButton} from 'react-native-paper';
import ImagePicker from 'react-native-image-crop-picker';
import firebase from 'react-native-firebase';

const AddNoteScreen = ({navigation}) => {
  const [notes, setNotes] = React.useState({title: '', body: ''});
  const [image, setImage] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState(null);

  const handleChangeNotes = field => text => {
    setNotes({...notes, [field]: text});
    setErrorMessage(null);
  };

  /* In this case, the image will be saved in Firestore. For real world, you should use Firebase Storage instead. */
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

  const handleAddNote = async () => {
    setLoading(true);
    try {
      await validateForm();
      await firebase
        .firestore()
        .collection('notes')
        .add({...notes, image});
      navigation.goBack();
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

AddNoteScreen.navigationOptions = ({navigation}) => ({
  title: 'Add Note',
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

export default AddNoteScreen;
