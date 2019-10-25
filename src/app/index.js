import React from 'react';
import {Provider as PaperProvider, DefaultTheme} from 'react-native-paper';
import Navigation from './navigation';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
  },
};

const App = () => {
  return (
    <PaperProvider theme={theme}>
      <Navigation />
    </PaperProvider>
  );
};

export default App;
