import React from 'react';
import {View, StyleSheet, ScrollView, StatusBar} from 'react-native';
import {TextInput, Text, withTheme, Button, Snackbar} from 'react-native-paper';
import firebase from 'react-native-firebase';

const SignUp = ({theme, navigation}) => {
  /* State to temporary save data only on this screen (SignUp) when `handleChangeTextInput` invoked */
  const [field, setField] = React.useState({name: '', email: '', password: ''});

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
    if (field.email !== '' && field.name !== '' && field.password !== '') {
      return Promise.resolve();
    }
    return Promise.reject('Fields cannot be empty');
  };

  /* Function to create user when sign up button pressed, then navigate to Home screen if success */
  const handlePressSignUp = async () => {
    setLoading(true);
    try {
      await validateForm().catch(error => {
        throw new Error(error);
      });
      await firebase
        .auth()
        .createUserWithEmailAndPassword(field.email, field.password)
        .catch(error => {
          throw new Error(error);
        });
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
    <>
      <StatusBar backgroundColor={theme.colors.secondary} />
      <ScrollView contentContainerStyle={styles.scrollViewContentContainer}>
        <View style={styles.container}>
          <View style={styles.headerWrapper(theme.colors.secondary)}>
            <Text style={styles.title}>Welcome,</Text>
            <Text style={styles.subtitle}>Sign up to use our app!</Text>
          </View>
          <View style={styles.bodyContainer}>
            <TextInput
              label="Name"
              value={field.name}
              onChangeText={handleChangeTextInput('name')}
              style={styles.textInput}
            />
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
                color={theme.colors.secondary}
                onPress={handlePressSignUp}
                loading={loading}>
                Sign Up
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
    </>
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

export default withTheme(SignUp);
