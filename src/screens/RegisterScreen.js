import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  TextInput,
  AsyncStorage,
  Alert,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import firebase from 'firebase';
import User from '../../User';
// import { Toast } from 'native-base';

console.disableYellowBox = true;

// import {createAppContainer} from 'react-navigation';
// import {createStackNavigator} from 'react-navigation-stack';

export default class RegisterScreen extends React.Component {
  static navigationOptions = {
    headerShown: false,
  };

  state = {
    phone: '',
    name: '',
    bio: '',
    password: '',
    latitude: '',
    longitude: '',
    data: [],
    dbRef: firebase.database().ref('users'),
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

    this.state.dbRef.on('child_added', val => {
      // console.log(val.val());
      let temp = val.val();

      this.setState(prevState => {
        return {
          data: [...prevState.data, temp],
        };
      });
    });
  }

  handleChange = key => val => {
    this.setState({[key]: val});
  };

  handleLogin = async () => {
    this.props.navigation.navigate('Login');
  };

  submitForm = async () => {
    // alert(this.state.phone + '\n' + this.state.name);
    //you want regex here before setItem

    User.latitude = this.state.latitude;
    User.longitude = this.state.longitude;
    // User.name = this.state.name; //jika login, jika register pake ini

    await AsyncStorage.setItem('userPhone', this.state.phone);
    await AsyncStorage.setItem('userName', this.state.name);
    User.phone = this.state.phone;
    console.log(this.state.data)
    

    
    console.log(this.state.phone);
    console.log(this.state.name)
    

    let i = 0;
    let check = 1;
    let point = 0;
    while (i < this.state.data.length) {
      check = this.state.phone
        .toLowerCase()
        .localeCompare(this.state.data[i].phone);

        console.log(this.state.data[i].phone)
      if (check == 0) {
        point = point + 1;
      }

      i = i + 1;
    }

    console.log(point, 'yourpoint')

    if (point == 0) {
      firebase
      .database()
      .ref('users')
      .child(User.phone)
      .set(User);

    this.props.navigation.navigate('Login');


    } else {
      Alert.alert('email already taken')
    }

    
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          alignContent: 'center',
          backgroundColor: '#3fc5f0',
        }}>
        <View style={{marginBottom: 88}}>
          <Text style={{fontSize: 22, color: 'white'}}>REGISTER</Text>
        </View>

        <TextInput
          placeholder="Email"
          // keyboardType="number-pad" //optional
          style={styles.input2}
          value={this.state.phone}
          onChangeText={this.handleChange('phone')}
        />
        <TextInput
          placeholder="Name"
          style={styles.input}
          value={this.state.name}
          onChangeText={this.handleChange('name')}
        />

        <TextInput
          placeholder="Bio"
          style={styles.input}
          value={this.state.bio}
          onChangeText={this.handleChange('bio')}
        />

        <TextInput
          placeholder="Password"
          style={styles.input}
          value={this.state.password}
          onChangeText={this.handleChange('password')}
        />

        <TouchableOpacity onPress={this.submitForm}>
          <View
            style={{
              backgroundColor: '#2e279d',
              // paddingHorizontal: 55,
              width: 222,

              alignItems: 'center',
              paddingVertical: 10,
              borderRadius: 10,
              marginTop: 22,
            }}>
            <Text style={{color: 'white'}}>Register</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={this.handleLogin}>
          <View
            style={{
              // backgroundColor: '#2e279d',
              // paddingHorizontal: 45,
              width: 222,
              alignItems: 'center',
              paddingVertical: 10,
              borderRadius: 10,
              borderColor: '#2e279d',
              borderWidth: 2,
              marginTop: 22,
            }}>
            <Text style={{color: 'white'}}>Login</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5fcff',
  },

  input: {
    textAlign: 'center',
    padding: 10,
    // borderWidth: 1,
    // borderColor: '#ccc',
    color: 'black',
    backgroundColor: '#dff6f0',
    width: '90%',
    marginBottom: 5,
    borderRadius: 5,
  },
  input2: {
    textAlign: 'center',
    padding: 10,
    // borderWidth: 1,
    // borderColor: '#ccc',
    color: 'black',
    backgroundColor: '#dff6f0',
    width: '90%',
    marginBottom: 5,
    // marginTop: 88,
    borderRadius: 5,
  },
});
