import React from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {withTheme, IconButton, FAB, List} from 'react-native-paper';
import firebase from 'react-native-firebase';

const Home = ({navigation}) => {
  /* Notes state */
  const [data, setData] = React.useState([]);

  /* Get data from firebase firestore */
  React.useEffect(() => {
    firebase
      .firestore()
      .collection('notes')
      .onSnapshot(snapshot => {
        const docs = [];
        snapshot.docs.forEach(doc => {
          docs.push({...doc.data(), id: doc.id});
        });
        setData(docs);
      });
  }, []);

  /* Function to logging out user */
  const handlePressSignOut = async () => {
    await firebase.auth().signOut();
    navigation.navigate('Auth');
  };

  /* Send `handlePressSignOut` function through navigation params to use in Home.navigationOptions below */
  React.useEffect(() => {
    navigation.setParams({handlePressSignOut});
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handlePressAddNoteButton = () => {
    navigation.navigate('AddNote');
  };

  const handleNavigateToDetailedNote = item => () => {
    navigation.navigate('DetailedNote', {note: item});
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <List.Item
            title={item.title}
            description={item.body}
            left={props => <List.Icon {...props} icon="note" />}
            onPress={handleNavigateToDetailedNote(item)}
          />
        )}
      />
      <FAB style={styles.fab} icon="plus" onPress={handlePressAddNoteButton} />
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
