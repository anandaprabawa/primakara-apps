import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import SplashScreen from '../screens/SplashScreen';
import AuthScreen from '../screens/Auth';
import HomeScreen from '../screens/Home';

const MainAuthNavigation = createStackNavigator({
  Auth: AuthScreen,
});

const MainNavigation = createStackNavigator({
  Home: HomeScreen,
});

const AppNavigation = createSwitchNavigator({
  Splash: SplashScreen,
  MainAuth: MainAuthNavigation,
  Main: MainNavigation,
});

export default createAppContainer(AppNavigation);
