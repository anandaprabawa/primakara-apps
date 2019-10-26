import React from 'react';
import {StatusBar} from 'react-native';
import {Provider as PaperProvider} from 'react-native-paper';
import theme from './theme';
import Navigation from './navigation';

const App = () => {
  return (
    <PaperProvider theme={theme}>
      <StatusBar backgroundColor={theme.colors.primary} />
      <Navigation />
    </PaperProvider>
  );
};

export default App;
