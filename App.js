import React from 'react';
import {Provider as PaperProvider, DefaultTheme} from 'react-native-paper';
import {Text} from 'react-native';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
  },
};

const App = () => {
  return (
    <PaperProvider theme={theme}>
      <Text>Hello</Text>
    </PaperProvider>
  );
};

export default App;
