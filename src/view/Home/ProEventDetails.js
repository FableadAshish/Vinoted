import React, {Component} from 'react';
import {
  FlatList,
  View,
  StyleSheet,
  Image,
  Dimensions,
  Text,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TextInput,
} from 'react-native';
import Header from '../../component/Header/Header';
import {Toast} from 'native-base';
import {
  white,
  primaryColor,
  cardBackground,
  AcceptBottonColor,
  sofiaFont,
} from '../../style/variables';
import moment from 'moment';
import http from '../../http';
import {isEmpty} from 'lodash';
import {connect} from 'react-redux';
import HTML from 'react-native-render-html';
import BottomIndicator from '../../component/Indicator/BottomIndicator';
const {height, width} = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
import LinearGradient from 'react-native-linear-gradient';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import EventRequestWithType from '../../component/CustomeComponent/EventRequestCardWithType';
import {Images} from '../../../theme/Images';
const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

let data = ['1', '2', '3'];

const Shimmer = ({}) => {
  return (
    <View
      style={[
        {
          height: 100,
          borderRadius: 5,
          backgroundColor: white,
          marginVertical: 5,
        },
      ]}>
      <View
        style={{
          height: 100,
          width: width - 20,
          justifyContent: 'center',
          backgroundColor: white,
          elevation: 1,
          flexDirection: 'row',
          alignSelf: 'center',
        }}>
        <View style={{flex: 0.3, justifyContent: 'center'}}>
          <View
            style={{
              justifyContent: 'center',
              paddingHorizontal: 5,
              height: 100,
              width: 100,
              borderRadius: 50,
            }}>
            <ShimmerPlaceHolder
              style={{height: 50, width: 50, borderRadius: 25}}
            />
          </View>
        </View>
        <View
          style={{
            flex: 0.7,
            marginHorizontal: 5,
            marginTop: 3,
            paddingRight: 12,
            justifyContent: 'center',
          }}>
          <ShimmerPlaceHolder
            style={{
              height: 15,
              width: '60%',
              borderRadius: 10,
              marginVertical: 3,
            }}
          />
          <ShimmerPlaceHolder
            style={{
              height: 15,
              width: '80%',
              borderRadius: 10,
              marginVertical: 3,
            }}
          />
          <ShimmerPlaceHolder
            style={{
              height: 15,
              width: '80%',
              borderRadius: 10,
              marginVertical: 3,
            }}
          />
        </View>
      </View>
    </View>
  );
};

class ProEventDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {},
      tempArray: [],
      EventDetail: {},
      data: data,
      modalVisible: false,
      visible: false,
      loading: false,
      refreshing: false,
      region: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,
      },
      tempArrayLength: 0,
      wineCount: 0,
      searchedWine: [],
    };
  }

  componentDidMount() {
    const EventDetail = this.props.route.params.Eventitem;
    this.setState({form: EventDetail}, () => this.Store());

    //
  }

  filterArray = () => {
    const newArray = [];
    this.state.tempArray.forEach(obj => {
      console.log('Object of Product', obj);
      newArray.some(o => console.log('Product OO TYPe', o));
      if (
        !newArray.some(
          o => !isEmpty(o.products) && o.products.type === obj.products.type,
        )
      ) {
        newArray.push({...obj});
      }
    });
    this.setState({tempArray: newArray});

    console.log(newArray);
  };
  Store = async () => {
    const EventDetail = this.props.route.params.Eventitem;
    this.setState({loading: true});
    http
      .get(`sommelier/events/${EventDetail.id}`)
      .then(res => {
        console.log('response EventDetail..ppp', res.data.page);
        this.setState({loading: false, refreshing: false});
        this.setState(
          {
            EventDetail: res.data.page,
            tempArray: res.data.page.eventproducts,
            region: {
              latitude: parseFloat(
                res.data.page.supplier.default_address.latitude,
              ),
              longitude: parseFloat(
                res.data.page.supplier.default_address.longitude,
              ),
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA,
            },
          },
          () => {
            this.filterArray();
            this.setState({tempArrayLength: this.state.tempArray.length});
            // this.setState({wineCount: this.state.tempArrayLength});
            this.getCount();
          },
        );
      })
      .catch(err => {
        let errors = {};
        if (err && err.status == 422) {
          errors = err.errors;
        }
        this.setState({errors, loading: false, refreshing: false});
      });
  };
  AcceptEvents(status) {
    this.setState({loading: true});
    http
      .post('sommelier/changeeventrequeststatus', {
        event_id: this.state.EventDetail.id,
        status: status,
      })
      .then(res => {
        console.log('response EventDetail..ppp..', res);
        this.setState({loading: false, refreshing: false}, () =>
          Toast.show({
            text: `${res.message}`,
            duration: 2000,
          }),
        );
        setTimeout(
          () => this.props.navigation.replace('App', {screen: 'Home'}),
          2000,
        );
        this.setState({EventDetail: {}});
      })
      .catch(err => {
        console.log('ERROR on changeeventrequeststatus', err);
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

  getCount() {
    for (let i = 1; i <= this.state.tempArray.length; i++) {
      console.log('this.getCount() Again and again and again', i, ']: ', i);
      return this.setState({wineCount: i});
    }
  }

  _renderEmptyProComponent() {
    return (
      !this.state.loading &&
      isEmpty(this.state.EventDetail) && (
        <FLEC
          text="No data available"
          // image={require('../../../assets/logo.png')}
        />
      )
    );
  }

  _renderFooterProComponent() {
    return this.state.loading && !isEmpty(this.state.EventDetail) ? (
      <BottomIndicator />
    ) : null;
  }

  SearchFilterFunction(text) {
    const filteredArray = this.state.tempArray.filter(item =>
      item.products.title.toLowerCase().includes(text.toLowerCase()),
    );
    this.setState({searchedWine: filteredArray});
  }
  onRefresh() {
    this.setState({refreshing: true, page: 0, EventDetail: {}}, () =>
      this.Store(),
    );
  }

  color = type => {
    if (type === 'White') {
      return 'yellow';
    }
    if (type === 'Red') {
      return 'red';
    }
    if (type === 'Rose') {
      return '#EC979A'; //#EC979A //#EE9A9A
    }
    if (type === 'Sparkling') {
      return 'green';
    }
    if (type === 'Sweet') {
      return 'black';
    }
    if (type === 'Other') {
      return 'white';
    }
    if (type === 'Wine') {
      return 'black';
    }
  };
  renderColor = type => {
    if (type === 'White') {
      return '#FBD301';
    }
    if (type === 'Red') {
      return '#F14236';
    }
    if (type === 'Rose') {
      return '#EC979A';
    }
    if (type === 'Sparkling') {
      return '#4EAC4F';
    }
    if (type === 'Sweet') {
      return '#755246';
    }
    if (type === 'Wine') {
      return 'black';
    }
    if (type === 'Other') {
      return 'white';
    }
  };
  renderText = type => {
    if (type === 'White') {
      return 'W';
    }
    if (type === 'Red') {
      return 'R';
    }
    if (type === 'Rose') {
      return 'RO';
    }
    if (type === 'Sparkling') {
      return 'SP';
    }
    if (type === 'Sweet') {
      return 'SW';
    }
    if (type === 'Wine') {
      return 'W';
    }
    if (type === 'Other') {
      return 'Other';
    }
  };

  render() {
    const {EventDetail} = this.state;
    console.log('EventDetail Now Second', this.state.tempArray[2]);
    // for (let i = 1; i <= this.state.tempArrayLength; i++) {
    //   console.log('Event Detail Again[ Rhire fgd juyhh', i, ']: ', i);
    //   // return this.setState({wineCount: i});
    // }
    console.log('this.state.wineCount', this.state.wineCount);
    console.log('this.state.tempArrayLengthe', this.state.tempArrayLength);
    if (this.state.loading && isEmpty(EventDetail)) {
      return (
        <View style={{backgroundColor: white}}>
          <Header
            navigation={this.props.navigation}
            iconColor={primaryColor}
            iconProps={Images.BackNavigationIcon}
            onPress={() => this.props.navigation.goBack()}
            image={require('../../assets/blueLogo.png')}
          />
          <View style={{width: '90%', alignSelf: 'center'}}>
            <ShimmerPlaceHolder
              style={{
                height: 150,
                width: '100%',
                borderRadius: 30,
                marginBottom: 10,
              }}
            />
            <ShimmerPlaceHolder
              style={{
                height: 30,
                width: '70%',
                borderRadius: 10,
                marginVertical: 3,
                marginBottom: 10,
              }}
            />
            <ShimmerPlaceHolder
              style={{
                height: 15,
                width: '50%',
                borderRadius: 10,
                marginVertical: 5,
              }}
            />
            <ShimmerPlaceHolder
              style={{
                height: 15,
                width: '60%',
                borderRadius: 10,
                marginVertical: 5,
              }}
            />
            <ShimmerPlaceHolder
              style={{
                height: 15,
                width: '70%',
                borderRadius: 10,
                marginVertical: 5,
              }}
            />
            <ShimmerPlaceHolder
              style={{
                height: 15,
                width: '60%',
                borderRadius: 10,
                marginVertical: 10,
              }}
            />
            <ShimmerPlaceHolder
              style={{
                height: 15,
                width: '70%',
                borderRadius: 10,
                marginVertical: 10,
              }}
            />
            <ShimmerPlaceHolder
              style={{
                height: 15,
                width: '80%',
                borderRadius: 10,
                marginVertical: 10,
              }}
            />
            <Shimmer />
            <Shimmer />
          </View>
        </View>
      );
    }
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
          image={require('../../assets/blueLogo.png')}
        />
        {isEmpty(EventDetail) ? (
          <View style={{backgroundColor: white}}>
            <View style={{width: '90%', alignSelf: 'center'}}>
              <ShimmerPlaceHolder
                style={{
                  height: 150,
                  width: '100%',
                  borderRadius: 30,
                  marginBottom: 10,
                }}
              />
              <ShimmerPlaceHolder
                style={{
                  height: 30,
                  width: '70%',
                  borderRadius: 10,
                  marginVertical: 3,
                  marginBottom: 10,
                }}
              />
              <ShimmerPlaceHolder
                style={{
                  height: 15,
                  width: '50%',
                  borderRadius: 10,
                  marginVertical: 5,
                }}
              />
              <ShimmerPlaceHolder
                style={{
                  height: 15,
                  width: '60%',
                  borderRadius: 10,
                  marginVertical: 5,
                }}
              />
              <ShimmerPlaceHolder
                style={{
                  height: 15,
                  width: '70%',
                  borderRadius: 10,
                  marginVertical: 5,
                }}
              />
              <ShimmerPlaceHolder
                style={{
                  height: 15,
                  width: '60%',
                  borderRadius: 10,
                  marginVertical: 10,
                }}
              />
              <ShimmerPlaceHolder
                style={{
                  height: 15,
                  width: '70%',
                  borderRadius: 10,
                  marginVertical: 10,
                }}
              />
              <ShimmerPlaceHolder
                style={{
                  height: 15,
                  width: '80%',
                  borderRadius: 10,
                  marginVertical: 10,
                }}
              />
              <Shimmer />
              <Shimmer />
            </View>
          </View>
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={() => this.onRefresh()}
              />
            }>
            <View style={{marginHorizontal: 5}}>
              {!isEmpty(EventDetail) ? (
                <View style={[styles.view, {backgroundColor: white}]}>
                  <Image
                    style={{height: 150, width: '100%', borderRadius: 30}}
                    source={{uri: EventDetail.Imagesrc}}
                    // source={{ uri: "https://vistapointe.net/images/bar-3.jpg" }}
                  />
                </View>
              ) : (
                <View>
                  <ShimmerPlaceHolder
                    style={{
                      height: 150,
                      width: '100%',
                      borderRadius: 30,
                      marginBottom: 10,
                    }}
                  />
                  <ShimmerPlaceHolder
                    style={{
                      height: 30,
                      width: '70%',
                      borderRadius: 10,
                      marginVertical: 3,
                      marginBottom: 10,
                    }}
                  />
                  <ShimmerPlaceHolder
                    style={{
                      height: 15,
                      width: '50%',
                      borderRadius: 10,
                      marginVertical: 5,
                    }}
                  />
                  <ShimmerPlaceHolder
                    style={{
                      height: 15,
                      width: '60%',
                      borderRadius: 10,
                      marginVertical: 5,
                    }}
                  />
                  <ShimmerPlaceHolder
                    style={{
                      height: 15,
                      width: '70%',
                      borderRadius: 10,
                      marginVertical: 5,
                    }}
                  />
                </View>
              )}
              {!isEmpty(EventDetail) ? (
                <View style={styles.view}>
                  <Text style={[styles.textheading]}>{EventDetail.name}</Text>
                  <HTML
                    style={[styles.textheading]}
                    source={{html: EventDetail.description}}
                    contentWidth={Dimensions.get('window').width - 20}
                    baseFontStyle={{
                      fontFamily: sofiaFont,
                      fontSize: 15,
                      color: primaryColor,
                    }}
                  />

                  {/* If you also want to display the plain text version */}
                  {/* <View>
                    <Text style={[styles.textheading]}>{EventDetail.description}</Text>
                  </View> */}
                </View>
              ) : (
                <View>
                  <ShimmerPlaceHolder
                    style={{
                      height: 15,
                      width: '60%',
                      borderRadius: 10,
                      marginVertical: 10,
                    }}
                  />
                  <ShimmerPlaceHolder
                    style={{
                      height: 15,
                      width: '70%',
                      borderRadius: 10,
                      marginVertical: 10,
                    }}
                  />
                  <ShimmerPlaceHolder
                    style={{
                      height: 15,
                      width: '80%',
                      borderRadius: 10,
                      marginVertical: 10,
                    }}
                  />
                </View>
              )}

              <View style={styles.newView}>
                {!isEmpty(EventDetail) ? (
                  <View
                    style={{
                      flexDirection: 'row',
                      width: '95%',
                      flex: 1,
                      alignSelf: 'center',
                    }}>
                    <View
                      style={{
                        flexDirection: 'column',
                        flex: 0.5,
                        paddingHorizontal: 10,
                      }}>
                      <View style={{marginVertical: 5}}>
                        <Text style={{color: 'gray'}}>Date</Text>
                        <Text
                          style={{
                            fontFamily: sofiaFont,
                            fontSize: 15,
                            color: primaryColor,
                          }}>
                          {moment(EventDetail.date).format('DD/MM/YYYY')}
                        </Text>
                      </View>
                      <View style={{marginVertical: 5}}>
                        <Text style={{color: 'gray'}}>Status</Text>
                        <Text
                          style={{
                            fontFamily: sofiaFont,
                            fontSize: 15,
                            color: primaryColor,
                          }}>
                          {EventDetail.status}
                        </Text>
                      </View>
                    </View>

                    <View
                      style={{
                        flexDirection: 'column',
                        flex: 0.5,
                        paddingHorizontal: 10,
                      }}>
                      <View style={{marginVertical: 5}}>
                        <Text style={{color: 'gray'}}>Time</Text>
                        <Text
                          style={{
                            fontFamily: sofiaFont,
                            fontSize: 15,
                            color: primaryColor,
                          }}>
                          {moment(EventDetail.date).format('HH:mm')}
                        </Text>
                      </View>
                      <View style={{marginVertical: 5}}>
                        <Text style={{color: 'gray'}}>Location</Text>
                        <Text
                          style={{
                            fontFamily: sofiaFont,
                            fontSize: 15,
                            color: primaryColor,
                          }}>
                          {EventDetail.address_1}
                        </Text>
                      </View>
                    </View>
                  </View>
                ) : (
                  <View>
                    <Shimmer />
                    <Shimmer />
                  </View>
                )}
              </View>

              {(!isEmpty(EventDetail) &&
                !isEmpty(EventDetail.event_my_requests) &&
                EventDetail.event_my_requests.status == 'Accepted') ||
              EventDetail.event_my_requests.status == 'Rejected' ? (
                <View
                  style={[
                    styles.view,
                    {
                      backgroundColor: white,
                      borderTopLeftRadius: 20,
                      borderTopRightRadius: 20,
                      paddingHorizontal: 0,
                    },
                  ]}>
                  <Text style={[styles.textheading]}>
                    {!isEmpty(EventDetail.eventproducts) ? 'Products' : ''}
                  </Text>

                  <View style={styles.searchcontainer}>
                    <TextInput
                      style={styles.input}
                      // onChangeText={text => this.onTyping(text)}
                      onChangeText={text => this.SearchFilterFunction(text)}
                      value={this.state.searchText}
                      underlineColorAndroid="transparent"
                      placeholder="Search for Wine Here"
                      placeholderTextColor={white}
                    />
                    <TouchableWithoutFeedback>
                      <View style={styles.iconContainer}>
                        {/* <Icon
                onPress={() => this.SearchFilterFunction(this.state.text)}
                name="search"
                type="FontAwesome"
                style={styles.icon}></Icon> */}
                        <TouchableOpacity>
                          <Image
                            source={Images.SearchIcon}
                            tintColor={white}
                            style={styles.icon}
                          />
                        </TouchableOpacity>
                      </View>
                    </TouchableWithoutFeedback>
                  </View>

                  <View style={{flexDirection: 'row', marginVertical: 0}}>
                    <FlatList
                      showsVerticalScrollIndicator={false}
                      // data={EventDetail.eventproducts}
                      data={
                        this.state.searchedWine.length > 0
                          ? this.state.searchedWine
                          : EventDetail.eventproducts
                      }
                      keyExtractor={(item, i) => i.toString()}
                      scrollEventThrottle={16}
                      onEndReachedThreshold={0.5}
                      showsVerticalScrollIndicator={false}
                      ListEmptyComponent={() => this._renderEmptyProComponent()}
                      contentContainerStyle={{flexGrow: 1}}
                      // This will render If Notification is accepted

                      renderItem={({item}) => {
                        return (
                          <View>
                            {item.products && (
                              <EventRequestWithType
                                onPress={() =>
                                  this.props.navigation.navigate(
                                    'ProductDetail',
                                    {ProductDetail: item, event: EventDetail},
                                  )
                                }
                                onPressMore={() =>
                                  EventDetail.is_started == 1 &&
                                  this.props.navigation.navigate(
                                    'ChooseProduct',
                                    {Testing: item, event: EventDetail},
                                  )
                                }
                                item={item}
                                region={item.products.region}
                                year={item.products.year}
                                id={item.products.category_id}
                                more={item.products.is_tasted == 1}
                                noMore={item.products.is_tasted == 0}
                                imagelist={
                                  item.products && item.products.Imagesrc
                                }
                                type={item.products.type}
                                color={
                                  item.products ? item.products.type : null
                                }
                                subtitle={
                                  item.products && `${item.products.price}`
                                }
                                title={item.products && item.products.title}
                                countId={this.state.wineCount}
                              />
                            )}
                          </View>
                        );
                      }}
                    />

                    {/* } */}
                  </View>
                </View>
              ) : (
                // {/* {!isEmpty(EventDetail) && EventDetail.event_my_requests.status == "Pending" && */}
                <View style={{flexDirection: 'row', marginVertical: 10}}>
                  <View style={{flex: 0.5, alignItems: 'center'}}>
                    <TouchableOpacity
                      onPress={() => this.AcceptEvents('Rejected')}
                      activeOpacity={1}
                      style={{
                        height: 50,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 15,
                        backgroundColor: cardBackground,
                        width: '80%',
                      }}>
                      <Text
                        style={[
                          styles.text,
                          {
                            color: 'gray',
                            paddingHorizontal: 5,
                            fontWeight: '700',
                          },
                        ]}>
                        Reject
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{flex: 0.5, alignItems: 'center'}}>
                    <TouchableOpacity
                      onPress={() => this.AcceptEvents('Accepted')}
                      activeOpacity={1}
                      style={{
                        height: 50,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 15,
                        backgroundColor: AcceptBottonColor,
                        width: '80%',
                      }}>
                      <Text
                        style={[
                          styles.text,
                          {
                            color: white,
                            paddingHorizontal: 5,
                            fontWeight: '700',
                          },
                        ]}>
                        Accept
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}

              {!isEmpty(EventDetail) &&
                EventDetail.event_my_requests.status == 'Pending' && (
                  <View
                    style={[
                      styles.view,
                      {
                        backgroundColor: white,
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                        paddingHorizontal: 0,
                      },
                    ]}>
                    <Text style={[styles.textheading]}>
                      {!isEmpty(EventDetail.eventproducts) ? 'Products' : ''}
                    </Text>

                    <View style={{flexDirection: 'row', marginVertical: 0}}>
                      <FlatList
                        showsVerticalScrollIndicator={false}
                        data={EventDetail.eventproducts}
                        keyExtractor={(item, i) => i.toString()}
                        scrollEventThrottle={16}
                        onEndReachedThreshold={0.5}
                        showsVerticalScrollIndicator={false}
                        ListEmptyComponent={() =>
                          this._renderEmptyProComponent()
                        }
                        contentContainerStyle={{flexGrow: 1}}
                        renderItem={({item}) => (
                          // This will render If Notification is not accepted
                          console.log('item=======>wer', item.products),
                          (
                            <View>
                              {
                                <EventRequestWithType
                                  onPress={() =>
                                    this.props.navigation.navigate(
                                      'ProductDetail',
                                      {ProductDetail: item, event: EventDetail},
                                    )
                                  }
                                  onPressMore={() =>
                                    EventDetail.is_started == 1 &&
                                    this.props.navigation.navigate(
                                      'ChooseProduct',
                                      {Testing: item, event: EventDetail},
                                    )
                                  }
                                  item={item}
                                  region={item.products.region}
                                  year={item.products.year}
                                  // more={
                                  //   EventDetail.is_started == 1 && 'Tasting'
                                  // }
                                  imagelist={
                                    item.products && item.products.Imagesrc
                                  }
                                  type={item.products.type}
                                  color={
                                    item.products ? item.products.type : null
                                  }
                                  subtitle={
                                    item.products && ` ${item.products.price}`
                                  }
                                  title={item.products && item.products.title}
                                />
                              }
                            </View>
                          )
                        )}
                      />
                    </View>
                    {!isEmpty(this.state.tempArray) && (
                      <View
                        style={{
                          flexDirection: 'row',
                          padding: 10,
                          marginHorizontal: 5,
                          bottom: 0,
                          borderRadius: 2,
                        }}>
                        <FlatList
                          showsVerticalScrollIndicator={false}
                          horizontal={true}
                          data={this.state.tempArray}
                          keyExtractor={(item, i) => i.toString()}
                          scrollEventThrottle={16}
                          onEndReachedThreshold={0.5}
                          showsVerticalScrollIndicator={false}
                          ListEmptyComponent={() =>
                            this._renderEmptyProComponent()
                          }
                          contentContainerStyle={{flexGrow: 1}}
                          renderItem={({item}) => (
                            <View
                              style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}>
                              {!isEmpty(item.products) && (
                                <View
                                  style={{
                                    width: '100%',
                                    flexDirection: 'column',
                                    marginHorizontal: 10,
                                    marginBottom: 0,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                  }}>
                                  <View
                                    style={{
                                      borderWidth: 1,
                                      borderRadius: 5,
                                      borderColor: this.renderColor(
                                        item.products.type,
                                      ),
                                      borderBottomWidth: 0,
                                      shadowColor: 'black',
                                      shadowOffset: {width: 0, height: 2},
                                      shadowOpacity: 0.9,
                                      shadowRadius: 13,
                                      elevation: 3,
                                      backgroundColor: this.renderColor(
                                        item.products.type,
                                      ),
                                      height: 15,
                                      width: 15,
                                      borderRadius: 50,
                                      marginBottom: 8,
                                    }}
                                  />
                                  <Text
                                    style={{color: primaryColor, fontSize: 12}}>
                                    {' '}
                                    {this.renderText(item.products.type)}
                                  </Text>
                                </View>
                                // <View>
                                //   <Text>Hello</Text>
                                // </View>
                              )}
                            </View>
                          )}
                        />
                      </View>
                    )}
                  </View>
                )}
            </View>
          </ScrollView>
        )}
      </View>
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
    color: primaryColor,
    fontSize: 25,
    textTransform: 'capitalize',
    fontFamily: sofiaFont,
  },
  text: {
    color: primaryColor,
    fontSize: 14,
    fontFamily: sofiaFont,
  },
  view: {
    // flex: 1,
    marginVertical: 1,
    backgroundColor: white,
    // elevation: 1,
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 5,
  },
  AddmodelView: {
    height: 250,
    width: width - 40,
    backgroundColor: white,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginVertical: 100,
  },
  modelView: {
    height: 300,
    width: width - 40,
    backgroundColor: white,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    paddingVertical: 20,
  },
  modelheader: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: width - 40,
    justifyContent: 'center',
  },
  input: {
    width: '80%',
    color: white,
    fontFamily: sofiaFont,
  },
  searchcontainer: {
    flexDirection: 'row',
    backgroundColor: primaryColor,
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 20,
    marginTop: 20,
  },
  icon: {
    height: 25,
    width: 25,
    color: white,
    fontFamily: sofiaFont,
  },
});

const mapProps = state => ({
  user: state.root.user,
});

export default connect(mapProps, null)(ProEventDetails);
