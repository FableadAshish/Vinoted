/* eslint-disable no-unused-vars */
/* eslint-disable curly */
/* eslint-disable no-shadow */
/* eslint-disable eqeqeq */
/* eslint-disable jsx-quotes */
/* eslint-disable quotes */
/* eslint-disable no-trailing-spaces */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
import React from 'react';
import {
    StyleSheet,
    View,
    ImageBackground,
    Image,
    Text,
    ScrollView,
    Dimensions, TouchableWithoutFeedback, ActivityIndicator, BackHandler,
} from 'react-native';
import { _verifyOTP } from '../../api/auth';
import http from '../../http';
import { isEmpty, unset, set } from 'lodash';
import Snackbar from '../../component/Common/Snackbar';
import TextInput from '../../component/Common/EditTextField';
import Button from '../../component/Common/Button';
import { primaryColor, secondryTextColor, secondryColor, white, sofiaFont } from '../../style/variables';
import { Icon, Toast } from 'native-base';
import { _getUser, _handleAuthUser } from '../../api/auth';
import AsyncStorage from '@react-native-community/async-storage';

Dimensions.get("window");


export default class VerifyEmail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            isloading: false,
            form: {},
            userData: {},
            errors: {},
            isLoggedIn: false,
            uerInfo: {},
            value: false,
        };
    }


    componentDidMount = async () => {
        const usergetotp = await _getUser();
        console.log("Get User", usergetotp);
        // if (usergetotp) {
        //     Toast.show({
        //         text: `${usergetotp.message}`,
        //         // buttonText: 'Ok',
        //         duration: 2000,
        //     })
        // }
        this.setState({ userData: usergetotp.data });
    };

    componentWillMount = () => {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    };

    componentWillUnmount = () => {
        // this._unsubscribe()
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    };

    handleBackButtonClick = () => {
        this.props.navigation.navigate("Auth",{screen:'SignUp'});
        AsyncStorage.clear()
        return true;
    };

    handleChange(name, value) {
        let errors = this.state.errors;
        unset(errors, name);
        let form = { ...this.state.form, [name]: value };
        this.setState({ form });
    }

    validate = () => {
        let errors = {};
        const { otp } = this.state.form;
        if (isEmpty(otp)) set(errors, 'otp', ['OTP is required']);
        return errors;
    };




    onSave = () => {
        let errors = this.validate();
        if (!isEmpty(errors)) return this.setState({ errors });
        this.setState({ loading: true, errors });
        _verifyOTP(this.state.form).then(async (res) => {
            console.log("Form data in Res", res);
            _handleAuthUser();
            this.setState({userData:{
                data:{
                    access_token:this.state.userData.data.access_token,
                    user:{...this.state.userData.data.user,
                        email_verified_at:res.email_verified_at
                    }
                }
            }},()=>console.log("Userdata",this.state.userData))
            await AsyncStorage.setItem('app-token', JSON.stringify(this.state.userData));
            this.props.navigation.navigate("App")

        }).catch(err => {
            console.log("errrrro", err);
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

            } else if (err && err.status.data.code == 400) {
                this.setState({ loading: false });
                Toast.show({
                    text: `${err.status.data.message}`,
                    // buttonText: 'Ok',
                    duration: 2000,
                });

            }
        });
    };


    onResendOtp = async () => {
        const { form, userData } = this.state;
        form.email = userData.user.email;
        this.setState({ isloading: true });
        console.log('form resend', form);
        let url = 'auth/resend/otp';
        http
            .post(url, this.state.form)
            .then(async (res) => {
                this.setState({ isloading: false });
                Toast.show({
                    text: `${res.message}`,
                    // buttonText: 'Ok',
                    duration: 2000,
                });
                console.log('resend otp res : ', res);
            }).catch(err => {
                this.setState({ isloading: false });
                console.log("errrrro", err);
                let errors = {};
                if (err && err.status.data.code == 422) {
                    errors = err.status.data.errors;
                    this.setState({ isloading: false, errors });
                } else if (err && err.status.data.code == 401) {
                    this.setState({ isloading: false });
                    Toast.show({
                        text: `${err.status.data.message}`,
                        // buttonText: 'Ok',
                        duration: 2000,
                    });

                } else if (err && err.status.data.code == 400) {
                    this.setState({ loading: false });
                    Toast.show({
                        text: `${err.status.data.message}`,
                        // buttonText: 'Ok',
                        duration: 2000,
                    });

                }
            });

    };

    // onSave = () => {
    //     let errors = this.validate();
    //     if (!isEmpty(errors)) {
    //       return this.setState({ errors });
    //     }
    //     this.setState({loading:true, form: { ...this.state.form } });
    //     axios({
    //       method: 'post',
    //       url: `${API_URL}auth/verify-email`,
    //       data:this.state.form
    //     }).then((res)=>{
    //       if(res!=null){
    //         this.setState({ loading: false, response: res });
    //           this.props.navigation.push("App")

    //       }

    //     }).catch((error) => {
    //       console.error(error);
    //   });
    //   };



    render() {
        const { form, errors, userData } = this.state;
        return (

            <View style={styles.container}>
                <View style={[styles.header, { paddingVertical: 5, backgroundColor: primaryColor }]}>
                    <Icon name="keyboard-arrow-left" type="MaterialIcons" onPress={() => {
                        this.props.navigation.navigate("SignUp");
                        AsyncStorage.clear()
                    }} style={{ color: white, padding: 10 }}></Icon>

                </View>
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


                            <View style={{ marginVertical: 25, alignItems: "flex-start", width: "100%" }}>
                                <Image
                                    source={require('../../assets/Logo.png')}
                                    style={{
                                        width: 150,
                                        height: 40,
                                        resizeMode: 'contain',
                                    }}
                                />
                                <Text style={{ fontFamily: sofiaFont, fontSize: 25, color: secondryTextColor }}>
                                    Email Verification
      </Text>


                                <Text style={{ fontFamily: sofiaFont, fontSize: 15, color: white, marginTop: 5 }}>
                                    Please enter the 6 digit code sent to
                                </Text>
                                <Text style={{ fontFamily: sofiaFont, fontSize: 15, color: white, marginTop: 5 }}>{!isEmpty(userData) && userData.user.email}</Text>

                            </View>



                            <TextInput
                                label='Enter Code'
                                name="otp"
                                errors={errors}
                                value={form.otp}
                                keyboardType="number-pad"
                                onRef={ref => (this.otp = ref)}
                                onChange={this.handleChange.bind(this, 'otp')}
                                onSubmitEditing={() => this.password.focus()}
                            />

                            <View style={{ marginVertical: 10, alignItems: 'flex-end', paddingRight: 20, width: "100%" }}>

                                {this.state.isloading ? 
                                <ActivityIndicator animating={this.state.isloading} size='large' color={white} />
                                    
                                : <Text
                                        onPress={() => this.onResendOtp()}
                                        style={{ fontFamily: sofiaFont, fontWeight: '700', fontSize: 13, color: white }}>Resend Code</Text>
                                }
                            </View>
                            <View style={{ marginVertical: 5, alignItems: 'flex-end', paddingRight: 20, width: "100%" }}>
                                <Text
                                    onPress={() => this.props.navigation.navigate("SignUp")}
                                    // onPress={() => this.props.navigation.goBack()}
                                    style={{ fontFamily: sofiaFont, fontWeight: '700', fontSize: 13, color: white }}>Change Email</Text>
                            </View>


                            {this.state.loading ?
                                <TouchableWithoutFeedback style={{ width: '100%' }}>
                                    <View style={[styles.button]}>
                                        <ActivityIndicator animating={this.state.loading} size='large' color={white} />
                                    </View>
                                </TouchableWithoutFeedback>
                                :
                                <Button
                                    title='Verify'
                                    buttonstyles={{
                                        backgroundColor: secondryColor,
                                        width: '100%',
                                        borderRadius: 20,
                                        marginTop: 30,
                                    }}
                                    textsyles={{ fontFamily: sofiaFont, color: '#fff', fontSize: 12 }}
                                    onPress={this.onSave}
                                />

                            }
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
        color: "white",
        fontWeight: "700",
        fontFamily: sofiaFont,
    },

    button: {
        width: "100%",
        marginTop: 30,
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
        marginTop: 40,
        paddingLeft: 10,
        justifyContent: 'space-between',
    },
});


