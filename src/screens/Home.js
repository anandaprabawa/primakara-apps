import React from 'react';
import {ScrollView, View, StyleSheet} from 'react-native';
import {withTheme, IconButton, FAB, List} from 'react-native-paper';
import firebase from 'react-native-firebase';

const Home = ({navigation}) => {
  /* Function to logging out user */
  const handlePressSignOut = async () => {
    await firebase.auth().signOut();
    navigation.navigate('Auth');
  };

  /* Send `handlePressSignOut` function through navigation params to use in Home.navigationOptions below */
  React.useEffect(() => {
    navigation.setParams({handlePressSignOut});
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <View style={styles.container}>
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => console.log('Pressed')}
      />
      <ScrollView>
        <List.Item
          title="First title"
          description="lorem ipsum dolor sit amet"
          left={props => <List.Icon {...props} icon="note" />}
        />
        <List.Item
          title="First title"
          description="lorem ipsum dolor sit amet"
          left={props => <List.Icon {...props} icon="note" />}
        />
      </ScrollView>
    </View>
  );
};

Home.navigationOptions = ({navigation}) => ({
  title: 'Primakara Notes',
  headerRight: () => (
    <IconButton
      icon="logout"
      color="#fff"
      size={20}
      onPress={navigation.getParam('handlePressSignOut')}
    />
  ),
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  buttonListOptionWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default withTheme(Home);
