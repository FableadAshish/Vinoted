import React, {Component} from 'react';
import {
  Platform,
  FlatList,
  StatusBar,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
  Text,
  Alert,
  ImageBackground,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import Header from '../../../component/Header/Header';
import {Icon, Button, Toast} from 'native-base';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import EventRequest from '../../../component/CustomeComponent/EventRequestcard';
import EventRequestWithType from '../../../component/CustomeComponent/EventRequestCardWithType';
import {
  white,
  secondryTextColor,
  secondryColor,
  primaryColor,
  cardBackground,
  primaryTextColor,
  AcceptBottonColor,
  sofiaFont,
} from '../../../style/variables';
import moment from 'moment';
import http from '../../../http';
import {isEmpty, isNull} from 'lodash';
import {connect} from 'react-redux';
import HTML from 'react-native-render-html';
import BottomIndicator from '../../../component/Indicator/BottomIndicator';
const {height, width} = Dimensions.get('window');
const SCREEN_HEIGHT = height;
const SCREEN_WIDTH = width;
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const GOOGLE_API_KEY = 'AIzaSyBfwJ0clyRHUKSQtfReIcA4CFaIRnfiUwY';
import LinearGradient from 'react-native-linear-gradient';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import { Images } from '../../../../theme/Images';
const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

// let data = [
//     '1',
//     '2',
//     '3'
// ]

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
          width: '95%',
          alignSelf: 'center',
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




class WishlistDetail extends Component {
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
    };
  }

  componentDidMount() {
    const EventDetail = this.props.route.params.wishlistItem;
    // console.log('WishlistItem........', EventDetail);
    this.setState({form: EventDetail}, () => this.Store());
    //
  }

  Store = async () => {
    const EventDetail = this.props.route.params.wishlistItem;
    const {form} = this.state;
    this.setState({loading: true});
    http
      .get(`sommelier/myfavouriterating/${EventDetail.id}`)
      .then(res => {
        // console.log('response myfavouriterating..ppp', res);
        this.setState(
          {
            EventDetail: res.data,
            loading: false,
            refreshing: false,
            // region: {
            //     latitude: parseFloat(res.data.supplier.default_address.latitude),
            //     longitude: parseFloat(res.data.supplier.default_address.longitude),
            //     latitudeDelta: LATITUDE_DELTA,
            //     longitudeDelta: LONGITUDE_DELTA
            // }
          },
          // () =>
          //   console.log('EventDetailEventDetail....', this.state.EventDetail),
        );
      })
      .catch(err => {
        let errors = {};
        if (err && err.status == 422) {errors = err.errors;}
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
        // console.log('response changeeventrequeststatus..', res);
        this.setState({loading: false, refreshing: false}, () =>
          Toast.show({
            text: `${res.message}`,
            duration: 2000,
          }),
        );
        setTimeout(() => this.props.navigation.push('Home'), 2000);
      })
      .catch(err => {
        // console.log('ERROR on changeeventrequeststatus', err);
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

  _renderEmptyProComponent() {
    return (
      !this.state.loading &&
      isEmpty(this.state.EventDetail) && (
        <FLEC
          text="No data available"
        />
      )
    );
  }

  _renderFooterProComponent() {
    return this.state.loading && !isEmpty(this.state.EventDetail) ? (
      <BottomIndicator />
    ) : null;
  }

  render() {
    const {EventDetail} = this.state;
    if (this.state.loading) {
      return (
        <View style={{backgroundColor: white}}>
          <Header
            navigation={this.props.navigation}
            iconColor={primaryColor}
            iconProps={{name: 'keyboard-arrow-left', type: 'MaterialIcons'}}
            onPress={() => this.props.navigation.goBack()}
            image={Images.blueLogo}
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
    console.log('response EventDetail..EventDetailre', EventDetail);
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: white,
        }}>
        <Header
          navigation={this.props.navigation}
          iconColor={primaryColor}
          iconProps={{name: 'keyboard-arrow-left', type: 'MaterialIcons'}}
          onPress={() => this.props.navigation.goBack()}
          image={Images.blueLogo}
        />
        {!isEmpty(EventDetail) && (
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{marginHorizontal: 5}}>
              {!isEmpty(EventDetail.event) || !isNull(EventDetail.event) ? (
                <View style={[styles.view, {backgroundColor: white}]}>
                  <Image
                    style={{height: 150, width: '100%', borderRadius: 30}}
                    source={{uri: EventDetail?.event?.Imagesrc}}
                    // source={{ uri: "https://vistapointe.net/images/bar-3.jpg" }}
                  />
                </View>
              ) : (
                <ShimmerPlaceHolder
                  style={{
                    height: 150,
                    width: '100%',
                    borderRadius: 30,
                    marginBottom: 10,
                  }}
                />
              )}
              {
                !isEmpty(EventDetail.event) || !isNull(EventDetail.event) ? (
                  <View style={styles.view}>
                    <Text style={[styles.textheading]}>
                      {EventDetail.event.name}
                    </Text>
                    <HTML
                      style={{
                        fontFamily: sofiaFont,
                        fontSize: 15,
                        color: primaryColor,
                      }}
                      html={EventDetail.description}
                      imagesMaxWidth={Dimensions.get('window').width - 20}
                    />
                  </View>
                ) : (
                  <View>
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
                        width: '50%',
                        borderRadius: 10,
                        marginVertical: 5,
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
                        width: '50%',
                        borderRadius: 10,
                        marginVertical: 5,
                      }}
                    />
                  </View>
                )
                // <SkeletonContent
                //     containerStyle={{ flex: 1, width: "100%" }}
                //     boneColor="whitesmoke"
                //     layout={[
                //         { height: 150, width: "95%",alignSelf:"center", borderRadius: 30,marginVertical:5 }
                //     ]}
                //     animationDirection="horizontalRight"
                //     backgroundColor="gray"
                //     loading={true}
                // // ...
                // />
              }

              <View style={styles.view}>
                {!isEmpty(EventDetail.event) || !isNull(EventDetail.event) ? (
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
                          {moment(EventDetail.event.date).format('DD/MM/YYYY')}
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
                          {EventDetail.event.status}
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
                          {moment(EventDetail.event.date).format('HH:mm')}
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
                          {EventDetail.event.address_1}
                        </Text>
                      </View>
                    </View>
                  </View>
                ) : (
                  <View>
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
                        width: '50%',
                        borderRadius: 10,
                        marginVertical: 5,
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
                        width: '50%',
                        borderRadius: 10,
                        marginVertical: 5,
                      }}
                    />
                  </View>
                )}
              </View>


              {!isEmpty(EventDetail) && (
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

                  {/* <View style={{ flexDirection: "row", marginVertical: 20, }}> */}
                  <EventRequestWithType
                    onPress={() =>
                      this.props.navigation.navigate('WishListProductDetail', {
                        ProductDetail: EventDetail,
                      })
                    }
                    onPressMore={() =>
                      EventDetail.event.is_started == 1 &&
                      this.props.navigation.navigate('ChooseProduct', {
                        Testing: EventDetail,
                      })
                    }
                    more={EventDetail.event.is_started == 1 && 'Tasting'}
                    item={EventDetail}
                    imagelist={EventDetail.product.Imagesrc}
                    region={EventDetail.product.region}
                    year={EventDetail.product.year}
                    // discription={item.products.description}
                    type={EventDetail.product.type}
                    color={
                      EventDetail.product ? EventDetail.product.type : null
                    }
                    subtitle={
                      EventDetail.product && ` ${EventDetail.product.price}`
                    }
                    title={EventDetail.product && EventDetail.product.title}
                  />
                </View>
              )}

              {!isEmpty(this.state.tempArray) && (
                <View
                  style={{
                    flexDirection: 'row',
                    padding: 10,
                    marginHorizontal: 5,
                    // backgroundColor: '#E9E9E9',
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
                    ListEmptyComponent={() => this._renderEmptyProComponent()}
                    // ListFooterComponent={() => this._renderFooterProComponent()}
                    contentContainerStyle={{flexGrow: 1}}
                    // refreshControl={
                    //     <RefreshControl
                    //         refreshing={this.state.refreshing}
                    //         onRefresh={this.onRefresh}
                    //     />
                    // }
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
                            <Text style={{color: primaryColor, fontSize: 12}}>
                              {' '}
                              {this.renderText(item.products.type)}
                            </Text>
                          </View>
                        )}
                      </View>
                    )}
                  />

                  {/* } */}
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
    flex: 1,
    marginVertical: 1,
    backgroundColor: white,
    // elevation: 1,
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 5,
  },
});

const mapProps = state => ({
  user: state.root.user,
});

export default connect(mapProps, null)(WishlistDetail);
