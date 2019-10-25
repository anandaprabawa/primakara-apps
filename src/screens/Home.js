import React from 'react';
import {ScrollView} from 'react-native';
import {Text, withTheme, Button} from 'react-native-paper';
import firebase from 'react-native-firebase';

const Home = ({navigation}) => {
  /* Function to logging out user */
  const handlePressSignOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        navigation.navigate('Auth');
      });
  };

  return (
    <ScrollView>
      <Text>Hello World</Text>
      <Button onPress={handlePressSignOut}>Sign Out</Button>
    </ScrollView>
  );
};

Home.navigationOptions = {
  title: 'Home',
};

export default withTheme(Home);
