/* eslint-disable no-unused-vars */
import React from 'react';
import {SafeAreaView, StyleSheet, Image} from 'react-native';
import {_handleAuthUser} from '../api/auth';
import * as RootNavigation from '../navigation/RootNavigation';
import SplashScreen from 'react-native-splash-screen';
export default class AppLoadingMain extends React.Component {
  state = {isLoadingComplete: false};

  componentDidMount() {
    this.timeoutHandle = setTimeout(() => {
      SplashScreen.hide();
    }, 1000);
    this.timeoutHandle = setTimeout(() => {
      // Add your logic for the transition
      _handleAuthUser()
        .then(responce => {
          // navigate('App')
          console.log("its Response", responce)
        })
        .catch(error => {
          RootNavigation.replace('Auth');
          console.log("Hey its")
        }); // what to push here?
    }, 1000);
  }

  componentWillUnmount() {
    clearTimeout(this.timeoutHandle);
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Image
          resizeMode="contain"
          source={require('../../src/assets/blueLogo.png')}
          style={{width: '70%', height: '100%', alignSelf: 'center'}}
        />
      </SafeAreaView>
      // <SafeAreaView style={styles.container}>
      //   {/* <ActivityIndicator size="large" color="#365899" /> */}
      // </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});
