import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import SplashScreen from '../screens/SplashScreen';
import AuthScreen from '../screens/Auth';
import SignInScreen from '../screens/SignIn';
import SignUpScreen from '../screens/SignUp';
import HomeScreen from '../screens/Home';

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

const MainNavigation = createStackNavigator({
  Home: HomeScreen,
});

const AppNavigation = createSwitchNavigator({
  Splash: SplashScreen,
  MainAuth: MainAuthNavigation,
  Main: MainNavigation,
});

export default createAppContainer(AppNavigation);
