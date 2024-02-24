import React, {Component} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import Header from '../../../component/Header/Header';
import {Toast} from 'native-base';
import Button from '../../../component/Common/Button';
import ModalSelector from 'react-native-modal-selector';
import TextInputs from '../../../component/Common/EditTextField';

import {
  white,
  secondryColor,
  primaryColor,
  error,
  sofiaFont,
  lineColor,
} from '../../../style/variables';
import {isEmpty, unset, set, isNull} from 'lodash';
// import TextInput from '../../../component/Common/EditTextField';
import {connect} from 'react-redux';
import http from '../../../http';
import Slider from 'react-native-smooth-slider';
// import Slider from '@react-native-community/slider';
import moment from 'moment';
const {width, height} = Dimensions.get('window');
import LinearGradient from 'react-native-linear-gradient';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import MultiSelect from 'react-native-multiple-select';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Images} from '../../../../theme/Images';
const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);
import Icon from 'react-native-vector-icons/MaterialIcons';
import {items} from '../../../assets/Data/data';
import {value} from 'react-native-extended-stylesheet';
import {ChooseWineModal} from '../../../component/ChoseMineModal/ChooseWineModal';

let data = ['1', '2', '3'];

const Shimmer = ({}) => {
  return (
    <View style={{width: '95%', alignSelf: 'center'}}>
      <ShimmerPlaceHolder
        style={{height: 30, width: '60%', borderRadius: 10, marginVertical: 10}}
      />
      <View
        style={[
          {
            height: 200,
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: 5,
            marginBottom: 20,
          },
        ]}>
        <View style={{justifyContent: 'center'}}>
          <ShimmerPlaceHolder
            style={{
              height: 20,
              width: '60%',
              borderRadius: 10,
              marginVertical: 10,
            }}
          />
          <ShimmerPlaceHolder
            style={{
              height: 20,
              width: '70%',
              borderRadius: 10,
              marginVertical: 10,
            }}
          />
          <ShimmerPlaceHolder
            style={{
              height: 20,
              width: '80%',
              borderRadius: 10,
              marginVertical: 10,
            }}
          />
          <ShimmerPlaceHolder
            style={{
              height: 20,
              width: '90%',
              borderRadius: 10,
              marginVertical: 10,
            }}
          />
        </View>
        <View
          style={{
            flexDirection: 'column',
            width: '30%',
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <ShimmerPlaceHolder
            style={{height: 100, width: '100%', marginTop: 20, borderRadius: 5}}
          />
        </View>
      </View>
      <ShimmerPlaceHolder
        style={{height: 20, width: '40%', borderRadius: 10, marginVertical: 10}}
      />
      <ShimmerPlaceHolder
        style={{
          height: 20,
          width: '90%',
          borderRadius: 10,
          marginVertical: 10,
          marginBottom: 20,
        }}
      />

      <ShimmerPlaceHolder
        style={{height: 20, width: '40%', borderRadius: 10, marginVertical: 10}}
      />
      <ShimmerPlaceHolder
        style={{
          height: 20,
          width: '90%',
          borderRadius: 10,
          marginVertical: 10,
          marginBottom: 20,
        }}
      />

      <ShimmerPlaceHolder
        style={{height: 20, width: '40%', borderRadius: 10, marginVertical: 10}}
      />
      <ShimmerPlaceHolder
        style={{
          height: 20,
          width: '90%',
          borderRadius: 10,
          marginVertical: 10,
          marginBottom: 20,
        }}
      />

      <ShimmerPlaceHolder
        style={{height: 20, width: '40%', borderRadius: 10, marginVertical: 10}}
      />
      <ShimmerPlaceHolder
        style={{
          height: 20,
          width: '90%',
          borderRadius: 10,
          marginVertical: 10,
          marginBottom: 20,
        }}
      />

      <ShimmerPlaceHolder
        style={{height: 20, width: '40%', borderRadius: 10, marginVertical: 10}}
      />
      <ShimmerPlaceHolder
        style={{
          height: 20,
          width: '90%',
          borderRadius: 10,
          marginVertical: 10,
          marginBottom: 20,
        }}
      />

      <ShimmerPlaceHolder
        style={{height: 20, width: '40%', borderRadius: 10, marginVertical: 10}}
      />
      <ShimmerPlaceHolder
        style={{
          height: 20,
          width: '90%',
          borderRadius: 10,
          marginVertical: 10,
          marginBottom: 20,
        }}
      />
    </View>
  );
};

class ChooseProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFromAdditional: false,
      form: {},
      data: data,
      Testing: {},
      showToast: false,
      modalVisible: false,
      visible: false,
      refreshing: false,
      loading: false,
      min: 0,
      max: 1,
      errors: {},
      slideValue: '',
      eventTesting: {},
      selectedItems: [],
      index: 0,
      textInputIntensityValue: '',
      textInputAcidityValue: '',
      textInputTanninnValue: '',
      textInputBodyValue: '',
      textInputSweetnessValue: '',
      textInputComplexityValue: '',
      textInputBalanceValue: '',
      textInputMaturityValue: '',
      textInputFinishValue: '',
      textInputlistingCandidateValue: '',
      textInputdescriptionValue: '',
      open: false,
      value: null,
      items: items,
    };
    this.setValue = this.setValue.bind(this);
  }

  componentDidMount() {
    if (this.props.route.params) {
      this.setState({
        isFromAdditional: this.props.route.params.isFromAdditional,
      });
      const Testing = this.props.route.params.Testing;
      const eventTesting = this.props.route.params.event;
      if (eventTesting) {
        this.setState({eventTesting});
      }
      this.setState({Testing}, () => this.Store());
    }
    this.setState(prevState => ({index: prevState.index + 1}));
  }

  Store() {
    const {Testing} = this.state;
    this.setState({loading: true});
    http
      .post('sommelier/myrating', {
        event_id: Testing.event_id,
        product_id: Testing.product_id,
      })
      .then(res => {
        if (res.data) {
          this.setState({
            form: {...this.state.form, ...res.data},
            selectedItems: res.data.flavours,
          });
        }
        this.setState({loading: false, refreshing: false});
      })
      .catch(err => {
        console.log('ERROR on Rating', err);
        this.setState({loading: false, refreshing: false});
        if (err.status.data.code == 422) {
          Toast.show({
            text: `${err.status.data.message}`,
            buttonText: 'Ok',
            duration: 2000,
          });
        }
      });
  }

  validate = () => {
    let errors = {};
    const {form} = this.state;
    if (isEmpty(form.intensity)) {
      set(errors, 'intensity', ['Intensity is required']);
    }
    if (isEmpty(form.acidity)) {
      set(errors, 'acidity', ['Acidity is required']);
    }
    if (isEmpty(form.tannin)) {
      set(errors, 'tannin', ['Tannin is required']);
    }
    if (isEmpty(form.body)) {
      set(errors, 'body', ['Body is required']);
    }
    if (isEmpty(form.sweetness)) {
      set(errors, 'sweetness', ['Sweetness is required']);
    }
    if (isEmpty(form.complexity)) {
      set(errors, 'complexity', ['Complexity is required']);
    }
    if (isEmpty(form.balance)) {
      set(errors, 'balance', ['Balance is required']);
    }
    if (isEmpty(form.maturity)) {
      set(errors, 'maturity', ['Maturity is required']);
    }
    if (isEmpty(form.finish) && isNaN(form.finish)) {
      set(errors, 'finish', ['Finish is required']);
    }
    if (isEmpty(form.listing_candidate)) {
      set(errors, 'listing_candidate', ['Listing Candidate is required']);
    }
    if (isEmpty(form.overall) && isNaN(form.overall)) {
      set(errors, 'overall', ['Score is required']);
    }
    return errors;
  };

  onSave = async () => {
    const {form, Testing, selectedItems} = this.state;
    console.log('formmm', this.multiSelect, selectedItems);

    let errors = this.validate();
    if (!isEmpty(errors)) {
      return this.setState({errors}, () =>
        console.log('Erroronval', this.state.errors),
      );
    }

    (form.event_id = Testing.event_id),
      (form.product_id = Testing.product_id),
      (form.overall = parseInt(form.overall));
    form.flavours = this.state.selectedItems;
    form.alcohol = '25';
    const stringdata = this.state.selectedItems.toString();
    console.log('stringdaat', stringdata);
    console.log('this.Forrrrmm', form);
    this.setState({loading: true});
    http
      .post('sommelier/rating', form)
      .then(res => {
        // console.log('response Ratings..', res);
        this.setState({loading: false, refreshing: false}, () =>
          Toast.show({
            text: `${res.message}`,
            buttonText: 'Ok',
            duration: 2000,
          }),
        );
        setTimeout(() => this.props.navigation.goBack(), 2000);
      })
      .catch(err => {
        console.log('ERROR on Rating', err);
        if (err.status.data.code == 422) {
          Toast.show({
            text: `${err.status.data.message}`,
            buttonText: 'Ok',
            duration: 2000,
          });
        }
        let errors = {};
        if (err && err.status.data.code == 422) {
          errors = err.status.data.errors;
          // Toast.show({
          //     text: `${err.status.data.errors.color}`,
          //     buttonText: 'Ok',
          //     duration: 2000,
          // })
          // Toast.show({
          //     text: `${err.status.data.errors.nose}`,
          //     buttonText: 'Ok',
          //     duration: 2000,
          // })
          // Toast.show({
          //     text: `${err.status.data.errors.taste}`,
          //     buttonText: 'Ok',
          //     duration: 2000,
          // })
          // Toast.show({
          //     text: `${err.status.data.errors.finish}`,
          //     buttonText: 'Ok',
          //     duration: 2000,
          // })
        }
        this.setState({loading: false, errors, refreshing: false});
      });
    // }
  };

  color = () => {
    return (
      <View style={{flex: 1, backgroundColor: 'red'}}>
        <Text>12</Text>
      </View>
    );
  };
  handleChange(value, name) {
    console.log('This is value', value);
    console.log('This is name', name);
    let form = {...this.state.form};
    form[name] = value;
    this.setState({form});
  }

  onSelectedItemsChange = selectedItems => {
    this.setState({selectedItems});
  };
  handleTextInputChange = (text, name) => {
    if (name == 'intensity') {
      this.setState({textInputIntensityValue: text});
    }
    if (name == 'acidity') {
      this.setState({textInputAcidityValue: text});
    }
    if (name == 'tannin') {
      this.setState({textInputTanninnValue: text});
    }
    if (name == 'body') {
      this.setState({textInputBodyValue: text});
    }
    if (name == 'sweetness') {
      this.setState({textInputSweetnessValue: text});
    }
    if (name == 'complexity') {
      this.setState({textInputComplexityValue: text});
    }
    if (name == 'balance') {
      this.setState({textInputBalanceValue: text});
    }
    if (name == 'maturity') {
      this.setState({textInputMaturityValue: text});
    }
    if (name == 'finish') {
      this.setState({textInputFinishValue: text});
    }
    if (name == 'listing_candidate') {
      this.setState({textInputlistingCandidateValue: text});
    }
    if (name == 'description') {
      this.setState({textInputdescriptionValue: text});
    }
  };
  setOpen(open) {
    this.setState({
      open,
    });
  }

  IconRenderer = ({items}) => {
    const Icon = () => (
      <Image source={items.icon} style={{width: 20, height: 20}} />
    );
    return Icon;
  };
  setValue(callback) {
    this.setState(state => ({
      value: callback(state.value),
    }));
  }

  setItems(callback) {
    this.setState(state => ({
      items: callback(state.items),
    }));
  }
  render() {
    const {errors, form, Testing, items} = this.state;
    console.log('Testing now', Testing.product);
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: white,
        }}>
        <Header
          navigation={this.props.navigation}
          iconColor={primaryColor}
          iconProps={Images.BackNavigationIcon}
          onPress={() => this.props.navigation.goBack()}
          image={require('../../../assets/blueLogo.png')}
        />
        {isEmpty(Testing) || (isEmpty(form) && this.state.loading) ? (
          <Shimmer />
        ) : (
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{marginHorizontal: 5}}>
              <View
                style={[
                  styles.view,
                  {flexDirection: 'row', marginHorizontal: 5},
                ]}>
                <View style={{flexDirection: 'column', flex: 0.7}}>
                  <View style={{marginVertical: 5}}>
                    <Text style={[styles.textheading, {fontWeight: '700'}]}>
                      {Testing.product
                        ? Testing.product.title
                        : Testing.products.title}
                    </Text>
                    {/* <Text style={{ fontSize: 15, color: primaryColor }}>Flavours ,Sugar, Sulfur,Dioxide,Potessium Grap Juice Concerntrate</Text> */}
                  </View>

                  <View style={{marginVertical: 5}}>
                    <Text style={{color: 'gray', fontFamily: sofiaFont}}>
                      Producer
                    </Text>
                    <Text
                      style={{
                        fontFamily: sofiaFont,
                        fontSize: 20,
                        fontWeight: '500',
                        color: primaryColor,
                      }}>
                      {Testing.product
                        ? Testing.product.producer
                        : Testing.products.produer}
                    </Text>
                  </View>

                  <View style={{marginVertical: 5}}>
                    <Text style={{color: 'gray', fontFamily: sofiaFont}}>
                      Year
                    </Text>
                    <Text
                      style={{
                        fontFamily: sofiaFont,
                        fontSize: 20,
                        fontWeight: '500',
                        color: primaryColor,
                      }}>
                      {Testing.product
                        ? Testing.product.year
                        : Testing.products.year}
                    </Text>
                  </View>

                  <View style={{marginVertical: 5}}>
                    <Text style={{color: 'gray', fontFamily: sofiaFont}}>
                      Alcohol
                    </Text>
                    <Text
                      style={{
                        fontFamily: sofiaFont,
                        fontSize: 20,
                        fontWeight: '500',
                        color: primaryColor,
                      }}>
                      {Testing.product
                        ? Testing.product.alcohol
                        : Testing.products.alcohol}
                    </Text>
                  </View>

                  {/* {!isEmpty(eventTesting) && eventTesting.is_started == 1 &&  */}

                  {!isEmpty(form.event) &&
                    form.event.is_started == 1 &&
                    this.state.isFromAdditional && (
                      <View style={{marginVertical: 5}}>
                        <Text style={{color: 'gray', fontFamily: sofiaFont}}>
                          Tasted on
                        </Text>
                        <Text
                          style={{
                            fontSize: 20,
                            fontWeight: '500',
                            fontFamily: sofiaFont,
                            color: primaryColor,
                          }}>
                          {moment(form.created_at).format('DD MMM,YYYY')}
                        </Text>
                      </View>
                    )}
                </View>

                <View
                  style={{
                    flexDirection: 'column',
                    flex: 0.3,
                    justifyContent: 'center',
                  }}>
                  <Image
                    style={{
                      height: '100%',
                      width: '100%',
                      marginTop: 20,
                      borderRadius: 5,
                    }}
                    resizeMode="contain"
                    source={{
                      uri: Testing.product
                        ? Testing.product.Imagesrc
                        : Testing.products.Imagesrc,
                    }}
                  />
                </View>
              </View>

              <View style={[styles.view, {marginHorizontal: 5}]}>
                <View>
                  <Text style={[styles.textheading, {fontSize: 18}]}>
                    Ratings
                  </Text>
                </View>
                <View style={[styles.pickerView, {marginTop: 20}]}>
                  <Text style={styles.pickerText}>Intensity</Text>
                  <View style={styles.pickerstyle}>
                    {isEmpty(form.event) ? (
                      <ModalSelector
                        data={[
                          {key: this.state.index++, label: 'Low'},
                          {key: this.state.index++, label: 'Medium'},
                          {key: this.state.index++, label: 'High'},
                        ]}
                        optionStyle={{
                          borderBottomWidth: 0,
                          alignItems: 'flex-start',
                          justifyContent: 'flex-start',
                        }}
                        initValueTextStyle={{color: 'red'}}
                        optionTextStyle={{color: 'black'}}
                        initValue="Select"
                        onChange={option => {
                          this.handleChange(
                            option.label,
                            'intensity',
                            option.key,
                          );

                          this.handleTextInputChange(option.label, 'intensity');
                        }}>
                        <TextInput
                          style={{
                            // borderBottomWidth: 1,
                            borderColor: '#ccc',
                            padding: 10,
                            height: 50,
                            color: primaryColor,
                          }}
                          editable={false}
                          placeholder="Select"
                          value={this.state.textInputIntensityValue}
                        />
                      </ModalSelector>
                    ) : (
                      <Text style={styles.SimpleText}>
                        {this.state.form.acidity}
                      </Text>
                    )}
                  </View>
                  {!isEmpty(errors) && errors.intensity && !form.intensity && (
                    <Text
                      style={{
                        fontFamily: sofiaFont,
                        fontSize: 12,
                        color: error,
                      }}>
                      {errors.intensity}
                    </Text>
                  )}
                </View>

                {/* <ChooseWineModal
                isEmpty={isEmpty(form.event)}

                /> */}

                <View style={styles.pickerView}>
                  <View style={styles.pickerView}>
                    <Text style={styles.pickerText}>Acidity</Text>
                    <View style={styles.pickerstyle}>
                      {isEmpty(form.event) ? (
                        <ModalSelector
                          data={[
                            {key: this.state.index++, label: 'Low'},
                            {key: this.state.index++, label: 'Medium'},
                            {key: this.state.index++, label: 'High'},
                          ]}
                          optionStyle={{
                            borderBottomWidth: 0,
                            alignItems: 'flex-start',
                            justifyContent: 'flex-start',
                          }}
                          initValueTextStyle={{color: 'red'}}
                          optionTextStyle={{color: 'black'}}
                          initValue="Select"
                          onChange={option => {
                            this.handleChange(
                              option.label,
                              'acidity',
                              option.key,
                            );
                            this.handleTextInputChange(option.label, 'acidity');
                          }}>
                          <TextInput
                            style={{
                              // borderBottomWidth: 1,
                              borderColor: '#ccc',
                              padding: 10,
                              height: 50,
                              color: primaryColor,
                            }}
                            editable={false}
                            placeholder="Select"
                            value={this.state.textInputAcidityValue}
                          />
                        </ModalSelector>
                      ) : (
                        <Text style={styles.SimpleText}>
                          {this.state.form.acidity}
                        </Text>
                      )}
                    </View>
                    {!isEmpty(errors) && errors.acidity && !form.acidity && (
                      <Text
                        style={{
                          fontFamily: sofiaFont,
                          fontSize: 12,
                          color: error,
                        }}>
                        {errors.acidity}
                      </Text>
                    )}
                  </View>

                  <View style={styles.pickerView}>
                    <Text style={styles.pickerText}>Tannin</Text>
                    <View style={styles.pickerstyle}>
                      {isEmpty(form.event) ? (
                        <ModalSelector
                          data={[
                            {key: this.state.index++, label: 'Low'},
                            {key: this.state.index++, label: 'Medium'},
                            {key: this.state.index++, label: 'High'},
                          ]}
                          optionStyle={{
                            borderBottomWidth: 0,
                            alignItems: 'flex-start',
                            justifyContent: 'flex-start',
                          }}
                          initValueTextStyle={{color: 'red'}}
                          optionTextStyle={{color: 'black'}}
                          initValue="Select"
                          onChange={option => {
                            this.handleChange(
                              option.label,
                              'tannin',
                              option.key,
                            );
                            this.handleTextInputChange(option.label, 'tannin');
                          }}>
                          <TextInput
                            style={{
                              // borderBottomWidth: 1,
                              borderColor: '#ccc',
                              padding: 10,
                              height: 50,
                              color: primaryColor,
                            }}
                            editable={false}
                            placeholder="Select"
                            value={this.state.textInputTanninnValue}
                          />
                        </ModalSelector>
                      ) : (
                        <Text style={styles.SimpleText}>
                          {this.state.form.tannin}
                        </Text>
                      )}
                    </View>
                    {!isEmpty(errors) && errors.tannin && !form.tannin && (
                      <Text
                        style={{
                          fontFamily: sofiaFont,
                          fontSize: 12,
                          color: error,
                        }}>
                        {errors.tannin}
                      </Text>
                    )}
                  </View>

                  <View style={styles.pickerView}>
                    <Text style={styles.pickerText}>Body</Text>
                    <View style={styles.pickerstyle}>
                      {isEmpty(form.event) ? (
                        <ModalSelector
                          data={[
                            {key: this.state.index++, label: 'Light'},
                            {key: this.state.index++, label: 'Medium'},
                            {key: this.state.index++, label: 'Full'},
                          ]}
                          optionStyle={{
                            borderBottomWidth: 0,
                            alignItems: 'flex-start',
                            justifyContent: 'flex-start',
                          }}
                          initValueTextStyle={{color: 'red'}}
                          optionTextStyle={{color: 'black'}}
                          initValue="Select"
                          onChange={option => {
                            this.handleChange(option.label, 'body', option.key);
                            this.handleTextInputChange(option.label, 'body');
                          }}>
                          <TextInput
                            style={{
                              // borderBottomWidth: 1,
                              borderColor: '#ccc',
                              padding: 10,
                              height: 50,
                              color: primaryColor,
                            }}
                            editable={false}
                            placeholder="Select"
                            value={this.state.textInputBodyValue}
                          />
                        </ModalSelector>
                      ) : (
                        <Text style={styles.SimpleText}>
                          {this.state.form.body}
                        </Text>
                      )}
                    </View>
                    {!isEmpty(errors) && errors.body && !form.body && (
                      <Text
                        style={{
                          fontFamily: sofiaFont,
                          fontSize: 12,
                          color: error,
                        }}>
                        {errors.body}
                      </Text>
                    )}
                  </View>

                  <View style={styles.pickerView}>
                    <Text style={styles.pickerText}>Sweetness</Text>
                    <View style={styles.pickerstyle}>
                      {isEmpty(form.event) ? (
                        <ModalSelector
                          data={[
                            {key: this.state.index++, label: 'Dry'},
                            {key: this.state.index++, label: 'Off-Dry'},
                            {key: this.state.index++, label: 'Sweet'},
                            {key: this.state.index++, label: 'Luscious'},
                          ]}
                          optionStyle={{
                            borderBottomWidth: 0,
                            alignItems: 'flex-start',
                            justifyContent: 'flex-start',
                          }}
                          initValueTextStyle={{color: 'red'}}
                          optionTextStyle={{color: 'black'}}
                          initValue="Select"
                          onChange={option => {
                            this.handleChange(
                              option.label,
                              'sweetness',
                              option.key,
                            );
                            this.handleTextInputChange(
                              option.label,
                              'sweetness',
                            );
                          }}>
                          <TextInput
                            style={{
                              // borderBottomWidth: 1,
                              borderColor: '#ccc',
                              padding: 10,
                              height: 50,
                              color: primaryColor,
                            }}
                            optionStyle={{
                              borderBottomWidth: 0,
                              alignItems: 'flex-start',
                              justifyContent: 'flex-start',
                            }}
                            initValueTextStyle={{color: 'red'}}
                            optionTextStyle={{color: 'black'}}
                            editable={false}
                            placeholder="Select"
                            value={this.state.textInputSweetnessValue}
                          />
                        </ModalSelector>
                      ) : (
                        <Text style={styles.SimpleText}>
                          {this.state.form.sweetness}
                        </Text>
                      )}
                    </View>
                    {!isEmpty(errors) &&
                      errors.sweetness &&
                      !form.sweetness && (
                        <Text
                          style={{
                            fontFamily: sofiaFont,
                            fontSize: 12,
                            color: error,
                          }}>
                          {errors.sweetness}
                        </Text>
                      )}
                  </View>

                  <View style={styles.pickerView}>
                    <Text style={styles.pickerText}>Complexity</Text>
                    <View style={styles.pickerstyle}>
                      {isEmpty(form.event) ? (
                        <ModalSelector
                          data={[
                            {key: this.state.index++, label: 'Low'},
                            {key: this.state.index++, label: 'Medium'},
                            {key: this.state.index++, label: 'High'},
                          ]}
                          optionStyle={{
                            borderBottomWidth: 0,
                            alignItems: 'flex-start',
                            justifyContent: 'flex-start',
                          }}
                          initValueTextStyle={{color: 'red'}}
                          optionTextStyle={{color: 'black'}}
                          initValue="Select"
                          onChange={option => {
                            this.handleChange(
                              option.label,
                              'complexity',
                              option.key,
                            );
                            this.handleTextInputChange(
                              option.label,
                              'complexity',
                            );
                          }}>
                          <TextInput
                            style={{
                              borderBottomWidth: 1,
                              borderColor: '#ccc',
                              padding: 10,
                              height: 50,
                              color: primaryColor,
                            }}
                            editable={false}
                            placeholder="Select"
                            value={this.state.textInputComplexityValue}
                          />
                        </ModalSelector>
                      ) : (
                        <Text style={styles.SimpleText}>
                          {this.state.form.complexity}
                        </Text>
                      )}
                    </View>
                    {!isEmpty(errors) &&
                      errors.complexity &&
                      !form.complexity && (
                        <Text
                          style={{
                            fontFamily: sofiaFont,
                            fontSize: 12,
                            color: error,
                          }}>
                          {errors.complexity}
                        </Text>
                      )}
                  </View>

                  <View style={styles.pickerView}>
                    <Text style={styles.pickerText}>Balance</Text>
                    <View style={styles.pickerstyle}>
                      {isEmpty(form.event) ? (
                        <ModalSelector
                          data={[
                            {key: this.state.index++, label: 'Low'},
                            {key: this.state.index++, label: 'Medium'},
                            {key: this.state.index++, label: 'High'},
                          ]}
                          optionStyle={{
                            borderBottomWidth: 0,
                            alignItems: 'flex-start',
                            justifyContent: 'flex-start',
                          }}
                          initValueTextStyle={{color: 'red'}}
                          optionTextStyle={{color: 'black'}}
                          initValue="Select"
                          onChange={option => {
                            this.handleChange(
                              option.label,
                              'balance',
                              option.key,
                            );
                            this.handleTextInputChange(option.label, 'balance');
                          }}>
                          <TextInput
                            style={{
                              borderBottomWidth: 1,
                              borderColor: '#ccc',
                              padding: 10,
                              height: 50,
                              color: primaryColor,
                            }}
                            editable={false}
                            placeholder="Select"
                            value={this.state.textInputBalanceValue}
                          />
                        </ModalSelector>
                      ) : (
                        <Text style={styles.SimpleText}>
                          {this.state.form.balance}
                        </Text>
                      )}
                    </View>
                    {!isEmpty(errors) && errors.balance && !form.balance && (
                      <Text
                        style={{
                          fontFamily: sofiaFont,
                          fontSize: 12,
                          color: error,
                        }}>
                        {errors.balance}
                      </Text>
                    )}
                  </View>

                  <View style={styles.pickerView}>
                    <Text style={styles.pickerText}>Maturity</Text>
                    <View style={styles.pickerstyle}>
                      {isEmpty(form.event) ? (
                        <ModalSelector
                          data={[
                            {key: this.state.index++, label: 'Tired'},
                            {key: this.state.index++, label: 'Too Young'},
                            {key: this.state.index++, label: 'Ready to drink'},
                            {
                              key: this.state.index++,
                              label: 'Ready to drink - can age',
                            },
                          ]}
                          optionStyle={{
                            borderBottomWidth: 0,
                            alignItems: 'flex-start',
                            justifyContent: 'flex-start',
                          }}
                          initValueTextStyle={{color: 'red'}}
                          optionTextStyle={{color: 'black'}}
                          initValue="Select"
                          onChange={option => {
                            this.handleChange(
                              option.label,
                              'maturity',
                              option.key,
                            );
                            this.handleTextInputChange(
                              option.label,
                              'maturity',
                            );
                          }}>
                          <TextInput
                            style={{
                              borderBottomWidth: 1,
                              borderColor: '#ccc',
                              padding: 10,
                              height: 50,
                              color: primaryColor,
                            }}
                            editable={false}
                            placeholder="Select"
                            value={this.state.textInputMaturityValue}
                          />
                        </ModalSelector>
                      ) : (
                        <Text style={styles.SimpleText}>
                          {this.state.form.maturity}
                        </Text>
                      )}
                    </View>
                    {!isEmpty(errors) && errors.maturity && !form.maturity && (
                      <Text
                        style={{
                          fontFamily: sofiaFont,
                          fontSize: 12,
                          color: error,
                        }}>
                        {errors.maturity}
                      </Text>
                    )}
                  </View>

                  <View style={styles.pickerView}>
                    <Text style={styles.pickerText}>Finish</Text>
                    <View style={styles.pickerstyle}>
                      {isEmpty(form.event) ? (
                        <ModalSelector
                          data={[
                            {key: this.state.index++, label: 'Short'},
                            {key: this.state.index++, label: 'Medium'},
                            {key: this.state.index++, label: 'Long'},
                          ]}
                          optionStyle={{
                            borderBottomWidth: 0,
                            alignItems: 'flex-start',
                            justifyContent: 'flex-start',
                          }}
                          initValueTextStyle={{color: 'red'}}
                          optionTextStyle={{color: 'black'}}
                          initValue="Select"
                          onChange={option => {
                            this.handleChange(
                              option.label,
                              'finish',
                              option.key,
                            );
                            this.handleTextInputChange(option.label, 'finish');
                          }}>
                          <TextInput
                            style={{
                              borderBottomWidth: 1,
                              borderColor: '#ccc',
                              padding: 10,
                              color: primaryColor,
                              height: 50,
                            }}
                            editable={false}
                            placeholder="Select"
                            value={this.state.textInputFinishValue}
                          />
                        </ModalSelector>
                      ) : (
                        <Text style={styles.SimpleText}>
                          {this.state.form.finish}
                        </Text>
                      )}
                    </View>
                    {!isEmpty(errors) && errors.finish && !form.finish && (
                      <Text
                        style={{
                          fontFamily: sofiaFont,
                          fontSize: 12,
                          color: error,
                        }}>
                        {errors.finish}
                      </Text>
                    )}
                  </View>

                  <View style={styles.pickerView}>
                    <Text style={styles.pickerText}>Listing Candidate</Text>
                    <View style={styles.pickerstyle}>
                      {isEmpty(form.event) ? (
                        <ModalSelector
                          data={[
                            {key: this.state.index++, label: 'By the glass'},
                            {key: this.state.index++, label: 'By the bottle'},
                          ]}
                          optionStyle={{
                            borderBottomWidth: 0,
                            alignItems: 'flex-start',
                            justifyContent: 'flex-start',
                          }}
                          initValueTextStyle={{color: 'red'}}
                          optionTextStyle={{color: 'black'}}
                          initValue="Select"
                          onChange={option => {
                            this.handleChange(
                              option.label,
                              'listing_candidate',
                              option.key,
                            );
                            this.handleTextInputChange(
                              option.label,
                              'listing_candidate',
                            );
                          }}>
                          <TextInput
                            style={{
                              borderBottomWidth: 1,
                              borderColor: '#ccc',
                              padding: 10,
                              height: 50,
                              color: primaryColor,
                            }}
                            editable={false}
                            placeholder="Select"
                            value={this.state.textInputlistingCandidateValue}
                          />
                        </ModalSelector>
                      ) : (
                        <Text style={styles.SimpleText}>
                          {this.state.form.listing_candidate}
                        </Text>
                      )}
                    </View>
                    {!isEmpty(errors) &&
                      errors.listing_candidate &&
                      !form.listing_candidate && (
                        <Text
                          style={{
                            fontFamily: sofiaFont,
                            fontSize: 12,
                            color: error,
                          }}>
                          {errors.listing_candidate}
                        </Text>
                      )}
                  </View>
                </View>

                <View style={{marginHorizontal: 5, marginVertical: 5}}>
                  <Text style={{color: 'gray'}}>
                    Score{' '}
                    {
                      <Text>
                        (
                        {!isNull(this.state.form.overall) &&
                        this.state.form.overall !== undefined
                          ? parseInt(this.state.form.overall)
                          : 0}
                        )
                      </Text>
                    }
                  </Text>
                  <Slider
                    style={{width: '100%', height: 50}}
                    name="overall"
                    minimumValue={0}
                    maximumValue={10}
                    useNativeDriver={true}
                    maximumTrackTintColor="lightgray"
                    minimumTrackTintColor={'skyblue'}
                    thumbStyle={[styles.thumb]}
                    animateTransitions={true}
                    value={this.state.form.overall}
                    disabled={!isEmpty(form.event) ? true : false}
                    // onValueChange={this.handleChange(this, 'overall')}
                    onValueChange={option => {
                      // alert(`${option.label} (${option.key}) nom nom nom`);
                      this.handleChange(option, 'overall');
                    }}
                    onSlidingComplete={value =>
                      this.setState({...this.state.form, overall: value})
                    }
                  />
                  {!isEmpty(errors) && errors.overall && !form.overall && (
                    <Text
                      style={{
                        fontFamily: sofiaFont,
                        fontSize: 12,
                        color: error,
                      }}>
                      {errors.overall}
                    </Text>
                  )}
                </View>
              </View>
              <View style={{flex: 1, marginBottom: 10}}>
                {isEmpty(form.event) ? (
                  <SectionedMultiSelect
                    items={items}
                    IconRenderer={this.IconRenderer}
                    styles={{button: {backgroundColor: primaryColor}}}
                    uniqueKey="name"
                    subKey="children"
                    selectText="Select Flavours"
                    showDropDowns={true}
                    searchPlaceholderText="Choose Flavour..."
                    readOnlyHeadings={true}
                    onSelectedItemsChange={this.onSelectedItemsChange}
                    selectedItems={this.state.selectedItems}
                  />
                ) : (
                  <>
                    {!isNull(form.flavours) && (
                      <View>
                        <Text
                          style={{
                            color: 'gray',
                            fontFamily: sofiaFont,
                            marginVertical: 10,
                            marginHorizontal: 15,
                          }}>
                          Flavours
                        </Text>
                        <Text style={styles.SimpleText}>
                          {!isNull(form.flavours)
                            ? form.flavours.map(item => item).join(', ')
                            : ''}
                        </Text>
                      </View>
                    )}
                  </>
                )}
              </View>

              <View style={[styles.view, {marginHorizontal: 5}]}>
                {isEmpty(form.event) ? (
                  <>
                    <View>
                      <Text
                        style={[
                          styles.textheading,
                          {
                            // borderBottomWidth:1,
                            fontSize: 18,
                            borderBottomColor: 'red',
                            padding: 10,
                            height: 50,
                            color: primaryColor,
                          },
                        ]}>
                        Additional Notes
                      </Text>
                    </View>
                    <TextInput
                      label="Description"
                      name="description"
                      errors={errors}
                      editable={isEmpty(form.event) ? true : false}
                      multiline={true}
                      value={this.state.textInputdescriptionValue}
                      // Textcolor={'red'}
                      onRef={ref => (this.description = ref)}
                      // placeholderTextColor='green'
                      onChangeText={value => {
                        this.handleChange(value, 'description');
                        this.handleTextInputChange(value, 'description');
                      }}
                      style={{
                        borderBottomWidth: 0.5,
                        borderColor: 'gray',
                        padding: 10,
                        // height: 30,
                        color: primaryColor,
                      }}
                    />
                  </>
                ) : (<Text style={styles.SimpleText}>
                    {this.state.form.description}
                  </Text>
                )}

                <TouchableOpacity
                  activeOpacity={1}
                  style={{
                    paddingVertical: 10,
                    width: '100%',
                    alignSelf: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                  }}
                  onPress={() =>
                    !isEmpty(form.event)
                      ? null
                      : this.setState({
                          form: {
                            ...this.state.form,
                            is_favourite: !this.state.form.is_favourite,
                          },
                        })
                  }>
                  <Image
                    source={
                      !isEmpty(form) && form.is_favourite == 1
                        ? Images.FavouriteSelectedIcon
                        : Images.HeartIcon
                    }
                    style={{
                      height: 20,
                      width: 20,
                      color:
                        !isEmpty(form) && form.is_favourite == 1
                          ? primaryColor
                          : 'gray',
                    }}
                    tintColor={primaryColor}
                  />
                  <Text style={{color: primaryColor, paddingHorizontal: 10}}>
                    Favourite
                  </Text>
                </TouchableOpacity>
                {isEmpty(form.event) && (
                  <View>
                    {this.state.loading ? (
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
                    )}
                  </View>
                )}
              </View>
            </View>
          </ScrollView>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  thumb: {
    width: 20,
    height: 20,
    borderColor: 'black',
    borderWidth: 1,
    backgroundColor: 'white',
  },
  pickerView: {
    marginVertical: 5,
  },
  pickerItem: {
    color: primaryColor,
    fontFamily: sofiaFont,
  },
  pickerText: {color: 'grey', fontFamily: sofiaFont},
  track: {
    height: 20,
    width: 20,
    color: 'green',
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20,
  },
  pickerstyle: {
    height: 50,
    width: '100%',
    justifyContent: 'center',
    borderBottomColor: lineColor,
    borderBottomWidth: 1,
    borderRadius: 5,
  },
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
    color: primaryColor,
    fontSize: 25,
    fontFamily: sofiaFont,
  },
  text: {
    color: primaryColor,
    fontSize: 14,
    fontFamily: sofiaFont,
  },
  view: {
    flex: 1,
    marginVertical: 1,
    backgroundColor: white,
    // elevation: 1,
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
  SimpleText: {
    color: primaryColor,
    fontFamily: sofiaFont,
    fontSize: 16,
    textTransform: 'capitalize',
    marginHorizontal: 15,
  },
});

const mapProps = state => ({
  user: state.root.user,
});

export default connect(mapProps, null)(ChooseProduct);
