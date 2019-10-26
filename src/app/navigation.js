import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import theme from './theme';

import SplashScreen from '../screens/SplashScreen';
import AuthScreen from '../screens/Auth';
import SignInScreen from '../screens/SignIn';
import SignUpScreen from '../screens/SignUp';
import HomeScreen from '../screens/Home';
import AddNoteScreen from '../screens/AddNote';
import DetailedNoteScreen from '../screens/DetailedNote';
import EditNoteScreen from '../screens/EditNote';

const MainAuthNavigation = createStackNavigator(
  {
    Auth: AuthScreen,
    SignIn: SignInScreen,
    SignUp: SignUpScreen,
  },
  {
    headerMode: 'none',
  },
);

const MainNavigation = createStackNavigator(
  {
    Home: HomeScreen,
    AddNote: AddNoteScreen,
    DetailedNote: DetailedNoteScreen,
    EditNote: EditNoteScreen,
  },
  {
    defaultNavigationOptions: {
      headerTintColor: '#ffffff',
      headerStyle: {
        backgroundColor: theme.colors.primary,
      },
    },
  },
);

const AppNavigation = createSwitchNavigator({
  Splash: SplashScreen,
  MainAuth: MainAuthNavigation,
  Main: MainNavigation,
});

export default createAppContainer(AppNavigation);
