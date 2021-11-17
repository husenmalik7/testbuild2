import React from 'react';
import {
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  Text,
  TextInput,
  Animated,
  Dimensions,
  Platform,
  Keyboard,
  FlatList,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';
import User from '../../User';
import firebase from 'firebase';

import styles from './style';

const isAndroid = Platform.OS === 'android';

//bottom navigation, change color to white

export default class ChatScreen extends React.Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: navigation.getParam('name', null),
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      person: {
        name: props.navigation.getParam('name'),
        phone: props.navigation.getParam('phone'),
      },

      textMessage: '',
      messageList: [],
      dbRef: firebase.database().ref('messages'),
    };

    this.keyboardHeight = new Animated.Value(0);
    this.bottomPadding = new Animated.Value(60);
  }

  componentDidMount() {
    this.keyboardShowListener = Keyboard.addListener(
      isAndroid ? 'keyboardWillShow' : 'keyboardDidShow',
      (e) => this.keyboardEvent(e, true),
    );

    this.keyboardShowListener = Keyboard.addListener(
      isAndroid ? 'keyboardWillHide' : 'keyboardDidHide',
      (e) => this.keyboardEvent(e, false),
    );

    this.state.dbRef
      .child(User.phone)
      .child(this.state.person.phone)
      .on('child_added', (value) => {
        this.setState((prevState) => {
          return {
            messageList: [...prevState.messageList, value.val()],
          };
        });
      });
  }

  componentWillUnmount() {
    this.state.dbRef.off();
    // this.keyboardShowListener.remove()
    // this.keyboardHideListener.remove()
  }

  keyboardEvent = (event, isShow) => {
    Animated.parallel([
      Animated.timing(this.keyboardHeight, {
        duration: event.duration,
        toValue: isShow ? 60 : 0,
      }),
      Animated.timing(this.bottomPadding, {
        duration: event.duration,
        toValue: isShow ? 120 : 60,
      }),
    ]).start();
  };

  handleChange = (key) => (val) => {
    this.setState({[key]: val});
  };

  convertTime = (time) => {
    let d = new Date(time);
    let c = new Date();
    let result = (d.getHours() < 10 ? '0' : '') + d.getHours() + ':';
    result += (d.getMinutes() < 10 ? '0' : '') + d.getMinutes();

    if (c.getDay() !== d.getDay()) {
      result = d.getDay() + ' ' + d.getMonth() + ' ' + result;
    }
    return result;
  };

  sendMessage = async () => {
    if (this.state.textMessage.length > 0) {
      let msgId = (
        await this.state.dbRef
          .child(User.phone)
          .child(this.state.person.phone)
          .push()
      ).key;
      let updates = {};
      let message = {
        message: this.state.textMessage,
        time: firebase.database.ServerValue.TIMESTAMP,
        from: User.phone,
      };
      updates[User.phone + '/' + this.state.person.phone + '/' + msgId] =
        message;
      updates[this.state.person.phone + '/' + User.phone + '/' + msgId] =
        message;

      this.state.dbRef.update(updates);
      this.setState({textMessage: ''});
    }
  };

  renderRow = ({item}) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          maxWidth: '60%',
          alignSelf: item.from === User.phone ? 'flex-end' : 'flex-start',
          backgroundColor: item.from === User.phone ? '#46b3e6' : '#4d80e4',
          borderRadius: 5,
          marginBottom: 10,
        }}>
        <Text style={{color: '#fff', padding: 7, fontSize: 16}}>
          {item.message}
        </Text>

        <Text
          style={{
            color: '#eee',
            padding: 3,
            fontSize: 12,
          }}>
          {this.convertTime(item.time)}
          {/* {item.time} */}
        </Text>
      </View>
    );
  };

  render() {
    let {height} = Dimensions.get('window');
    return (
      <View style={{flex: 1}}>
        <View style={{height: '90%'}}>
          <FlatList
            style={{padding: 10, height: height * 0.8}}
            data={this.state.messageList}
            renderItem={this.renderRow}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>

        <View
          style={{
            height: '10%',
            flexDirection: 'row',
            marginHorizontal: 10,
            paddingBottom: 10,
            // backgroundColor: 'red'
          }}>
          <Animated.View
            style={[styles.bottomBar, {bottom: this.keyboardHeight}]}>
            <View style={styles.chatScreenInput}>
              <TextInput
                value={this.state.textMessage}
                placeholder="tulis pesan"
                onChangeText={this.handleChange('textMessage')}
              />
            </View>

            <View style={styles.chatScreenButton}>
              <TouchableOpacity onPress={this.sendMessage}>
                <Text
                  style={{
                    color: 'white',
                  }}>
                  Send
                </Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      </View>
    );
  }
}

{
  /* <KeyboardAvoidingView behavior="height" style={{flex: 1}}></KeyboardAvoidingView> */
}
