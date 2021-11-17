import React from 'react';

import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import User from '../../User';
import firebase from 'firebase';

export default class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  componentWillMount() {
    // Your web app's Firebase configuration
    var firebaseConfig = {
      apiKey: 'AIzaSyBJIgZ-U2ej-tcSIqsIVsO_6yvGbMMVOFs',
      authDomain: 'lonchat-64298.firebaseapp.com',
      databaseURL: 'https://lonchat-64298.firebaseio.com',
      projectId: 'lonchat-64298',
      storageBucket: 'lonchat-64298.appspot.com',
      messagingSenderId: '1066369305145',
      appId: '1:1066369305145:web:d4174262ad8bcfda425be8',
      measurementId: 'G-ETFEVR636G',
    };
    // Initialize Firebase
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
  }

  _bootstrapAsync = async () => {
    User.phone = await AsyncStorage.getItem('userPhone');

    //404
    this.props.navigation.navigate(User.phone ? 'App' : 'Auth');
  };

  render() {
    return (
      <View>
        <ActivityIndicator />
        {/* 404 */}
        <StatusBar barStyle="default" />
      </View>
    );
  }
}
