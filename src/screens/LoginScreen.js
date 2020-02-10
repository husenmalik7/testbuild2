import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  Text,
  TextInput,
  AsyncStorage,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import firebase from 'firebase';
import User from '../../User';
import styles from './style';

console.disableYellowBox = true;


export default class LoginScreen extends React.Component {
  static navigationOptions = {
    headerShown: false,
  };

  state = {
    phone: '',
    name: '',
    latitude: '',
    longitude: '',
  };

  componentDidMount() {
    Geolocation.getCurrentPosition(info => {
      console.log(info.coords.longitude, 'did mount login');
      console.log(info.coords.latitude, 'did mount loginsss');
      this.setState({
        latitude: info.coords.latitude,
        longitude: info.coords.longitude,
      });
    });
  }

  handleChange = key => val => {
    this.setState({[key]: val});
  };

  handleRegister = async () => {
    this.props.navigation.navigate('Register');
  };

  submitForm = async () => {
    User.latitude = this.state.latitude;
    User.longitude = this.state.longitude;

    await AsyncStorage.setItem('userPhone', this.state.phone);
    await AsyncStorage.setItem('userName', this.state.name);
    User.phone = this.state.phone;
    User.name = this.state.name;

    firebase
      .database()
      .ref('users')
      .child(User.phone)
      .set(User);

    this.props.navigation.navigate('App');
  };

  render() {
    return (
      <View style={styles.loginContainer}>
        <View style={styles.loginLogo}>
          <Image
            style={{resizeMode: 'stretch', width: '100%', height: '80%'}}
            source={require('../assets/logo2.png')}
          />
        </View>
        <View style={styles.loginForm}>
          <TextInput
            placeholder="Phone"
            keyboardType="number-pad" //optional
            style={styles.login2Input}
            value={this.state.phone}
            onChangeText={this.handleChange('phone')}
          />
          <TextInput
            placeholder="Name"
            style={styles.loginInput}
            value={this.state.name}
            onChangeText={this.handleChange('name')}
          />
          <TouchableOpacity onPress={this.submitForm}>
            <View style={styles.loginButtonLogin}>
              <Text style={{color: 'white'}}>Enter</Text>
            </View>
          </TouchableOpacity>

          {/* <TouchableOpacity onPress={this.handleRegister}>
            <View style={styles.loginButtonRegister}>
              <Text style={{color: 'white'}}>Register</Text>
            </View>
          </TouchableOpacity> */}
        </View>
      </View>
    );
  }
}
