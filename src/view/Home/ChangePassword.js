import React from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions, TouchableWithoutFeedback, ActivityIndicator
} from 'react-native';
import { isEmpty, unset, set } from 'lodash';
import Modal from 'react-native-modal';
import Snackbar from '../../component/Common/Snackbar';
import TextInput from '../../component/Common/EditTextField';
import Button from '../../component/Common/Button';
import { primaryColor, secondryTextColor, TexColor, secondryColor, white, sofiaFont, } from '../../style/variables';
import { Icon, Toast } from 'native-base';
import http from '../../http'
import AsyncStorage from '@react-native-community/async-storage';
import { Images } from '../../../theme/Images';
const { height, width } = Dimensions.get("window")



// import {
//   GoogleSignin,
//   GoogleSigninButton,
//   statusCodes,
// } from '@react-native-community/google-signin';
const widthScreen = Dimensions.get("window").width;

export default class ChangePassword extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      form: {},
      errors: {},
      isLoggedIn: false,
      uerInfo: {},
      value: false
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
    const { current_password, password, password_confirmation } = this.state.form;
    if (isEmpty(current_password)) set(errors, 'current_password', ['Current Password is required']);
    if (isEmpty(password)) set(errors, 'password', ['Password is required']);
    else if (password.length < 8) set(errors, 'password', ['Password must be at least 8 characters.']);
    if (isEmpty(password_confirmation)) set(errors, 'password_confirmation', ['Comfirm password is required']);
    else if (password_confirmation !== password) set(errors, 'password_confirmation', ['Comfirm password is not match ']);
    return errors;
  };

  onSave = async () => {
    let errors = this.validate();
    if (!isEmpty(errors)) return this.setState({ errors })

    const { form } = this.state;
    this.setState({ loading: true, });
    http.post(`auth/change-password`, form).then(async res => {
      console.log("response forgot pass..", res)

      this.setState({ loading: false, refreshing: false }, () =>
        Toast.show({
          text: `${res.message}`,
          buttonText: 'Ok',
          duration: 2000,
        }))
      this.props.navigation.navigate("Auth", { screen: "Login" })
      await AsyncStorage.clear();
      this.setState({
        form: {}
      })
      // this.state.form.clear()

    }).catch(err => {
      let errors = {};
      if (err && err.status.data.code == 422) errors = err.status.data.errors;
      this.setState({ loading: false, errors });
    });
  }


  render() {
    const { form, errors, loading } = this.state;
    return (

      <View style={styles.container}>
        <TouchableOpacity style={[styles.header, { paddingVertical: 5, backgroundColor: primaryColor }]} onPress={() => this.props.navigation.goBack()}>
          {/* <Icon
            name="keyboard-arrow-left" type="MaterialIcons"
            onPress={() => this.props.navigation.goBack()}
            style={{ color: white, padding: 10 }}>
          </Icon> */}
          <Image 
          source={Images.BackNavigationIcon} 
          style={{height:20, width:20, padding: 10}}
          tintColor={"white"}
          />

        </TouchableOpacity>


        <ImageBackground
          source={require('../../assets/ImageBackgroung.png')}
          style={{ height: '100%', width: '100%' }}>
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
                marginHorizontal: 20,
              }}>


              <View style={{ marginVertical: 20, alignItems: "flex-start", width: "100%" }}>
                <Text style={{ fontFamily: sofiaFont, fontSize: 25, color: secondryTextColor, }}>
                  Change Password
                </Text>
              </View>

              <TextInput
                label='Current Password'
                name="current_password"
                errors={errors}
                onRef={ref => (this.current_password = ref)}
                value={form.current_password}
                secureTextEntry={true}
                onChange={this.handleChange.bind(this, 'current_password')}
              // iconProps={{
              //   ios: 'ios-lock',
              //   android: 'md-lock',
              // }}
              // onSubmitEditing={this.onSave}
              />
              <TextInput
                label='New Password'
                name="password"
                errors={errors}
                onRef={ref => (this.password = ref)}
                value={form.password}
                secureTextEntry={true}
                onChange={this.handleChange.bind(this, 'password')}
              // iconProps={{
              //   ios: 'ios-lock',
              //   android: 'md-lock',
              // }}
              // onSubmitEditing={this.onSave}
              />
              <TextInput
                label='Confirm Password'
                name="password_confirmation"
                errors={errors}
                onRef={ref => (this.password_confirmation = ref)}
                value={form.password_confirmation}
                secureTextEntry={true}
                onChange={this.handleChange.bind(this, 'password_confirmation')}
              // iconProps={{
              //   ios: 'ios-lock',
              //   android: 'md-lock',
              // }}
              // onSubmitEditing={this.onSave}
              />



              {this.state.loading ?
                <TouchableWithoutFeedback style={{ width: "100%" }}>
                  <View style={[styles.button, { marginTop: 70 }]}>
                    <ActivityIndicator animating={this.state.loading} size='large' color={white} />
                  </View>
                </TouchableWithoutFeedback>
                :
                <Button
                  title='Submit'
                  buttonstyles={{
                    backgroundColor: secondryColor,
                    width: '100%',
                    borderRadius: 20,
                    marginTop: 70
                  }}
                  textsyles={{ fontFamily: sofiaFont, color: '#fff', fontSize: 12 }}
                  onPress={this.onSave}
                />}






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
    // justifyContent: 'center',
    // backgroundColor: '#ffffff',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    paddingLeft: 10,
    justifyContent: 'space-between',
  },
  logocontainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logotextcontainer: {
    fontSize: 22,
    color: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    fontFamily: sofiaFont,
  },
  footerText: {
    color: '#ffffff',
    fontSize: 17,
    justifyContent: 'center',
    fontFamily: sofiaFont,
  },
  link: {
    color: '#ffffff',
    fontSize: 17,
    marginTop: 10,
    fontFamily: sofiaFont,
  },
  modelView: {
    height: 180,
    width: width,
    backgroundColor: "white",
    alignItems: "center",
    // justifyContent: "center",
    borderRadius: 10,
    marginVertical: 5
  },
  modelheader: {
    alignItems: "center",
  },
  buttoninput: {
    alignItems: 'center',
    marginTop: 5,
    width: width - 90,
    alignSelf: "center",
    height: 45,
    justifyContent: "center",
    borderRadius: 5,
    backgroundColor: primaryColor,
  },
  text: {
    fontSize: 12,
    color: "white",
    fontWeight: "700",
    fontFamily: sofiaFont,
  },
  button: {
    width: "100%",
    marginTop: 5,
    marginBottom: 5,
    borderRadius: 50,
    height: 45,
    backgroundColor: secondryColor,
    justifyContent: 'center',
    alignItems: 'center',
  }
});


