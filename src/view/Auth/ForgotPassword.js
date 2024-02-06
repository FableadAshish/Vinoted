/* eslint-disable no-trailing-spaces */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */
/* eslint-disable quotes */
/* eslint-disable no-unused-vars */
import React from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  Image,
  Text,
  ScrollView,
  ActivityIndicator,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import { isEmpty, unset, set } from 'lodash';
import Snackbar from '../../component/Common/Snackbar';
import TextInput from '../../component/Common/EditTextField';
import Button from '../../component/Common/Button';
import {
  primaryColor,
  white,
  secondryTextColor,
  secondryColor,
  sofiaFont,
} from '../../style/variables';
import { Icon, Toast } from 'native-base';
import http from '../../http';
import { Images } from '../../../theme/Images';
Dimensions.get('window');

// import {
//   GoogleSignin,
//   GoogleSigninButton,
//   statusCodes,
// } from '@react-native-community/google-signin';
const widthScreen = Dimensions.get('window').width;

export default class ForgotPassword extends React.Component {
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

  componentDidMount = () => {
    this.setState({ form: { ...this.state.form } });
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
    const { email } = this.state.form;
    if (isEmpty(email)) {
      set(errors, 'email', ['Email is required']);
    }
    return errors;
  };

  onSave = async () => {
    let errors = this.validate();
    if (!isEmpty(errors)) {
      return this.setState({ errors });
    }

    const { form } = this.state;
    form.type = 'Sommelier';
    this.setState({ loading: true });
    http
      .post(`auth/forgot-password`, form)
      .then(res => {
        console.log('response forgot pass..', res);
        this.setState({ loading: false, refreshing: false }, () =>
          Toast.show({
            text: `${res.message}`,
            buttonText: 'Ok',
            duration: 2000,
          }),
        );
        setTimeout(() => this.props.navigation.navigate('Login'), 2000);
      })
      .catch(err => {
        console.log('errrrro', err);
        let errors = {};
        if (err && err.status.data.code == 422) {
          errors = err.status.data.errors;
          this.setState({ loading: false, errors });
        } else if (err && err.status.data.code == 401) {
          this.setState({ loading: false });
          Toast.show({
            text: `${err.status.data.message}`,
            // buttonText: 'Ok',
            duration: 2000,
          });
        } else {
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
    const { form, errors, loading } = this.state;
    return (
      <View style={styles.container}>
        <View
          style={[
            styles.header,
            { paddingVertical: 5, backgroundColor: primaryColor },
          ]}>
          <Image
            source={Images.BackNavigationIcon}
            style={{ height: 22, width: 22, padding: 10 }}
            tintColor={"white"}
            onPress={() => this.props.navigation.goBack()}
          />
        </View>
        <ImageBackground
          source={require('../../assets/ImageBackgroung.png')}
          style={{ height: '100%', width: '100%', paddingBottom: 0 }}>
          <Snackbar ref={ref => (this._snk = ref)} />

          <ScrollView
            contentContainerStyle={{ flex: 1 }}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled">
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
                marginBottom: 20,
                // backgroundColor:"red",
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
                  Forgot Password
                </Text>

                {/* <Text style={{ fontFamily: sofiaFont, fontSize: 15, color: white, }}>
                                    
                                    Sommelier
      </Text> */}
              </View>
              <TextInput
                label="Email"
                name="email"
                errors={errors}
                value={form.email}
                onRef={ref => (this.email = ref)}
                onChange={this.handleChange.bind(this, 'email')}
                onSubmitEditing={() => this.password.focus()}
              />

              {this.state.loading ? (
                <TouchableWithoutFeedback style={{ width: '100%' }}>
                  <View style={[styles.button, { marginTop: 70 }]}>
                    <ActivityIndicator
                      animating={this.state.loading}
                      size="large"
                      color={white}
                    />
                  </View>
                </TouchableWithoutFeedback>
              ) : (
                <Button
                  title="Submit"
                  buttonstyles={{
                    backgroundColor: secondryColor,
                    width: '100%',
                    borderRadius: 20,
                    marginTop: 70,
                  }}
                  textsyles={{ color: '#fff', fontSize: 12 }}
                  onPress={this.onSave}
                />
              )}

              {/* <View style={{ marginVertical: 10, flexDirection: "row" }}>

                                <Text onPress={() => this.props.navigation.navigate("Login")}
                                    style={{
                                        fontSize: 16,
                                        color: '#fff',
                                        alignSelf: 'center',
                                        fontFamily: sofiaFont,
                                        marginVertical: 5, paddingHorizontal: 5, textDecorationLine: "underline"
                                    }}>
                                    Login
        </Text>
                            </View> */}
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
    // justifyContent:"flex-start",
    // backgroundColor:"red"
  },

  text: {
    fontSize: 12,
    color: 'white',
    fontWeight: '700',
    fontFamily: sofiaFont,
  },
  button: {
    width: '100%',
    marginTop: 5,
    marginBottom: 5,
    borderRadius: 50,
    height: 45,
    backgroundColor: secondryColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    paddingLeft: 10,
    justifyContent: 'space-between',
  },
});
