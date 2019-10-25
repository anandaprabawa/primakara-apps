import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import primakaraLogo from '../assets/primakara-logo.png';
import {Button} from 'react-native-paper';

const Auth = ({navigation}) => {
  const handlePressSignButton = screen => () => {
    navigation.navigate(screen);
  };

  return (
    <View style={styles.container}>
      <Image source={primakaraLogo} resizeMode="contain" style={styles.logo} />
      <View style={styles.buttonWrapper}>
        <Button
          mode="contained"
          style={styles.button}
          onPress={handlePressSignButton('SignIn')}>
          Sign In
        </Button>
        <Button
          mode="outlined"
          style={styles.button}
          onPress={handlePressSignButton('SignUp')}>
          Sign Up
        </Button>
      </View>
    </View>
  );
};

Auth.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 24,
  },
  logo: {
    width: 200,
  },
  buttonWrapper: {
    width: '100%',
  },
  button: {
    width: '100%',
    height: 48,
    justifyContent: 'center',
    marginVertical: 6,
  },
});

export default Auth;
