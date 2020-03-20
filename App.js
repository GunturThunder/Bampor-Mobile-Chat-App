import React,{ Component } from 'react';
import 'react-native-gesture-handler';
import { View,Text } from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import HomeScreen from './src/component/screen/Home/Home';
import LoginScreen from './src/component/screen/User/Login';
import RegisterScreen from './src/component/screen/User/Register';

const homeNavigator = createStackNavigator({
  Login: {
    screen: LoginScreen,
    navigationOptions: {
      header: false,
    }
  },
  Register: {
    screen: RegisterScreen,
    navigationOptions: {
      header: false,
    }
  },
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      header: false,
    }
  }
})
const AppNavigator = createSwitchNavigator({
  Home: homeNavigator,
});

const AppContainer = createAppContainer(AppNavigator);

class App extends Component{
  render(){
    return(
      <AppContainer />
    )
  }
}

export default App;