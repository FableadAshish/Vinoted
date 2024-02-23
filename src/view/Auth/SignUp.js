/* eslint-disable react-native/no-inline-styles */

import React from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  Image,
  Text,
  ScrollView,
  Dimensions,
  TouchableWithoutFeedback,
  BackHandler,
  ActivityIndicator,
  Linking,
} from 'react-native';
import {_register} from '../../api/auth';
import {isEmpty, unset, set} from 'lodash';
import Snackbar from '../../component/Common/Snackbar';
import TextInput from '../../component/Common/EditTextField';
import Button from '../../component/Common/Button';
import {
  secondryTextColor,
  secondryColor,
  white,
  sofiaFont,
} from '../../style/variables';
import {Toast} from 'native-base';
Dimensions.get('window');
import AsyncStorage from '@react-native-community/async-storage';

export default class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      form: {},
      errors: {},
      isLoggedIn: false,
      uerInfo: {},
      value: false,
    };
  }
  //   componentWillMount = () => {
  //     BackHandler.addEventListener(
  //       'hardwareBackPress',
  //       this.handleBackButtonClick,
  //     );
  //   };

  componentWillUnmount = () => {
    // this._unsubscribe()
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  };

  handleBackButtonClick = () => {
    this.props.navigation.navigate('Auth', {screen: 'Login'});
    AsyncStorage.clear();
    return true;
  };

  componentDidMount = () => {
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  };

  handleChange(name, value) {
    let errors = this.state.errors;
    unset(errors, name);
    let form = {...this.state.form, [name]: value};
    this.setState({form});
  }

  //   validate = () => {
  //     let errors = {};
  //     const {first_name, last_name, email, password, password_confirmation} =
  //       this.state.form;
  //     if (isEmpty(first_name)) {
  //       set(errors, 'first_name', ['First name is required']);
  //     }
  //     if (isEmpty(last_name)) {
  //       set(errors, 'last_name', ['Last name is required']);
  //     }
  //     if (isEmpty(email)) {
  //       set(errors, 'email', ['Email is required']);
  //     }
  //     if (isEmpty(password)) {
  //       set(errors, 'password', ['Password is required']);
  //     } else if (password.length < 8) {
  //       set(errors, 'password', ['Password must be at least 8 characters.']);
  //     }
  //     if (isEmpty(password_confirmation)) {
  //       set(errors, 'password_confirmation', ['Comfirm password is required']);
  //     } else if (password_confirmation !== password) {
  //       set(errors, 'password_confirmation', ['Comfirm password is not match ']);
  //     }
  //     return errors;
  //   };
  onSave = async () => {
    const {form} = this.state;

    this.setState({loading: true});

    try {
      // console.log('Form data in signup', form);
      form.type = 'Sommelier';
    
      const res = await _register(form);
    
      // console.log('Form data in signup with res', res);
    
      if (res.success === true) {
        this.setState({loading: false, response: res}, () => {
          Toast.show({
            text: `${res.message}`,
            duration: 2000,
          });
        });
        this.setState({form: {}});
      }
      this.props.navigation.navigate('Login');

    } catch (err) {
      // Handle the error appropriately
      // console.log('Error in onSave:', err);
      this.setState({loading: false});
    
      let errors = {};
    
      if (
        err &&
        err.status &&
        err.status.data &&
        err.status.data.code === 422
      ) {
        errors = err.status.data.errors;
        this.setState({errors});
      } else if (
        err &&
        err.status &&
        err.status.data &&
        err.status.data.code === 401
      ) {
        Toast.show({
          text: `${err.status.data.message}`,
          duration: 2000,
        });
      }
    }
    
  };

  render() {
    const {form, errors} = this.state;
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require('../../assets/ImageBackgroung.png')}
          style={{height: '100%', width: '100%'}}>
          <Snackbar ref={ref => (this._snk = ref)} />

          <ScrollView
            // contentContainerStyle={{ flex: 1 }}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled">
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
                marginHorizontal: 20,
              }}>
              <View
                style={{
                  marginVertical: 25,
                  alignItems: 'flex-start',
                  width: '100%',
                }}>
                <Image
                  source={require('../../assets/Logo.png')}
                  style={{
                    width: 150,
                    height: 40,
                    resizeMode: 'contain',
                  }}
                />
                <Text
                  style={{
                    fontFamily: sofiaFont,
                    fontSize: 25,
                    color: secondryTextColor,
                  }}>
                  Sign up
                </Text>
              </View>

              <TextInput
                label="First name"
                name="first_name"
                errors={errors}
                value={form.first_name}
                onRef={ref => (this.first_name = ref)}
                onChange={this.handleChange.bind(this, 'first_name')}
                onSubmitEditing={() => this.password.focus()}
              />

              <TextInput
                label="Last name"
                name="last_name"
                errors={errors}
                value={form.last_name}
                onRef={ref => (this.last_name = ref)}
                onChange={this.handleChange.bind(this, 'last_name')}
                onSubmitEditing={() => this.password.focus()}
              />
              <TextInput
                label="Email"
                name="email"
                errors={errors}
                value={form.email}
                onRef={ref => (this.email = ref)}
                onChange={this.handleChange.bind(this, 'email')}
                onSubmitEditing={() => this.password.focus()}
              />

              <TextInput
                label="Job title"
                name="job_title"
                errors={errors}
                value={form.job_title}
                onRef={ref => (this.job_title = ref)}
                onChange={this.handleChange.bind(this, 'job_title')}
                onSubmitEditing={() => this.password.focus()}
              />

              <TextInput
                label="Company"
                name="company"
                errors={errors}
                value={form.company}
                onRef={ref => (this.company = ref)}
                onChange={this.handleChange.bind(this, 'company')}
                onSubmitEditing={() => this.password.focus()}
              />

              <TextInput
                label="Password"
                name="password"
                errors={errors}
                onRef={ref => (this.password = ref)}
                value={form.password}
                secureTextEntry={true}
                onChange={this.handleChange.bind(this, 'password')}
              />
              <TextInput
                label="Confirm Password"
                name="password_confirmation"
                errors={errors}
                onRef={ref => (this.password_confirmation = ref)}
                value={form.password_confirmation}
                secureTextEntry={true}
                onChange={this.handleChange.bind(this, 'password_confirmation')}
                onSubmitEditing={() => this.onSave()}
              />

<View style={{width: '100%'}}>
                <Text>
                  <Text
                    style={{
                      fontSize: 16,
                      color: '#fff',
                      // alignSelf: 'center',
                      fontFamily: sofiaFont,
                      marginVertical: 5,
                      paddingHorizontal: 5,
                    }}>
                    By using this app you agree to the
                  </Text>{' '}
                  <Text
                    style={{
                      fontSize: 16,
                      color: '#fff',
                      // alignSelf: 'center',
                      fontFamily: sofiaFont,
                      marginVertical: 5,
                      paddingHorizontal: 5,
                      textDecorationLine: 'underline',
                    }}
                    onPress={() =>
                      Linking.openURL('https://www.vinoted.com/user-agreement')
                    }>
                    User Agreement
                  </Text>{' '}
                  <Text
                    style={{
                      fontSize: 16,
                      color: '#fff',
                      // alignSelf: 'center',
                      fontFamily: sofiaFont,
                      marginVertical: 5,
                      paddingHorizontal: 5,
                    }}>
                    and
                  </Text>{' '}
                  <Text
                    style={{
                      fontSize: 16,
                      color: '#fff',
                      // alignSelf: 'center',
                      fontFamily: sofiaFont,
                      marginVertical: 5,
                      paddingHorizontal: 5,
                      textDecorationLine: 'underline',
                    }}
                    onPress={() =>
                      Linking.openURL('https://www.vinoted.com/privacy-policy')
                    }>
                    Privacy Policy
                  </Text>
                </Text>
              </View>
              {this.state.loading ? (
                <TouchableWithoutFeedback style={{width: '100%'}}>
                  <View style={[styles.button]}>
                    <ActivityIndicator
                      animating={this.state.loading}
                      size="large"
                      color={white}
                    />
                  </View>
                </TouchableWithoutFeedback>
              ) : (
                <Button
                  title="Register"
                  buttonstyles={{
                    backgroundColor: secondryColor,
                    width: '100%',
                    borderRadius: 20,
                    marginTop: 70,
                  }}
                  textsyles={{
                    fontFamily: sofiaFont,
                    color: '#fff',
                    fontSize: 12,
                  }}
                  onPress={this.onSave}
                />
              )}
              <View style={{marginVertical: 10, flexDirection: 'row'}}>
                <Text
                  style={{
                    fontSize: 16,
                    color: '#fff',
                    alignSelf: 'center',
                    marginVertical: 5,
                    fontFamily: sofiaFont,
                  }}>
                  You already have an account?
                </Text>
                <Text
                  onPress={() => this.props.navigation.navigate('Login')}
                  style={{
                    fontSize: 16,
                    color: '#fff',
                    alignSelf: 'center',
                    fontFamily: sofiaFont,
                    marginVertical: 5,
                    paddingHorizontal: 5,
                    textDecorationLine: 'underline',
                  }}>
                  Login
                </Text>
              </View>
            </View>
          </ScrollView>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },

  text: {
    fontSize: 12,
    color: 'white',
    fontWeight: '500',
    fontFamily: sofiaFont,
  },

  button: {
    width: '100%',
    marginTop: 70,
    marginBottom: 5,
    borderRadius: 50,
    height: 45,
    backgroundColor: secondryColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
});