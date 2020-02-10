import React from 'react';
import {
  View,
  SafeAreaView,
  Text,
  Image,
  TextInput,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import User from '../../User';
import firebase from 'firebase';
import styles from './style';

export default class ProfileScreen extends React.Component {
  static navigationOptions = {
    title: 'Profile',
  };

  state = {
    name: User.name,
    // imageSource: require('../assets/001.png'),
    imageSource: User.image ? {uri: User.image} : require('../assets/001.png'),
    upload: false,
  };

  handleChange = key => val => {
    this.setState({[key]: val});
  };

  changeName = async () => {
    if (this.state.name.length < 3) {
      Alert.alert('error', 'name must more than 3 character');
    } else if (User.name !== this.state.name) {
      User.name = this.state.name;
      this.updateUser();
      // Alert.alert('success', 'change name');
    }
  };

  componentDidMount(){
    this.setState({
      name: User.name
    })
    
  }

  changeImage = () => {
    const options = {
      quality: 0.7,
      allowsEditing: true,
      mediaType: 'photo',
      noData: true,
      storageOptions: {
        skipBackup: true,
        waitUntilSaved: true,
        path: 'images',
        cameraRoll: true,
      },
    };

    ImagePicker.showImagePicker(options, response => {
      if (response.error) {
        console.log(error);
      } else if (!response.didCancel) {
        this.setState(
          {
            upload: true,
            imageSource: {uri: response.uri},
          },

          this.uploadFile,
        );
      }
    });
  };

  updateUser = () => {
    firebase
      .database()
      .ref('users')
      .child(User.phone)
      .set(User);
    Alert.alert('Success', 'change profile');
  };

  updateUserImage = imageUrl => {
    User.image = imageUrl;

    this.updateUser();

    this.setState({
      upload: false,
      imageSource: {uri: imageUrl},
    });
  };

  uploadFile = async () => {
    const file = await this.uriToBlob(this.state.imageSource.uri);
    console.log('apa nich');
    console.log(file);

    firebase
      .storage()
      .ref(`profile_pictures/${User.phone}.png`)
      .put(file)

      .then(snapshot => {
        return snapshot.ref.getDownloadURL();
      })

      .then(downloadURL => {
        console.log(`success upload file go to this  link ${downloadURL}`);
        this.updateUserImage(downloadURL);
      })

      .catch(error => {
        this.setState({
          upload: false,
          imageSource: require('../assets/001.png'),
        });

        Alert.alert('Errorthiss', 'Error on upload image');
      });
  };

  uriToBlob = uri => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function() {
        resolve(xhr.response);
      };

      xhr.onerror = function() {
        reject(new Error('Error while upload image'));
      };

      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      xhr.send(null);
    });
  };

  _logOut = async () => {
    await AsyncStorage.clear();
    console.log('loougout');
    this.props.navigation.navigate('Auth');
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <View
          style={{
            backgroundColor: '#46b3e6',
          }}>
          <View
            style={{
              // backgroundColor: 'red',
              alignItems: 'center',
              marginTop: 33,
              marginBottom: 111,
            }}>
            <TouchableOpacity onPress={this.changeImage}>
              <Image
                style={styles.profileImage}
                source={this.state.imageSource}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.profileInfo}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 28,
                color: '#4d80e4',
                marginBottom: 22,
              }}>
              {User.name}
            </Text>
            <Text
              style={{
                fontSize: 18,
                color: '#4d80e4',
              }}>
              {User.phone}
            </Text>
          </View>
        </View>
        <View
          style={{
            // backgroundColor: 'red',
            marginTop: 55,
          }}>
          <View style={styles.profileInputName}>
            <TextInput
              value={this.state.name}
              onChangeText={this.handleChange('name')}
            />
          </View>

          <TouchableOpacity onPress={this.changeName}>
            <View style={styles.profileChangeNameButton}>
              <Text style={{fontSize: 22, color: 'white'}}>Change name</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={this._logOut}>
            <View style={styles.profileLogoutButton}>
              <Text style={{fontSize: 22, color: 'white'}}>Logout</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
