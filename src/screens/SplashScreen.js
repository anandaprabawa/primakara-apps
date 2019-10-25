import React from 'react';
import {View, Image, StyleSheet, StatusBar} from 'react-native';
import primakaraLogo from '../assets/primakara-logo.png';
import firebase from 'react-native-firebase';

const SplashScreen = ({navigation}) => {
  React.useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      /* Waiting 1.5 seconds then go to Auth screen */
      setTimeout(() => {
        if (user) {
          navigation.navigate('Home');
        } else {
          navigation.navigate('Auth');
        }
      }, 1500);
    });
  });

  return (
    <>
      <StatusBar hidden />
      <View style={styles.container}>
        <Image
          source={primakaraLogo}
          resizeMode="contain"
          style={styles.logo}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 250,
  },
});

export default SplashScreen;
