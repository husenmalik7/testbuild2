import React from 'react';
import {Image, NavigatorIOS} from 'react-native';
console.disableYellowBox = true;

import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';

import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import AuthLoadingScreen from './src/screens/AuthLoadingScreen';
import ChatScreen from './src/screens/ChatScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import MapScreen from './src/screens/MapScreen'
import RegisterScreen from './src/screens/RegisterScreen';

const AppStack = createStackNavigator({
  Home: HomeScreen,
  Chat: ChatScreen,
  Map: MapScreen,
  Register : RegisterScreen
});

AppStack.navigationOptions = ({navigation}) => {
  let tabBarVisible = navigation.state.index === 0;

  return { 
    tabBarVisible
  }
}



const AuthStack = createStackNavigator({Login: LoginScreen});

const TabNavigator = createBottomTabNavigator(
  {
    Chat: AppStack,
    Profile: ProfileScreen,
    Map: MapScreen
  },
  {
    defaultNavigationOptions: ({navigation}) => ({
      tabBarIcon: ({focused, horizontal, tintColor}) => {
        const {routeName} = navigation.state;
        let imageName = require('./src/assets/chat.png');
        if (routeName === 'Profile') {
          imageName = require('./src/assets/gear.png');
        }
        if (routeName === 'Map') {
          imageName = require('./src/assets/pin.png');
        }

        return (
          <Image
            source={imageName}
            style={{
              width: 25,
              resizeMode: 'contain',
              tintColor,
            }}
          />
        );
      },
    }),
    tabBarOptions: {
      activeTintColor: 'white',
      inactiveTintColor: 'gray',
      style: {
        backgroundColor: 'skyblue',
      }
    },
  },
);

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: TabNavigator,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'AuthLoading',
    },
  ),
);




// import React from 'react';
// import {View, Text} from 'react-native';
// import MapView from 'react-native-maps';

// export default class App extends React.Component {
//   render() {
//     return (
//       <MapView
//         style={{flex: 1}}
//         initialRegion={{
//           latitude: 37.78825,
//           longitude: -122.4324,
//           latitudeDelta: 0.0922,
//           longitudeDelta: 0.0421,
//         }}
//       />
//     );
//   }
// }