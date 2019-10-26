import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {TextInput, Text, withTheme, Button, Snackbar} from 'react-native-paper';
import firebase from 'react-native-firebase';

const SignIn = ({theme, navigation}) => {
  /* State to temporary save data only on this screen (SignIn) when `handleChangeTextInput` invoked */
  const [field, setField] = React.useState({email: '', password: ''});

  /* Loading state used while waiting response from firebase */
  const [loading, setLoading] = React.useState(false);

  /* Error state */
  const [errorMessage, setErrorMessage] = React.useState(null);

  /* Function to handle input change to save data in the state */
  const handleChangeTextInput = fieldName => text => {
    setField({...field, [fieldName]: text});
    setErrorMessage(null);
  };

  /* Function to validate form inputs */
  const validateForm = async () => {
    if (field.email !== '' && field.password !== '') {
      return Promise.resolve();
    }
    return Promise.reject(new Error('Fields cannot be empty'));
  };

  /* Function to create user when sign in button pressed, then navigate to Home screen if success */
  const handlePressSignIn = async () => {
    setLoading(true);
    try {
      await validateForm();
      await firebase
        .auth()
        .signInWithEmailAndPassword(field.email, field.password);
      /* You don't need to setLoading to false here as the screen will switch out (not pushed) */
      navigation.navigate('Home');
    } catch (error) {
      setLoading(false);
      setErrorMessage(error.message);
    }
  };

  const handleDismissSnackBar = () => {
    setErrorMessage(null);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContentContainer}>
      <View style={styles.container}>
        <View style={styles.headerWrapper(theme.colors.primary)}>
          <Text style={styles.title}>Welcome,</Text>
          <Text style={styles.subtitle}>Login to use our app!</Text>
        </View>
        <View style={styles.bodyContainer}>
          <TextInput
            label="Email"
            value={field.email}
            onChangeText={handleChangeTextInput('email')}
            style={styles.textInput}
          />
          <TextInput
            label="Password"
            value={field.password}
            secureTextEntry
            onChangeText={handleChangeTextInput('password')}
            style={styles.textInput}
          />
          <View style={styles.buttonWrapper}>
            <Button
              mode="contained"
              contentStyle={styles.contentButton}
              style={styles.button}
              loading={loading}
              onPress={handlePressSignIn}>
              Sign In
            </Button>
          </View>
        </View>
        <Snackbar
          visible={!!errorMessage}
          onDismiss={handleDismissSnackBar}
          action={{label: 'Dismiss', onPress: handleDismissSnackBar}}>
          {errorMessage}
        </Snackbar>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContentContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    position: 'relative',
  },
  bodyContainer: {
    flex: 1,
    padding: 24,
  },
  headerWrapper: color => ({
    backgroundColor: color,
    height: 180,
    borderBottomRightRadius: 64,
    justifyContent: 'flex-end',
    padding: 24,
  }),
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    letterSpacing: 0.5,
    color: '#ffffff',
  },
  subtitle: {
    fontSize: 18,
    color: '#ffffff',
  },
  textInput: {
    marginVertical: 8,
  },
  buttonWrapper: {
    marginTop: 'auto',
  },
  contentButton: {
    height: 48,
  },
  button: {
    marginTop: 24,
  },
});

export default withTheme(SignIn);
