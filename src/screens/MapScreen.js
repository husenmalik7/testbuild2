import React from 'react';
import {View, Text, Image} from 'react-native';
import MapView from 'react-native-maps';
import Marker from 'react-native-maps';
// import Modal, {ModalContent } from 'react-native-modals'


import Geolocation from '@react-native-community/geolocation';
import firebase from 'firebase';

export default class App extends React.Component {
  state = {
    // image, name, bio, gender, email

    latitude: 37.78825,
    longitude: -122.4324,
    data: [],
    dbRef: firebase.database().ref('users'),
  };

  componentDidMount() {
    // function
    Geolocation.getCurrentPosition(info => {
      console.log(info.coords.longitude);
      console.log(info.coords.latitude);
      this.setState({
        longitude: info.coords.longitude,
        latitude: info.coords.latitude,
      });
    });

    this.state.dbRef.on('child_added', val => {
      console.log(val.val());
      let temp = val.val();

      this.setState(prevState => {
        return {
          data: [...prevState.data, temp],
        };
      });
    });
  }

  render() {
    return (
    

      <MapView
        style={{flex: 1}}
        initialRegion={{
          latitude: this.state.latitude,
          longitude: this.state.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        {console.log('hehehe', this.state.data)}

        {this.state.data.map((item, index) => (
          <MapView.Marker
            coordinate={{
              latitude:
                item.latitude == undefined
                  ? this.state.latitude
                  : item.latitude,
              longitude:
                item.longitude == undefined
                  ? this.state.longitude
                  : item.longitude,
            }}
            title={item.name}
            description={item.bio == undefined ? "bio" : item.bio}
            // onPress={() => this.toggleModal}
          >
            <Image
              source={
                item.image ? {uri: item.image} : require('../assets/001.png')
              }
              style={{
                height: 35,
                width: 35,
                borderRadius: 35,
                // borderWidth: 2,
                // borderColor: 'royalblue',
              }}
            />
          </MapView.Marker>
        ))}
      </MapView>
      
    );
  }
}
