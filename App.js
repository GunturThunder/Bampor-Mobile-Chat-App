import React,{ Component, useEffect } from 'react';
import 'react-native-gesture-handler';
import { View,Text } from 'react-native';
import SplashScreen from 'react-native-splash-screen'
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
// import HomeScreen from './src/component/screen/Test/Home'
import HomeScreen from './src/component/screen/Home/Home';
import LoginScreen from './src/component/screen/User/Login';
import RegisterScreen from './src/component/screen/User/Register';
import InboxScreen from './src/component/screen/Home/Inbox';
import LocationScreen from './src/component/screen/Location/Location';
import ProfilesScreen from './src/component/screen/User/Profiles';

const homeNavigator = createStackNavigator({
  // Home : HomeScreen
  
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
  },
  Inbox: {
    screen: InboxScreen,
    navigationOptions: {
      header: false,
    }
  },
  Location:{
    screen: LocationScreen,
    navigationOptions:{
      header:false,
    }
  },
  Profiles: {
    screen: ProfilesScreen,
    navigationOptions: {
      header: false,
    }
  }
})
const AppNavigator = createSwitchNavigator({
  Home: homeNavigator,
});

const AppContainer = createAppContainer(AppNavigator);

function App() {
  useEffect(() => {
    SplashScreen.hide()
  }, []);
  console.disableYellowBox = true;
  return (
    <AppContainer />
  )
}

export default App;