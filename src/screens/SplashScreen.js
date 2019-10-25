import React from 'react';
import {View, Image, StyleSheet, StatusBar} from 'react-native';
import primakaraLogo from '../assets/primakara-logo.png';

const SplashScreen = () => {
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
