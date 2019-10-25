import React from 'react';
import {StatusBar} from 'react-native';
import {Provider as PaperProvider, DefaultTheme} from 'react-native-paper';
import Navigation from './navigation';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#1976d2',
  },
};

const App = () => {
  return (
    <PaperProvider theme={theme}>
      <StatusBar backgroundColor={theme.colors.primary} />
      <Navigation />
    </PaperProvider>
  );
};

export default App;
