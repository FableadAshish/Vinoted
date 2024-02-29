// 1104
import React, {Component} from 'react';
import {
  Platform,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
  Text,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  // Button
} from 'react-native';
import Header from '../../../component/Header/Header';
import {
  white,
  secondryColor,
  primaryColor,
  primaryTextColor,
  sofiaFont,
} from '../../../style/variables';
import http from '../../../http';
import LinearGradient from 'react-native-linear-gradient';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
// import ShimmerPlaceholder from 'react-native-shimmer-placeholder'
const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
// import TextInput from '../../../component/Common/EditTextField';
import {isEmpty, unset, set} from 'lodash';
import {connect} from 'react-redux';
import Button from '../../../component/Common/Button';
import {Icon, Toast} from 'native-base';
import ImagePicker from 'react-native-image-crop-picker';
import {Images} from '../../../../theme/Images';
import Loader from '../../../component/Indicator/Loader';
const {width, height} = Dimensions.get('window');
var BUTTONS = ['From Camera', 'From Gallery', 'Cancel'];
var DESTRUCTIVE_INDEX = 1;
var CANCEL_INDEX = 2;

let data = ['1', '2', '3'];

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {},
      profile: {},
      country: [],
      data: data,
      modalVisible: false,
      visible: false,
      refreshing: false,
      editable: false,
      errors: {},
      selectedImage: null,
    };
    // this.setSelectedImage = this.setSelectedImage.bind(this);
    this.handleChangeImage = this.handleChangeImage.bind(this);
  }
  componentDidMount() {
    this.utilities_all();
    this.Store();
  }

  Store = async () => {
    const {form} = this.state;
    this.setState({loading: true});
    http
      .get('sommelier/profile')
      .then(res => {
        // console.log('response profile pass..', res);
        this.setState({
          profile: res.data.user,
          form: {
            ...this.state.form,
            email: res.data.user.email,
            dialing_code: res.data.user.dialing_code,
            phone: res.data.user.phone,
            first_name: res.data.user.profile.first_name,
            last_name: res.data.user.profile.last_name,
            company: res.data.user.company,
            job_title: res.data.user.job_title,
            photo: res.data.user.profile.photo,
            address_1: res.data.user.default_address.address_1,
            city: res.data.user.default_address.city,
            state: res.data.user.default_address.state,
            postcode: res.data.user.default_address.postcode,
            country_name: res.data.user.default_address.country_name,
            country_code: res.data.user.default_address.country_code,
          },
          loading: false,
          refreshing: false,
        });
      })
      .catch(err => {
        let errors = {};
        if (err && err.status.data.code == 422) {
          errors = err.status.data.errors;
        }
        this.setState({loading: false, errors});
      });
  };

  utilities_all() {
    this.setState({isLoading: true});
    http
      .get('utilities/all')
      .then(res => {
        // console.log('FORMSETCOUNTRYee', res);
        const country = res.data.countries[227].name;
        const country_code = res.data.countries[227].code;
        if (
          this.state.form.country_name === null ||
          this.state.form.country_name === ''
        ) {
          this.setState(
            {
              GOOGLE_API_KEY: res.data.credentials.google_map_api_key,
              isLoading: false,
              form: {
                ...this.state.form,
                dialing_code: res.data.countries[227].dialing_code,
                country: country_code,
                country_code: country_code,
              },
              country: res.data.countries,
            },
            // () => console.log('FORMSETCOUNTRY', this.state.form.country_code),
          );
        } else {
          this.setState(
            {
              GOOGLE_API_KEY: res.data.credentials.google_map_api_key,
              isLoading: false,
              form: {
                ...this.state.form,
                dialing_code: res.data.countries[227].dialing_code,
                country: country_code,
              },
              country: res.data.countries,
            },
            // () => console.log('FORMSETCOUNTRY', this.state.form.country_code),
          );
        }
      })
      .catch(err => {
        let errors = {};
        if (err && err.status == 422) {
          errors = err.errors;
        }
        this.setState({isLoading: false, errors});
        console.log('get countries error : ', err);
      });
  }

  handleChange(name, value) {
    let errors = this.state.errors;
    unset(errors, name);
    let form = {...this.state.form, [name]: value};
    this.setState({form});
  }

  _handleImageCropper = fileType => {
    // this.setState({imageModalVisible: false});
    // ActionSheet.show(
    //   {
    //     options: BUTTONS,
    //     cancelButtonIndex: CANCEL_INDEX,
    //     destructiveButtonIndex: DESTRUCTIVE_INDEX,
    //     title: 'Select an Image',
    //   },
    //   buttonIndex => {
    //     // buttonIndex === 0 ? this.fromCamera() : this.fromGallery();
    //     if (buttonIndex === 0) {
    //       this.fromCamera(fileType);
    //     } else if (buttonIndex === 1) {
    //       this.fromGallery(fileType);
    //     }
    //   },
    // );
    // console.log("Hell")
  };

  fromGallery = fileType => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(response => {
        console.log('Sourceimage', response);
        this.handleChangeImage(fileType, response.path);
        // this.handleChange(fileType, image);
        console.log('Imagessss', fileType + ' ' + response.path);

        // if (fileType !== 'photo') {
        //   this.setState({form:{...this.state.form,photo:response.path}, imageModalVisible: true});
        // }
      })
      .catch(err => {
        console.log('image error', err.message);
      });
  };
  fromCamera = fileType => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(response => {
        console.log(response);
        let image = {
          name: `${fileType}.jpeg`,
          type: 'image/jpeg',
          uri:
            Platform.OS === 'android'
              ? response.path
              : response.path.replace('file://', ''),
        };
        console.log(image);
        this.handleChangeImage(fileType, response.path);
      })
      .catch(err => {
        console.log('image error', err.message);
      });
  };

  handleChangeImage(name, value) {
    let errors = this.state.errors;
    this.setState({form: {...this.state.form, [name]: value}}, () =>
      console.log('IMAGESSSS', this.state.form),
    );
  }

  validate() {
    let errors = {};
    const {
      phone,
      dialing_code,
      // city,
      // state,
      // postcode,
      // address_1,
      // country_code,
      photo,
      password_confirmation,
    } = this.state.form;
    // if (isEmpty(dialing_code)) set(errors, 'dialing_code', ['Dial code required']);
    if (isEmpty(photo)) {
      set(errors, 'photo', ['Photo required']);
    }
    // if (isEmpty(phone)) set(errors, 'phone', ['Mobile Number is required']);
    // else if (phone.trim().startsWith('0') || !/^\d{10}$/.test(phone))
    //     set(errors, 'phone', ['Invalid Mobile Number format']);

    // if (isEmpty(address_1)) set(errors, 'address_1', ['Address is required']);
    // if (isEmpty(city)) set(errors, 'city', ['City is required']);
    // if (isEmpty(state)) set(errors, 'state', ['State is required']);
    // if (isEmpty(postcode)) set(errors, 'postcode', ['Postcode is required']);
    // if (isEmpty(country_code)) set(errors, 'country_code', ['Country  is required']);
    // else unset(errors, address_1);
    return errors;
  }

  onSave = async () => {
    let errors = this.validate();
    if (!isEmpty(errors)) {
      return this.setState({errors});
    }

    const {form} = this.state;
    const fd = new FormData();
    console.log('This is FD Form Again', form);
    if (!isEmpty(this.state.form.photo)) {
      fd.append('photo', {
        name: this.state.form.photo.fileName
          ? this.state.form.photo.fileName
          : 'test.jpeg',
        type: this.state.form.photo.type
          ? this.state.form.photo.type
          : 'image/jpeg',
        uri:
          Platform.OS === 'android'
            ? this.state.form.photo
            : this.state.form.photo.replace('file://', ''),
      });
    }

    if (!isEmpty(this.state.form.email)) {
      fd.append('email', this.state.form.email);
    }
    // if (!isEmpty(this.state.form.dialing_code)) {
    //     fd.append('dialing_code', this.state.form.dialing_code);
    // }

    if (!isEmpty(this.state.form.first_name)) {
      fd.append('first_name', this.state.form.first_name);
    }
    if (!isEmpty(this.state.form.last_name)) {
      fd.append('last_name', this.state.form.last_name);
    }
    if (!isEmpty(this.state.form.company)) {
      fd.append('company', this.state.form.company);
    }
    if (!isEmpty(this.state.form.job_title)) {
      fd.append('job_title', this.state.form.job_title);
    }
    // if (!isEmpty(this.state.form.phone)) {
    //     fd.append('phone', this.state.form.phone);
    // }
    // if (!isEmpty(this.state.form.address_1)) {
    //     fd.append('address_1', this.state.form.address_1);
    // }
    if (!isEmpty(this.state.form.address_1)) {
      fd.append('address_1', this.state.form.address_1);
    } else {
      fd.append('address_1', 'Websenor');
    }
    if (!isEmpty(this.state.form.city)) {
      fd.append('city', this.state.form.city);
    } else {
      fd.append('city', 'Udaipur');
    }
    if (!isEmpty(this.state.form.state)) {
      fd.append('state', this.state.form.state);
    } else {
      fd.append('state', 'Rajasthan');
    }
    if (!isEmpty(this.state.form.postcode)) {
      fd.append('postcode', this.state.form.postcode);
    } else {
      fd.append('postcode', '313001');
    }
    if (!isEmpty(this.state.form.country_code)) {
      fd.append('country_code', this.state.form.country_code);
    } else {
      fd.append('country_code', 'IN');
    }
    // console.log('response DDD', fd);
    this.setState({loading: true});
    http
      .post('sommelier/profile', form)
      .then(res => {
        console.log('response profile update pass..', res);
        this.setState(
          {
            form: res.data.user,
            form: {...this.state.form},
            loading: false,
            refreshing: false,
            editable: false,
          },
          () =>
            Toast.show({
              text: `${res.message}`,
              buttonText: 'Ok',
              duration: 2000,
            }),
        );
      })
      .catch(err => {
        let errors = {};
        if (err && err.status.data.code == 422) {
          errors = err.status.data.errors;
        }
        this.setState({loading: false, refreshing: false, errors});
      });
  };

  onRefresh = () => {
    this.setState(
      {
        refreshing: true,
      },
      () => this.Store(),
    );
  };

  render() {
    const {profile, editable, errors, form} = this.state;
    // console.log('Profile Form Agan', form);
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: primaryColor,
        }}>
        <Header
          navigation={this.props.navigation}
          iconColor={white}
          iconProps={Images.BackNavigationIcon}
          onPress={() => this.props.navigation.goBack()}
          image={require('../../../assets/Logo.png')}
        />
        {isEmpty(form) && this.state.loading ? (
          <ScrollView>
            {/* <SkeletonContent
              containerStyle={{flex: 1, width: '95%', marginLeft: 10}}
              boneColor="lightgray"
              layout={[
                {
                  alignSelf: 'center',
                  alignItems: 'center',
                  width: 130,
                  height: 130,
                  borderRadius: 65,
                },
                {
                  height: 30,
                  width: '65%',
                  alignSelf: 'center',
                  borderRadius: 30,
                  marginVertical: 10,
                },
                {
                  height: 15,
                  width: '50%',
                  borderRadius: 20,
                  marginHorizontal: 5,
                  marginTop: 10,
                  marginVertical: 5,
                  justifyContent: 'center',
                },
                {
                  height: 15,
                  width: '70%',
                  borderRadius: 20,
                  marginHorizontal: 5,
                  marginVertical: 5,
                  justifyContent: 'center',
                },

                {
                  height: 15,
                  width: '50%',
                  borderRadius: 20,
                  marginHorizontal: 5,
                  marginTop: 25,
                  marginVertical: 5,
                  justifyContent: 'center',
                },
                {
                  height: 15,
                  width: '70%',
                  borderRadius: 20,
                  marginHorizontal: 5,
                  marginVertical: 5,
                  justifyContent: 'center',
                },

                {
                  height: 15,
                  width: '50%',
                  borderRadius: 20,
                  marginHorizontal: 5,
                  marginTop: 25,
                  marginVertical: 5,
                  justifyContent: 'center',
                },
                {
                  height: 15,
                  width: '70%',
                  borderRadius: 20,
                  marginHorizontal: 5,
                  marginVertical: 5,
                  justifyContent: 'center',
                },

                {
                  height: 15,
                  width: '50%',
                  borderRadius: 20,
                  marginHorizontal: 5,
                  marginTop: 25,
                  marginVertical: 5,
                  justifyContent: 'center',
                },
                {
                  height: 15,
                  width: '70%',
                  borderRadius: 20,
                  marginHorizontal: 5,
                  marginVertical: 5,
                  justifyContent: 'center',
                },

                {
                  height: 15,
                  width: '50%',
                  borderRadius: 20,
                  marginHorizontal: 5,
                  marginTop: 25,
                  marginVertical: 5,
                  justifyContent: 'center',
                },
                {
                  height: 15,
                  width: '70%',
                  borderRadius: 20,
                  marginHorizontal: 5,
                  marginVertical: 5,
                  justifyContent: 'center',
                },

                {
                  height: 15,
                  width: '50%',
                  borderRadius: 20,
                  marginHorizontal: 5,
                  marginTop: 25,
                  marginVertical: 5,
                  justifyContent: 'center',
                },
                {
                  height: 15,
                  width: '70%',
                  borderRadius: 20,
                  marginHorizontal: 5,
                  marginVertical: 5,
                  justifyContent: 'center',
                },

                {
                  height: 15,
                  width: '50%',
                  borderRadius: 20,
                  marginHorizontal: 5,
                  marginTop: 25,
                  marginVertical: 5,
                  justifyContent: 'center',
                },
                {
                  height: 15,
                  width: '70%',
                  borderRadius: 20,
                  marginHorizontal: 5,
                  marginVertical: 5,
                  justifyContent: 'center',
                },
              ]}
              animationDirection="horizontalRight"
              backgroundColor={primaryColor}
              loading={true}
              // ...
            /> */}
            <View>
              <Loader />
            </View>
          </ScrollView>
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={() => this.onRefresh()}
              />
            }>
            <View
              style={{marginHorizontal: 5, width: '98%', alignSelf: 'center'}}>
              <View style={{alignItems: 'center'}}>
                <TouchableWithoutFeedback
                  //  onPress={this.chooseFile.bind(this)}
                  // onPress={() => this._handleImageCropper('photo')}>
                  onPress={() => this.fromGallery('photo')}>
                  <View style={[styles.view, {alignItems: 'center'}]}>
                    {!isEmpty(form.photo) ? (
                      <Image
                        source={{uri: form?.photo}}
                        style={{width: 130, height: 130, borderRadius: 65}}
                      />
                    ) : (
                      <Image
                        source={require('../../../assets/sommelier.jpeg')}
                        style={{width: 130, height: 130, borderRadius: 65}}
                      />
                    )}

                    {/* )} */}
                  </View>
                </TouchableWithoutFeedback>
                {!isEmpty(errors) &&
                  errors.photo &&
                  isEmpty(this.state.form.photo) && (
                    <Text
                      style={{
                        fontFamily: sofiaFont,
                        fontSize: 10,
                        color: 'red',
                      }}>
                      {errors.photo}
                    </Text>
                  )}
              </View>

              <View style={[styles.view, {alignItems: 'center'}]}>
                <Text style={styles.textheading}>
                  {form.first_name} {form.last_name}
                </Text>
                {/* <Text style={styles.text}>A hands-on tasting experience in a winery’s Barrel Room is the perfect way to get up-close and personal with the winemaker.  Tasting wine from a barrel also gives you some understanding, and appreciation, for the transformation it will go through before making it to the bottle!” ~ Bruce and Pam Boring, Founders, The California Wine Club</Text> */}
              </View>

              <View style={{flex: 1, width: '90%', alignSelf: 'center'}}>
                <View style={{marginVertical: 10, justifyContent: 'center'}}>
                  <Text style={[styles.textTile, {color: 'gray'}]}>Email</Text>
                  <View>
                    <Text
                      style={{
                        fontFamily: sofiaFont,
                        fontSize: 15,
                        color: white,
                        width: '100%',
                        paddingVertical: 10,
                      }}>
                      {form.email}
                    </Text>
                  </View>
                </View>

                {/* <Button title="Choose from Library" onPress={this.handleImagePicker} />
                <Button title="Take a Photo" onPress={this.handleCameraPicker} />
                {this.selectedImage && <Button title="Crop Image" onPress={this.handleCropImage} />} */}
                {editable && (
                  <View
                    style={{
                      marginVertical: 10,
                      justifyContent: 'center',
                      width: '100%',
                    }}>
                    <Text style={[styles.textTile, {color: 'gray'}]}>
                      First name
                    </Text>
                    <View>
                      <TextInput
                        name="first_name"
                        placeholder="First name"
                        placeholderTextColor="lightgray"
                        value={form.first_name}
                        style={{
                          fontFamily: sofiaFont,
                          fontSize: 15,
                          color: white,
                        }}
                        onChangeText={this.handleChange.bind(
                          this,
                          'first_name',
                        )}
                      />
                    </View>
                    <View
                      style={{
                        backgroundColor: white,
                        height: 1,
                        width: '100%',
                      }}
                    />
                  </View>
                )}
                {editable && (
                  <View style={{marginVertical: 10, justifyContent: 'center'}}>
                    <Text style={[styles.textTile, {color: 'gray'}]}>
                      Last name
                    </Text>
                    <View>
                      <TextInput
                        name="last_name"
                        placeholder="Last name"
                        placeholderTextColor="lightgray"
                        value={form.last_name}
                        style={{
                          fontFamily: sofiaFont,
                          fontSize: 15,
                          color: white,
                        }}
                        onChangeText={this.handleChange.bind(this, 'last_name')}
                      />
                    </View>
                    <View
                      style={{
                        backgroundColor: white,
                        height: 1,
                        width: '100%',
                      }}
                    />
                  </View>
                )}

                <View style={{marginVertical: 10, justifyContent: 'center'}}>
                  <Text style={[styles.textTile, {color: 'gray'}]}>
                    Job Title
                  </Text>
                  {editable ? (
                    <View
                      style={[
                        {borderBottomWidth: 1, borderBottomColor: white},
                      ]}>
                      <TextInput
                        label="Job title"
                        name="job_title"
                        errors={errors}
                        value={form.job_title}
                        style={{
                          fontFamily: sofiaFont,
                          fontSize: 15,
                          color: white,
                        }}
                        onRef={ref => (this.job_title = ref)}
                        onChangeText={this.handleChange.bind(this, 'job_title')}
                        // onSubmitEditing={() => this.password.focus()}
                      />
                    </View>
                  ) : (
                    <View>
                      <Text
                        style={{
                          fontFamily: sofiaFont,
                          fontSize: 15,
                          color: white,
                          width: '100%',
                          paddingVertical: 10,
                        }}
                        numberOfLines={2}>
                        {!isEmpty(form.job_title)
                          ? form.job_title
                          : 'Job Title'}
                      </Text>
                    </View>
                  )}
                  {!isEmpty(errors) &&
                    errors.job_title &&
                    isEmpty(this.state.form.job_title) && (
                      <Text
                        style={{
                          fontFamily: sofiaFont,
                          fontSize: 10,
                          color: 'red',
                        }}>
                        {errors.job_title}
                      </Text>
                    )}
                </View>
                <View style={{marginVertical: 10, justifyContent: 'center'}}>
                  <Text style={[styles.textTile, {color: 'gray'}]}>
                    Company
                  </Text>
                  {editable ? (
                    <View
                      style={[
                        {borderBottomWidth: 1, borderBottomColor: white},
                      ]}>
                      <TextInput
                        label="Company"
                        name="company"
                        errors={errors}
                        value={form.company}
                        style={{
                          fontFamily: sofiaFont,
                          fontSize: 15,
                          color: white,
                        }}
                        onRef={ref => (this.company = ref)}
                        onChangeText={this.handleChange.bind(this, 'company')}
                        // onSubmitEditing={() => this.password.focus()}
                      />
                    </View>
                  ) : (
                    <View>
                      <Text
                        style={{
                          fontFamily: sofiaFont,
                          fontSize: 15,
                          color: white,
                          width: '100%',
                          paddingVertical: 10,
                        }}
                        numberOfLines={2}>
                        {!isEmpty(form.company) ? form.company : 'Company'}
                      </Text>
                    </View>
                  )}
                  {!isEmpty(errors) &&
                    errors.company &&
                    isEmpty(this.state.form.company) && (
                      <Text
                        style={{
                          fontFamily: sofiaFont,
                          fontSize: 10,
                          color: 'red',
                        }}>
                        {errors.company}
                      </Text>
                    )}
                </View>
              </View>

              {editable ? (
                this.state.loading ? (
                  <TouchableWithoutFeedback style={{width: '100%'}}>
                    <View style={[styles.button, {marginTop: 70}]}>
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
                      marginTop: 100,
                    }}
                    textsyles={{
                      fontFamily: sofiaFont,
                      color: '#fff',
                      fontSize: 12,
                    }}
                    onPress={this.onSave}
                  />
                )
              ) : (
                <View
                  style={{
                    alignItems: 'flex-end',
                    paddingVertical: 20,
                    paddingHorizontal: 10,
                  }}>
                  <TouchableOpacity
                    onPress={() =>
                      this.setState({editable: !this.state.editable})
                    }
                    style={{
                      height: 50,
                      width: 50,
                      borderRadius: 25,
                      backgroundColor: primaryTextColor,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    {/* <Icon
                      name="edit"
                      type="MaterialIcons"
                      style={{
                        fontFamily: sofiaFont,
                        color: white,
                        fontSize: 25,
                      }}
                    /> */}
                    <Image source={Images.EditIcon} />
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </ScrollView>
        )}
      </View>

      // <View>
      //   <Text>Hello</Text>
      // </View>
    );
  }
}

const styles = StyleSheet.create({
  headingtitle: {
    fontSize: 15,
    opacity: 0.6,
    marginVertical: 5,
    fontFamily: sofiaFont,
  },
  subtitle: {
    fontSize: 12,
    fontFamily: sofiaFont,
  },
  textheading: {
    color: white,
    fontSize: 25,
    fontFamily: sofiaFont,
  },
  textTile: {
    fontFamily: sofiaFont,
  },
  text: {
    color: white,
    fontSize: 14,
    paddingVertical: 5,
    textAlignVertical: 'top',
    fontFamily: sofiaFont,
  },
  view: {
    flex: 1,
    marginVertical: 1,
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 5,
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
});

const mapProps = state => ({
  user: state.root.user,
});

export default connect(mapProps, null)(Profile);
