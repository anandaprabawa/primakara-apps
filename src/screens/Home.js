import React from 'react';
import {ScrollView} from 'react-native';
import {Text, withTheme} from 'react-native-paper';

const Home = () => {
  return (
    <ScrollView>
      <Text>Hello World</Text>
    </ScrollView>
  );
};

Home.navigationOptions = {
  title: 'Home',
};

export default withTheme(Home);
