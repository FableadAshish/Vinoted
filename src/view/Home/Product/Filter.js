import React, {Component} from 'react';
import {
  Platform,
  FlatList,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
  Text,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import Header from '../../../component/Header/Header';
import Button from '../../../component/Common/Button';
import DateTimePicker from '@react-native-community/datetimepicker';
import ModalSelector from 'react-native-modal-selector';
import {
  white,
  secondryColor,
  primaryColor,
  sofiaFont,
  lineColor,
} from '../../../style/variables';
import {isEmpty, unset} from 'lodash';
import {connect} from 'react-redux';
import http from '../../../http';
import moment from 'moment';
const {width, height} = Dimensions.get('window');
import Modal from 'react-native-modal';
import {Images} from '../../../../theme/Images';
import {Colors} from 'react-native/Libraries/NewAppScreen';

class ChooseProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        wineType: [],
      },
      data: [],
      Testing: {},
      showToast: false,
      modalVisible: false,
      visible: false,
      refreshing: false,
      loading: false,
      productlist: [],
      min: 0,
      max: 1,
      errors: {},
      slideValue: '',
      eventTesting: {},
      selectedItems: [],
      SupplierList: [],
      date: '',
      currentDate: new Date(),
      ShowDate: false,
      checked: false,
      namekey: '',
      value: '',
      page: 0,
      index: 0,
      textInputNameValue: '',
    };
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  componentWillUnmount = () => {
    this._unsubscribe();
  };

  componentDidMount() {
    this.Store();
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      console.log('hello');
      this.Store();
    });
  }

  Store = async () => {
    const data = [
      {
        id: 1,
        name: 'W - White ',
        value: 'White',
        checked: false,
      },
      {
        id: 2,
        name: 'R - Red ',
        value: 'Red',
        checked: false,
      },
      {
        id: 3,
        name: 'RO - Rose',
        value: 'Rose',
        checked: false,
      },
      {
        id: 4,
        name: 'SP - Sparkling',
        value: 'sparkling',
        checked: false,
      },
      {
        id: 5,
        name: 'SW - Sweet',
        value: 'Sweet',
        checked: false,
      },
      {
        id: 6,
        name: 'Other - Other',
        value: 'Other',
        checked: false,
      },
    ];
    this.setState({loading: true, data});
    http
      .get(`sommelier/suppliers?page=${this.state.page}`)
      .then(res => {
        this.setState({
          SupplierList: res.data.page,
          loading: false,
          refreshing: false,
        });
      })
      .catch(err => {
        console.log('errorrr', err);
        let errors = {};
        if (err && err.status == 422) {
          errors = err.errors;
        }
        this.setState({loading: false, errors});
        console.log('errorrr ', err);
        this.setState({loading: false, refreshing: false});
      });
  };

  productApi = async text => {
    this.setState({loading: true});
    http
      .get(`sommelier/product-search-by-name?product_name=${text}`)
      .then(res => {
        console.log('productsearch for Wine Filter', res);
        this.setState({
          productlist: res.data.result,
          loading: false,
          refreshing: false,
        });
      })
      .catch(err => {
        console.log('errorrr', err);
        let errors = {};
        if (err && err.status == 422) {
          errors = err.errors;
        }
        this.setState({loading: false, errors});
        console.log('errorrr ', err);
        this.setState({loading: false, refreshing: false});
      });
  };

  onSave = () => {
    const {form} = this.state;
    console.log('Formdataon Filter Again Two Times', form);
    this.props.navigation.navigate('SearchableTastingNots', {Search: form});
  };

  color = () => {
    return (
      <View style={{flex: 1, backgroundColor: 'red'}}>
        <Text>12</Text>
      </View>
    );
  };

  handleChange(name, value) {
    console.log('name is here:', name);
    console.log('value is here:', value);

    let errors = this.state.errors;
    unset(errors, name);
    let form = {...this.state.form, [name]: value};
    this.setState({form});
  }

  onSelectedItemsChange = selectedItems => {
    this.setState({selectedItems});
  };

  showMode = currentMode => {
    // setMode(currentMode);
    this.setState({mode: currentMode, ShowDate: true});
  };

  showDatePicker = () => {
    console.log('date picker');
    this.showMode('date');
    // this.setState({date:name})
  };

  handleTextInputChange = (label, name) => {
    console.log('text input change called', label, name);
    // if (name == 'supplierName') {
    this.setState({textInputNameValue: label});
    // }
  };

  onChange = (e, d) => {
    const {form} = this.state;
    const currentDate = this.state.currentDate;
    this.setState({currentDate, ShowDate: false});
    // if (e.type != 'dismissed') {
    this.setState({
      form: {...form, date: moment(d).format('YYYY-MM-DD')},
      ShowDate: false,
      date: '',
    });
    // } else {
    //   this.setState({ShowDate: false});
    //   this.setState({
    //     form: {...form, date: moment(this.state.date).format('YYYY-MM-DD')},
    //   });
  };

  onCheck = (item, i) => {
    let items = this.state.data;
    const winetype = [];
    items[i].checked =
      items[i].checked || item.id == items[i].id ? !items[i].checked : true;
    // this.setState({data:items})
    items.forEach(item => {
      if (item.checked == true) {
        winetype.push(item);
      }
    });
    this.setState(
      {form: {...this.state.form, wineType: winetype}, ...this.state.data},
      () => console.log('Formafterset', this.state.form.wineType),
    );
  };

  selectProduct = item => {
    this.setState({form: {...this.state.form, product_name: item.title}}, () =>
      this.setModalVisible(false),
    );
  };

  render() {
    const {form, data} = this.state;
    // console.log('thdatawinetype', data);

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
          image={Images.Logo}
        />

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{marginHorizontal: 5}}>
            <View style={{paddingVertical: 10, paddingHorizontal: 5}}>
              <Text
                style={[
                  styles.textheading,
                  {fontSize: 25, color: white, fontFamily: sofiaFont},
                ]}>
                Filters
              </Text>
            </View>

            <View style={[styles.view, {marginHorizontal: 5}]}>
              <TouchableOpacity
                onPress={() => this.setModalVisible(true)}
                style={styles.pickerView}>
                <Text style={styles.pickerText}>Wine Name</Text>
                <View style={styles.pickerstyle}>
                  <Text
                    style={{
                      color: this.state.form.product_name ? white : 'grey',
                      marginLeft: 15,
                      fontSize: 15,
                      fontFamily: sofiaFont,
                    }}>
                    {!isEmpty(this.state.form.product_name)
                      ? this.state.form.product_name
                      : 'Select'}
                  </Text>
                </View>
              </TouchableOpacity>

              <View style={styles.pickerView}>
                <Text style={styles.pickerText}>Type</Text>

                {data.map((item, i) => {
                  return (
                    <TouchableOpacity
                      onPress={() => this.onCheck(item, i)}
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginVertical: 2,
                      }}>
                      {/* <Icon name={item.checked ? "check-square" : "checkbox-passive"} type={item.checked ? "Feather" : 'Fontisto'} style={{ fontSize: 20, color: item.checked == true ? "white" : "grey", paddingHorizontal: 10 }} /> */}
                      <Image
                        source={
                          item.checked
                            ? Images.CheckedSquareIcon
                            : Images.EmptyCheckSquareIcon
                        }
                        style={{marginHorizontal: 10, height: 20, width: 20}}
                        tintColor={item.checked == true ? 'white' : 'grey'}
                      />

                      <Text
                        style={[
                          styles.pickerText,
                          {color: item.checked == true ? 'white' : 'grey'},
                        ]}>
                        {item.name}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>

              <View style={styles.pickerView}>
                <Text style={styles.pickerText}>Supplier Name</Text>
                <View style={styles.pickerstyle}>
                  <ModalSelector
                    data={this.state.SupplierList.map((item, index) => ({
                      key: index,
                      label: item.name,
                    }))}
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
                        'supplierName',
                        option.key,
                      );
                      this.handleTextInputChange(option.label, 'supplierName');
                    }}>
                    <TextInput
                      style={{
                        borderBottomWidth: 1,
                        borderColor: '#ccc',
                        padding: 10,
                        height: 50,
                        placeholder: 'Select Name',
                        color: 'white',
                      }}
                      editable={false}
                      placeholder="Select"
                      placeholderTextColor="grey"
                      value={this.state.textInputNameValue}
                    />
                  </ModalSelector>
                </View>
                {/* {!isEmpty(errors) && errors["supplier_name"] && !form.supplier_name && (
                                    <Text style={{ fontFamily: sofiaFont, fontSize: 12, color: error }}>{errors["supplier_name"]}</Text>
                                )} */}
              </View>

              <View
                style={[
                  styles.pickerView,
                  {borderBottomColor: lineColor, borderBottomWidth: 1},
                ]}>
                {this.state.ShowDate && (
                  <>
                    <DatePicker
                      modal
                      open={this.state.ShowDate}
                      date={this.state.currentDate}
                      onConfirm={date => {
                        this.onChange(null, date);
                      }}
                      onCancel={() => {
                        this.setState({ShowDate: false});
                      }}
                      onDateChange={this.onChange}
                    />
                  </>
                )}
                <Text style={styles.pickerText}>Tasting Date</Text>
                <TouchableOpacity
                  //  onPress={() => this.showDatePicker("date")}
                  onPress={() => this.showDatePicker('date')}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginVertical: 2,
                    width: '100%',
                  }}>
                  <Text
                    style={[styles.pickerText, {color: 'grey', width: '90%'}]}>
                    {!isEmpty(form.date) ? form.date : 'Select Date'}
                  </Text>
                  <Image
                    source={Images.CalendarIcon}
                    style={{fontSize: 20}}
                    tintColor={Colors.white}
                  />
                </TouchableOpacity>
                {/* {!isEmpty(errors) && errors["supplier_name"] && !form.supplier_name && (
                                    <Text style={{ fontFamily: sofiaFont, fontSize: 12, color: error }}>{errors["supplier_name"]}</Text>
                                )} */}
              </View>
            </View>

            <View style={[styles.view, {marginHorizontal: 5}]}>
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
                    title="Search"
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
            </View>
          </View>
        </ScrollView>

        {this.state.modalVisible && (
          <Modal
            transparent={true}
            animationType={'none'}
            visible={this.state.modalVisible}
            style={{
              flex: 1,
              marginVertical: -20,
              height: height,
              width: width,
              backgroundColor: '#00000069',
              alignSelf: 'center',
            }}
            onBackButtonPress={() => {
              this.setModalVisible(false);
            }}
            onBackdropPress={() => {
              this.setModalVisible(false);
            }}>
            <View style={{flex: 1, justifyContent: 'center'}}>
              <View style={styles.modelView}>
                <View style={{marginTop: 25}}>
                  <Header
                    navigation={this.props.navigation}
                    iconColor={primaryColor}
                    iconProps={Images.BackNavigationIcon}
                    onPress={() => {
                      this.setModalVisible(false);
                    }}
                    image={Images.blueLogo}
                  />
                </View>

                <View style={styles.searchcontainer}>
                  <TextInput
                    style={styles.input}
                    // onChangeText={text => this.onTyping(text)}
                    onChangeText={text => this.productApi(text)}
                    value={this.state.searchText}
                    underlineColorAndroid="transparent"
                    placeholder="Type Wine Name"
                    placeholderTextColor={primaryColor}
                  />
                  <TouchableWithoutFeedback>
                    <View style={styles.iconContainer}>
                      {/* <Icon name="search" type="FontAwesome" style={styles.icon} ></Icon> */}
                      <Image
                        source={Images.SearchIcon}
                        style={{height: 22, width: 22}}
                        tintColor={primaryColor}
                      />
                    </View>
                  </TouchableWithoutFeedback>
                </View>

                <FlatList
                  showsVerticalScrollIndicator={false}
                  data={this.state.productlist}
                  keyExtractor={(item, i) => i.toString()}
                  horizontal={false}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{flexGrow: 1}}
                  refreshControl={
                    <RefreshControl
                      refreshing={this.state.refreshing}
                      // onRefresh={this.onRefresh}
                    />
                  }
                  renderItem={({item}) => (
                    <TouchableOpacity
                      onPress={() => this.selectProduct(item)}
                      style={styles.productCard}>
                      <Text
                        style={{
                          color: primaryColor,
                          fontFamily: sofiaFont,
                          fontSize: 15,
                        }}>
                        {item.title}
                      </Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
            </View>
          </Modal>
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
    // borderBottomRightRadius: 100,
    // borderTopRightRadius: 100,
  },
  pickerView: {
    // marginHorizontal: 10,
    marginVertical: 20,
    // borderColor: "grey",
    // borderWidth: 1
  },
  pickerItem: {
    color: 'grey',
    fontFamily: sofiaFont,
  },
  pickerText: {color: 'white', fontFamily: sofiaFont, marginVertical: 5},
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
    backgroundColor: primaryColor,
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
  modelView: {
    height: '100%',
    width: '100%',
    backgroundColor: white,
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginTop: 50,
  },
  modelheader: {
    height: 30,
    padding: 20,
    marginBottom: 2,
    width: '90%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: '80%',
    color: primaryColor,
    fontFamily: sofiaFont,
  },
  searchcontainer: {
    flexDirection: 'row',
    backgroundColor: white,
    elevation: 1,
    width: '95%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 20,
    borderWidth: 0.6,
    borderColor: primaryColor,
    marginTop: 20,
  },
  icon: {
    fontSize: 20,
    color: primaryColor,
    fontFamily: sofiaFont,
  },
  productCard: {
    height: 50,
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: white,
    elevation: 1,
    paddingHorizontal: 20,
    marginVertical: 5,
    borderRadius: 5,
  },
});

const mapProps = state => ({
  user: state.root.user,
});

export default connect(mapProps, null)(ChooseProduct);
