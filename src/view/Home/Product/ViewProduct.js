import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Header from '../../../component/Header/Header';
import {Icon, Toast} from 'native-base';
import {
  white,
  secondryColor,
  primaryColor,
  black,
  sofiaFont,
} from '../../../style/variables';
import {isEmpty, unset, isNull} from 'lodash';
import TextInput from '../../../component/Common/EditTextField';
import {connect} from 'react-redux';
import http from '../../../http';
import Slider from 'react-native-smooth-slider';
// import Slider from '@react-native-community/slider';
const {width, height} = Dimensions.get('window');

let data = ['1', '2', '3'];

class ViewProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {},
      data: data,
      Testing: {},
      modalVisible: false,
      visible: false,
      refreshing: false,
      min: 0,
      max: 1,
      errors: {},
      slideValue: '',
      is_favourite: 0,
    };
  }

  componentDidMount() {
    const Testing = this.props.route.params.Testing;
    console.log('Testinge', Testing);
    this.setState({Testing}, () => this.Store());
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
        console.log('response MYRatings..***', res);
        if (res.data) {
          this.setState({form: {...this.state.form, ...res.data}});
        }
        this.setState({loading: false, refreshing: false});
        // this.setState({ loading: false, refreshing: false }, () =>
        //     Toast.show({
        //         text: `${res.message}`,
        //         buttonText: 'Ok',
        //         duration: 2000,
        //     }))
        // setTimeout(() => this.props.navigation.goBack(), 2000)
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

  color = () => {
    return (
      <View style={{flex: 1, backgroundColor: 'red'}}>
        <Text>12</Text>
      </View>
    );
  };

  handleChange(name, value) {
    console.log('name', name, value);

    let errors = this.state.errors;
    unset(errors, name);
    let form = {...this.state.form, [name]: value};
    this.setState({form});
  }

  render() {
    const {errors, form, Testing, is_favourite} = this.state;
    const a = !isNull(form.color) && form.color != undefined ? form.color : 0;
    const b = !isNull(form.taste) && form.taste != undefined ? form.taste : 0;
    const c =
      !isNull(form.finish) && form.finish != undefined ? form.finish : 0;
    const d = !isNull(form.nose) && form.nose != undefined ? form.nose : 0;
    const overall = a + b + c + d;
    console.log('pdataTesting', a);
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: white,
          backgroundColor: 'white',
        }}>
        <Header
          navigation={this.props.navigation}
          iconColor={primaryColor}
          iconProps={{name: 'keyboard-arrow-left', type: 'MaterialIcons'}}
          onPress={() => this.props.navigation.goBack()}
          // image={require('../../../assets/blueLogo.png')}
        />
        {!isEmpty(Testing) && (
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{marginHorizontal: 5}}>
              <View
                style={[
                  styles.view,
                  {flexDirection: 'row', marginHorizontal: 5},
                ]}>
                <View style={{flexDirection: 'column', flex: 0.7}}>
                  <View style={{marginVertical: 5}}>
                    <Text style={[styles.textheading, {fontWeight: '500'}]}>
                      {Testing.products.title}
                    </Text>
                  </View>

                  <View style={{marginVertical: 5}}>
                    <Text style={{color: 'gray'}}>Vintage</Text>
                    <Text
                      style={{
                        fontFamily: sofiaFont,
                        fontSize: 20,
                        fontWeight: '500',
                        color: primaryColor,
                      }}>
                      {Testing.products.year}
                    </Text>
                  </View>

                  <View style={{marginVertical: 5}}>
                    <Text style={{color: 'gray'}}>Alcohol</Text>
                    <Text
                      style={{
                        fontFamily: sofiaFont,
                        fontSize: 20,
                        fontWeight: '500',
                        color: primaryColor,
                      }}>
                      {Testing.products.alcohol}
                    </Text>
                  </View>

                  <View style={{marginVertical: 5}}>
                    <Text style={{color: 'gray'}}>Tested on</Text>
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: '500',
                        fontFamily: sofiaFont,
                        color: primaryColor,
                      }}>
                      10 Feb,2021
                    </Text>
                  </View>
                  {/* <View style={{ marginVertical: 5 }}>
                                    <Text style={{ color: "gray" }}>Bottles in collections</Text>
                                    <Text style={{ fontSize: 20, fontWeight: "500", color: primaryColor }}>0</Text>
                                </View> */}
                </View>

                <View style={{flexDirection: 'column', flex: 0.3}}>
                  <Image
                    style={{height: '100%', width: '100%', marginTop: 20}}
                    resizeMode="contain"
                    // source={require('../../../assets/darkBotle.png')}
                  />
                </View>
              </View>

              <View style={[styles.view, {marginHorizontal: 5}]}>
                <View>
                  <Text style={[styles.textheading, {fontSize: 18}]}>
                    Ratings
                  </Text>
                </View>

                <View style={{marginHorizontal: 10, marginVertical: 5}}>
                  <Text style={{color: 'gray'}}>
                    Color{' '}
                    {
                      <Text>
                        (
                        {!isNull(this.state.form.color) &&
                        this.state.form.color !== undefined
                          ? parseInt(this.state.form.color)
                          : 0}
                        )
                      </Text>
                    }
                  </Text>
                  <Slider
                    style={{width: '100%', height: 50}}
                    minimumValue={0}
                    maximumValue={25}
                    maximumTrackTintColor="lightgray"
                    minimumTrackTintColor={'red'}
                    thumbStyle={[styles.thumb]}
                    value={this.state.form.color}
                    disabled={true}
                  />
                </View>
                <View style={{marginHorizontal: 10, marginVertical: 5}}>
                  <Text style={{color: 'gray'}}>
                    Nose{' '}
                    {
                      <Text>
                        (
                        {!isNull(this.state.form.nose) &&
                        this.state.form.nose !== undefined
                          ? parseInt(this.state.form.nose)
                          : 0}
                        )
                      </Text>
                    }
                  </Text>
                  <Slider
                    style={{width: '100%', height: 80}}
                    minimumValue={0}
                    maximumValue={25}
                    value={this.state.form.nose}
                    disabled={true}
                    maximumTrackTintColor="lightgray"
                    minimumTrackTintColor={'lightgreen'}
                    thumbStyle={styles.thumb}
                    onSlidingComplete={value => console.log('Show Valu', value)}
                  />
                </View>
                <View style={{marginHorizontal: 10, marginVertical: 5}}>
                  <Text style={{color: 'gray'}}>
                    Taste{' '}
                    {
                      <Text>
                        (
                        {!isNull(this.state.form.taste) &&
                        this.state.form.taste !== undefined
                          ? parseInt(this.state.form.taste)
                          : 0}
                        )
                      </Text>
                    }
                  </Text>
                  <Slider
                    style={{width: '100%', height: 80}}
                    minimumValue={0}
                    maximumValue={25}
                    value={this.state.form.taste}
                    disabled={true}
                    maximumTrackTintColor="lightgray"
                    minimumTrackTintColor={'lightblue'}
                    thumbStyle={styles.thumb}
                    onSlidingComplete={value => console.log('Show Valu', value)}
                  />
                </View>

                <View style={{marginHorizontal: 10, marginVertical: 5}}>
                  <Text style={{color: 'gray'}}>
                    Finish{' '}
                    {
                      <Text>
                        (
                        {!isNull(this.state.form.finish) &&
                        this.state.form.finish !== undefined
                          ? parseInt(this.state.form.finish)
                          : 0}
                        )
                      </Text>
                    }
                  </Text>
                  <Slider
                    style={{width: '100%', height: 80}}
                    minimumValue={0}
                    maximumValue={25}
                    value={this.state.form.finish}
                    disabled={true}
                    maximumTrackTintColor="lightgray"
                    minimumTrackTintColor={'red'}
                    thumbStyle={styles.thumb}
                    // trackStyle={styles.track}
                    onSlidingComplete={value => console.log('Show Valu', value)}
                  />
                </View>
                <View style={{marginHorizontal: 10, marginVertical: 5}}>
                  <Text style={{color: 'gray'}}>
                    OverAll{' '}
                    {
                      <Text>
                        (
                        {!isNull(overall) && overall !== undefined
                          ? parseInt(overall)
                          : 0}
                        )
                      </Text>
                    }
                  </Text>
                  <Slider
                    style={{width: '100%', height: 80}}
                    minimumValue={0}
                    maximumValue={100}
                    name="overall"
                    value={
                      !isNull(overall) &&
                      overall !== undefined &&
                      parseInt(overall)
                    }
                    disabled={true}
                    // onValueChange={() => this.setState({ form: { ...this.state.form, overall: overall } })}
                    maximumTrackTintColor="lightgray"
                    minimumTrackTintColor={'lightgreen'}
                    thumbStyle={styles.thumb}
                  />
                </View>
              </View>

              <View style={[styles.view, {marginHorizontal: 5}]}>
                <View>
                  <Text style={[styles.textheading, {fontSize: 18}]}>
                    Additional Notes
                  </Text>
                </View>
                {/* <Text style={{ color: "gray" }}>Alcohol Content</Text>

                            <TextInput
                                label='eq. 3'
                                name="alcohol"
                                errors={errors}
                                value={form.alcohol}
                                Textcolor={primaryColor}
                                keyboardType="number-pad"
                                onRef={ref => (this.alcohol = ref)}
                                onChange={this.handleChange.bind(this, 'alcohol')}

                            /> */}

                {/* <Text style={{ color: "gray" }}>Additional Notes</Text> */}

                <TextInput
                  label="Description"
                  name="description"
                  errors={errors}
                  multiline={true}
                  value={form.description}
                  Textcolor={primaryColor}
                  onRef={ref => (this.description = ref)}
                  onChange={this.handleChange.bind(this, 'description')}
                />
                <TouchableOpacity
                  style={{
                    paddingVertical: 10,
                    width: '100%',
                    alignSelf: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                  }}
                  onPress={() =>
                    this.setState({is_favourite: !this.state.is_favourite})
                  }>
                  <Icon
                    name={is_favourite ? 'heart' : 'hearto'}
                    type="AntDesign"
                    style={{color: is_favourite ? primaryColor : 'gray'}}
                  />
                  <Text style={{color: primaryColor, paddingHorizontal: 10}}>
                    Favourite
                  </Text>
                </TouchableOpacity>
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
    borderColor: black,
    borderWidth: 1,
    backgroundColor: 'white',
    // borderBottomRightRadius: 100,
    // borderTopRightRadius: 100,
  },
  track: {
    height: 20,
    width: 20,
    color: 'green',
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20,
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
});

const mapProps = state => ({
  user: state.root.user,
});

export default connect(mapProps, null)(ViewProduct);
