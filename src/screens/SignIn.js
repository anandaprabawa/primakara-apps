import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {TextInput, Text, withTheme, Button} from 'react-native-paper';

const SignIn = ({theme}) => {
  const [field, setField] = React.useState({email: '', password: ''});

  const handleChangeTextInput = fieldName => text => {
    setField({...field, [fieldName]: text});
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
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
          onChangeText={handleChangeTextInput('password')}
          style={styles.textInput}
        />
        <Button
          mode="contained"
          contentStyle={styles.contentButton}
          style={styles.button}>
          Sign In
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  contentButton: {
    height: 48,
  },
  button: {
    marginTop: 'auto',
  },
});

export default withTheme(SignIn);
