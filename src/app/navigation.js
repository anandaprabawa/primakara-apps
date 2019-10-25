import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import HomeScreen from '../screens/Home';

const MainScreen = createStackNavigator({
  Home: HomeScreen,
});

const Navigation = createSwitchNavigator({
  Main: MainScreen,
});

export default createAppContainer(Navigation);
