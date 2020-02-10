import React from 'react';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    position: 'absolute',

    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 2,
    height: 60,
  },

  loginContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: '#3fc5f0',
  },

  loginLogo: {
    marginBottom: 0,
    // backgroundColor: 'red',
    flex: 1,
    height: '45%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  loginForm: {
    // backgroundColor: 'blue',
    height: '55%',
    width: '100%',
    alignItems: 'center',
    // paddingTop: 22
    // justifyContent: 'center',
  },

  loginButtonLogin: {
    backgroundColor: '#2e279d',
    // paddingHorizontal: 55,
    width: 222,

    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 22,
  },

  loginButtonRegister: {
    // backgroundColor: '#2e279d',
    // paddingHorizontal: 45,
    width: 222,
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 10,
    borderColor: '#2e279d',
    borderWidth: 2,
    marginTop: 22,
  },

  loginInput: {
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

  login2Input: {
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

  chatScreenInput: {
    width: '80%',
    borderWidth: 1,
    borderRadius: 10,
    marginRight: 5,
    // backgroundColor: 'white',
    // alignContent: 'center',
    // alignItems: 'center',
    justifyContent: 'center',
  },

  chatScreenButton: {
    // borderWidth: 1,
    width: '20%',
    height: '80%',
    borderRadius: 10,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2e279d',
  },

  profileLogoutButton: {
    alignSelf: 'center',
    // height: 111,
    marginTop: 33,
    width: '80%',
    backgroundColor: '#fe346e',
    alignItems: 'center',
    borderRadius: 10,
    paddingVertical: 5,
  },

  profileChangeNameButton: {
    alignSelf: 'center',
    // height: 111,
    marginTop: 33,
    width: '80%',
    backgroundColor: '#32407b',
    alignItems: 'center',
    borderRadius: 10,
    paddingVertical: 5,
  },

  profileInputName: {
    borderWidth: 0.2,
    height: 40,
    borderRadius: 10,
    marginHorizontal: 20,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },

  profileInfo: {
    height: 111,
    width: '90%',
    alignSelf: 'center',
    borderWidth: 0.5,
    borderColor: 'gray',
    borderRadius: 10,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: -33,
  },

  profileImage: {
    borderRadius: 100,
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderWidth: 2,
    borderColor: 'white',
  },

  homeScreenImageItem: {
    width: 44,
    height: 44,
    resizeMode: 'cover',
    borderRadius: 32,
    marginRight: 12,
    borderWidth: 2,
    borderColor: 'skyblue',
  },
});

export default styles;
