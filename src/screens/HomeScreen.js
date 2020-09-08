import React from 'react';
import {
  SafeAreaView,
  View,
  Image,
  Text,
  Dimensions,
  TouchableOpacity,
  FlatList,
  AsyncStorage,
} from 'react-native';
import firebase from 'firebase';
import User from '../../User';
import Geolocation from '@react-native-community/geolocation';
import styles from './style';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    users: [],
    dbRef: firebase.database().ref('users'),
    // latitude: null
  };

  componentDidMount() {
    this.state.dbRef.on('child_added', val => {
      let person = val.val();
      person.phone = val.key;

      if (person.phone === User.phone) {
        User.name = person.name;
        User.image = person.image ? person.image : null;
      } else {
        this.setState(prevState => {
          return {
            users: [...prevState.users, person],
          };
        });
      }
    });
  }

  _logOut = async () => {
    await AsyncStorage.clear();
    console.log('logoutkeun atuh');
    this.props.navigation.navigate('Auth');
  };

  renderRow = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => this.props.navigation.navigate('Chat', item)}
        style={{
          flexDirection: 'row',
          padding: 10,
          borderBottomColor: '#ccc',
          borderBottomWidth: 1,
          alignItems: 'center',
        }}>
        <Image
          source={item.image ? {uri: item.image} : require('../assets/001.png')}
          style={styles.homeScreenImageItem}
        />
        <View style={{flexDirection: 'column'}}>
          <Text style={{fontWeight: 'bold'}}>{item.name}</Text>
          <Text style={{color: 'gray'}}>{item.phone}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    const {height} = Dimensions.get('window');

    return (
      <SafeAreaView>
        <FlatList
          style={{height}} //if there is no style the object outside flatlist will be hidden
          data={this.state.users}
          renderItem={this.renderRow}
          keyExtractor={item => item.phone}
          ListHeaderComponent={() => (
            <View
              style={{
                borderBottomWidth: 2,
                borderBottomColor: '#0f4c75',
                backgroundColor: '#3282b8',
              }}>
              <Text
                style={{
                  fontSize: 30,
                  marginVertical: 10,
                  marginLeft: 10,
                  fontWeight: 'bold',
                  color: 'white',
                }}>
                {/* Chat */}
              </Text>
            </View>
          )}
        />

        

        <TouchableOpacity onPress={this._logOut}>
          <View style={{width: 111, height: 111, backgroundColor: 'red'}} />
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}
