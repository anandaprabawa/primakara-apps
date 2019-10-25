import React from 'react';
import {View, StyleSheet, ScrollView, StatusBar} from 'react-native';
import {TextInput, Text, withTheme, Button} from 'react-native-paper';

const SignUp = ({theme}) => {
  const [field, setField] = React.useState({name: '', email: '', password: ''});

  const handleChangeTextInput = fieldName => text => {
    setField({...field, [fieldName]: text});
  };

  return (
    <>
      <StatusBar backgroundColor={theme.colors.secondary} />
      <ScrollView contentContainerStyle={styles.container}>
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
              color={theme.colors.secondary}>
              Sign Up
            </Button>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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
