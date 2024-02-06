import React from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  TouchableWithoutFeedback,
  ActivityIndicator,
  BackHandler,
} from 'react-native';
import messaging from '@react-native-firebase/messaging';

import { isEmpty, unset, set } from 'lodash';
import { _login, _handleAuthUser } from '../../api/auth';
import Snackbar from '../../component/Common/Snackbar';
import TextInput from '../../component/Common/EditTextField';
import Button from '../../component/Common/Button';
import {
  secondryTextColor,
  TexColor,
  secondryColor,
  white,
  sofiaFont,
} from '../../style/variables';
import { Toast } from 'native-base';
Dimensions.get('window');
import AsyncStorage from '@react-native-community/async-storage';
// import {
//   GoogleSignin,
//   GoogleSigninButton,
//   statusCodes,
// } from '@react-native-community/google-signin';

export default class Login extends React.Component {
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
    this.getFcmToken = this.getFcmToken.bind(this);
  }

  // componentWillMount = () => {

  // };

  componentWillUnmount = () => {
    // this._unsubscribe()
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  };

  handleBackButtonClick = () => {
    Promise.resolve('Success')
      .then(value => {
        console.log('Success', value); // "Success"
        BackHandler.exitApp();
        AsyncStorage.clear();
        return true;
      })
      .catch(error => {
        console.log('error....', error);
      });

    this.props.navigation.navigate('Auth', { screen: 'Login' });
    AsyncStorage.clear();
    return true;
  };

  componentDidMount = () => {
    this.setState({ form: { ...this.state.form } });
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  };

  handleChange(name, value) {
    let errors = this.state.errors;
    unset(errors, name);
    let form = { ...this.state.form, [name]: value };
    this.setState({ form });
  }

  validate = () => {
    console.log('on validate console');
    let errors = {};
    const { email, password } = this.state.form;
    if (isEmpty(email)) {
      set(errors, 'email', ['Email is required']);
    }

    if (isEmpty(password)) {
      set(errors, 'password', ['Password is required']);
    }
    return errors;
  };

  getFcmToken = async () => {
    try {
      let getToken = await AsyncStorage.getItem('fcmToken');
      console.log('Token Retrieved', getToken);
  
      if (!getToken) {
        let fcmToken = await messaging().getToken();
        await AsyncStorage.setItem('fcmToken', JSON.stringify(fcmToken));
        return fcmToken; // Return the token
      } else {
        return JSON.parse(getToken); // Return the parsed token
      }
    } catch (error) {
      console.log('Error Retrieving Token', error);
      return null; // Return null if there's an error
    }
  };

  
  onSave = async () => {
    const { form } = this.state;
    console.log('form Login Data:-', form);
  
    let errors = this.validate();
  
    if (!isEmpty(errors)) {
      return this.setState({ errors });
    }
  
    // Get the token before proceeding
    let token = await this.getFcmToken();
  
    console.log("Got token", token)
    form.type = 'Sommelier';
    form.notification_token = token;
    console.log("Recieved token", token)
    _login(this.state.form)
      .then(res => {
        console.log('Login User Res Success', res);
        this.setState({ loading: false, response: res });
        _handleAuthUser();
        // this.props.navigation.navigate('Home');
      })
      .catch(err => {
        this.setState({ loading: false });
        console.log('error for Login Form', err);
        let errors = {};
  
        if (err && err.status.data.code == 422) {
          errors = err.status.data.errors;
          this.setState({ errors });
        } else if (err && err.status.data.code == 401) {
          this.setState({ loading: false });
          Toast.show({
            text: `${err.status.data.message}`,
            // buttonText: 'Ok',
            duration: 2000,
          });
        }
      });
  };
  render() {
    const { form, errors } = this.state;
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require('../../assets/ImageBackgroung.png')}
          style={{ height: '100%', width: '100%' }}>
          <Snackbar ref={ref => (this._snk = ref)} />

          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
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
                  marginVertical: 20,
                  alignItems: 'flex-start',
                  width: '100%',
                }}>
                <Text
                  style={{
                    fontFamily: sofiaFont,
                    fontSize: 25,
                    color: secondryTextColor,
                  }}>
                  Welcome back!
                </Text>
              </View>
              <TextInput
                label="Email"
                name="email"
                errors={errors}
                value={form.email}
                onRef={ref => (this.email = ref)}
                onChange={this.handleChange.bind(this, 'email')}
                // iconProps={{
                //   ios: 'ios-person',
                //   android: 'md-person',
                // }}
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
                onSubmitEditing={() => this.onSave()}
              />

              <View style={{ flexDirection: 'row', marginVertical: 10 }}>
                <TouchableOpacity
                  style={{ flex: 1 }}
                  onPress={() => this.props.navigation.navigate('SignUp')}>
                  <Text
                    onPress={() =>
                      this.props.navigation.navigate('ForgotPassword')
                    }
                    style={{
                      fontFamily: sofiaFont,
                      color: TexColor,
                      textAlign: 'right',
                    }}>
                    Forgot Password?
                  </Text>
                </TouchableOpacity>
              </View>

              {this.state.loading ? (
                <TouchableWithoutFeedback>
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
                  title="Login"
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
              <View style={{ marginVertical: 10, flexDirection: 'row' }}>
                <Text
                  style={{
                    fontSize: 16,
                    color: '#fff',
                    alignSelf: 'center',
                    marginVertical: 5,
                    fontFamily: sofiaFont,
                  }}>
                  Don't have an account?
                </Text>
                <Text
                  onPress={() => this.props.navigation.navigate('SignUp')}
                  style={{
                    fontSize: 16,
                    color: '#fff',
                    alignSelf: 'center',
                    fontFamily: sofiaFont,
                    marginVertical: 5,
                    paddingHorizontal: 5,
                    textDecorationLine: 'underline',
                  }}>
                  Signup Now
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
    fontWeight: '700',
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
