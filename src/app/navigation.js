import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import SplashScreen from '../screens/SplashScreen';
import HomeScreen from '../screens/Home';

const MainScreen = createStackNavigator({
  Home: HomeScreen,
});

const Navigation = createSwitchNavigator({
  Splash: SplashScreen,
  Main: MainScreen,
});

export default createAppContainer(Navigation);
