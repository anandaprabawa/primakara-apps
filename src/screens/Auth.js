import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import primakaraLogo from '../assets/primakara-logo.png';

const Auth = () => {
  return (
    <View>
      <Image source={primakaraLogo} resizeMode="contain" style={styles.logo} />
    </View>
  );
};

const styles = StyleSheet.create({
  logo: {
    width: 250,
  },
});

export default Auth;
