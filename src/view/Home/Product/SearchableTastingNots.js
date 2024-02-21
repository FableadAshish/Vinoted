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
  ActivityIndicator,
  TextInput,
  BackHandler,
} from 'react-native';
import Header from '../../../component/Header/Header';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import HTML from 'react-native-render-html';
import {
  white,
  secondryTextColor,
  AcceptBottonColor,
  primaryColor,
  ActiveBottonColor,
  primaryTextColor,
  inputColor,
  cardBackground,
  TexColor,
  sofiaFont,
} from '../../../style/variables';
import {isEmpty, isNull} from 'lodash';
import {connect} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);
import {Icon, Toast} from 'native-base';
import {_getUser} from '../../../api/auth';
import BottomIndicator from '../../../component/Indicator/BottomIndicator';
import http from '../../../http';
import FLEC from '../../../component/Common/FLEC';
import FPI from '../../../component/Indicator/FPI';
import moment from 'moment';
import {color} from 'react-native-reanimated';
const {width, height} = Dimensions.get('window');
import Modal from 'react-native-modal';
import {Images} from '../../../../theme/Images';

let data = ['1', '2', '3'];

const Shimmer = ({}) => {
  return (
    <View
      style={[
        {
          height: 250,
          borderRadius: 5,
          backgroundColor: white,
          marginVertical: 5,
        },
      ]}>
      <View
        style={{
          height: 120,
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
      <ShimmerPlaceHolder
        style={{
          marginLeft: 20,
          height: 15,
          width: '60%',
          borderRadius: 10,
          marginVertical: 3,
          marginTop: 20,
        }}
      />
      <ShimmerPlaceHolder
        style={{
          marginLeft: 20,
          height: 15,
          width: '70%',
          borderRadius: 10,
          marginVertical: 3,
        }}
      />
      <ShimmerPlaceHolder
        style={{
          marginLeft: 20,
          height: 15,
          width: '80%',
          borderRadius: 10,
          marginVertical: 3,
        }}
      />
    </View>
  );
};

class SearchableTastingNots extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {},
      data: data,
      item: {},
      modalVisible: false,
      loading: false,
      visible: false,
      refreshing: false,
      // userData: {},
      ProductRating: [],
      page: 0,
      total: '',
      arrayholder: [],
      ProductRating: '',
      namekey: '',
      value: '',
      wineType: [],
    };
  }

  onRefresh() {
    this.setState(
      {
        refreshing: true,
        page: 0,
        ProductRating: [],
        namekey: '',
        value: '',
        wineType: [],
      },
      () => this.fetch(),
    );
  }

  componentWillMount = () => {
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  };

  componentWillUnmount = () => {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  };

  handleBackButtonClick = () => {
    this.props.navigation.navigate('Home');
    return true;
  };

  async componentDidMount() {
    this._isMounted = true;
    // const userdata = await _getUser();
    // console.log('USERDATAON Sparepart lease', userdata);
    // this.setState({userData: userdata.data});
    const Search = this.props.route.params.Search;
    if (Search) {
      {
        Object.entries(Search).map(([key, value]) => {
          console.log('Valuekey', key, value);
          if (key == 'product_name') {
            this.setState({namekey: key, value}, () => this.fetch());
            console.log('Key value', key, value);
          } else if (key == 'supplierName') {
            this.setState({namekey: key, value}, () => this.fetch());
          } else if (key == 'date') {
            this.setState({namekey: key, value}, () => this.fetch());
          } else if (key == 'wineType') {
            let wine = [];
            const arr = value.map(item => item.value);
            console.log('Arrwinetype', arr);
            wine.push(arr);
            this.setState({namekey: key, wineType: arr}, () => this.fetch());
          }
        });
      }
    }
  }

  fetch = async () => {
    const {namekey, value, wineType} = this.state;
    console.log('WinApi', wineType, namekey, value);
    this.setState({loading: true});
    // http.get(`sommelier/eventproductrating?page=${this.state.page}&${value!=''&& namekey}=${value!=''&& value}&wineType[${wineType}]`).then(res => {
    http
      .get(
        `sommelier/eventproductrating?page=${this.state.page}&${namekey}=${
          value != '' ? value : wineType
        }`,
      )
      .then(res => {
        console.log('responce of ProductRatinge noted Again Second', res.data);
        if (res.data != null) {
          this.setState({
            arrayholder: res.data,
            ProductRating:
              this.state.page === 0
                ? res.data
                : [...this.state.ProductRating, ...res.data],
            loading: false,
            total: res.total,
            refreshing: false,
          });
        } else {
          this.setState({
            ProductRating: [],
            arrayholder: [],
            refreshing: false,
            loading: false,
          });
        }
      })
      .catch(err => {
        console.log('errr Notification', err);
        this.setState({loading: false, refreshing: false});
        // this._snk.show("OIROOR")
      });
  };

  LoadMoreRandomData = () => {
    if (this.state.ProductRating.length < this.state.total) {
      this.setState(
        {
          page: this.state.page + 1,
        },
        () => this.fetch(),
      );
    }
    // }
  };

  _renderEmptyComponent() {
    return (
      !this.state.loading &&
      isEmpty(this.state.ProductRating) && (
        <FLEC
          textStyle={{color: white}}
          text="Currently No Tasting Notes Available."
        />
      )
    );
  }

  _renderFooterComponent() {
    return this.state.loading && !isEmpty(this.state.ProductRating) ? (
      <BottomIndicator />
    ) : null;
  }

  updateState(state) {
    this.setState({...state});
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  AcceptEvents(status, id) {
    console.log('eventidAcceptEvents', id);
    this.setState({loading: true});
    http
      .post('sommelier/changeeventrequeststatus', {
        event_id: id,
        status: status,
      })
      .then(res => {
        console.log('response changeeventrequeststatus..', res);
        this.props.navigation.push('Home');
        this.setState({loading: false, refreshing: false}, () =>
          Toast.show({
            text: `${res.message}`,
            // buttonText: 'Ok',
            duration: 2000,
          }),
        );
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

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  saveItem = item => {
    this.setState({item}, () => this.setModalVisible(true));
  };

  SearchFilterFunction(text) {
    console.log('hgdcjkTEXT', text);
    const newData = this.state.arrayholder.filter(function (item) {
      console.log('hgdcjk', item.product.title);
      const itemData = item.product.title
        ? item.product.title.toUpperCase()
        : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });

    const newRegion = this.state.arrayholder.filter(function (item) {
      console.log('hgdcjk', item.product.region);
      const regionData = item.product.region
        ? item.product.region.toUpperCase()
        : ''.toUpperCase();
      const regionText = text.toUpperCase();
      return regionData.indexOf(regionText) > -1;
    });
    console.log('newData......', newData);
    console.log('newRegion......', newRegion);

    this.setState({
      ProductRating: !isEmpty(newData) ? newData : newRegion,
      searchText: text,
    });
  }

  render() {
    const {item} = this.state;
    console.log('pdataNotedd Again', this.state.ProductRating);
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
          onPress={() => this.props.navigation.navigate('Home')}
          image={require('../../../assets/Logo.png')}
        />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{flexGrow: 1}}>
          <TouchableOpacity
            // onPress={() => this.props.navigation.navigate("Search")}
            onPress={() => this.props.navigation.navigate('Filter')}
            style={styles.searchcontainer}>
            <TextInput
              style={styles.input}
              editable={false}
              onChangeText={text => this.SearchFilterFunction(text)}
              value={this.state.searchText}
              underlineColorAndroid="transparent"
              placeholder="Search by Name "
              placeholderTextColor={'gray'}
            />
            <TouchableWithoutFeedback>
              <View style={styles.iconContainer}>
                <Image
                  source={Images.SearchIcon}
                  style={{height: 22, width: 22}}
                />
              </View>
            </TouchableWithoutFeedback>
          </TouchableOpacity>

          <View
            style={{
              marginHorizontal: 5,
              flexGrow: 1,
              justifyContent: 'center',
            }}>
            {this.state.loading && isEmpty(this.state.ProductRating) ? (
              <View>
                <Shimmer />
                <Shimmer />
                <Shimmer />
                <Shimmer />
              </View>
            ) : (
              <FlatList
                showsVerticalScrollIndicator={false}
                data={this.state.ProductRating}
                keyExtractor={(item, i) => i.toString()}
                horizontal={false}
                scrollEventThrottle={16}
                onEndReachedThreshold={0.5}
                onEndReached={this.LoadMoreRandomData}
                ListEmptyComponent={() => this._renderEmptyComponent()}
                ListFooterComponent={() => this._renderFooterComponent()}
                contentContainerStyle={{flexGrow: 1}}
                refreshControl={
                  <RefreshControl
                    refreshing={this.state.refreshing}
                    onRefresh={() => this.onRefresh()}
                  />
                }
                renderItem={({item}) => (
                  <TouchableWithoutFeedback>
                    <View
                      style={[
                        styles.view,
                        {
                          backgroundColor: white,
                          alignItems: 'center',
                          overflow: 'hidden',
                        },
                      ]}>
                      <View
                        style={{
                          width: 80,
                          height: 40,
                          position: 'absolute',
                          top: 0,
                          right: 0,
                        }}>
                        <TouchableOpacity
                          onPress={() => this.saveItem(item)}
                          activeOpacity={1}
                          style={{
                            height: 40,
                            widht: 30,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderBottomLeftRadius: 25,
                            backgroundColor: AcceptBottonColor,
                            flexDirection: 'row',
                          }}>
                          <Image
                            source={Images.StarIcon}
                            style={{height: 22, width: 22}}
                          />
                          <Text
                            style={[
                              styles.text,
                              {
                                color: white,
                                paddingHorizontal: 5,
                                fontWeight: '700',
                              },
                            ]}>
                            {item.overall}
                          </Text>
                        </TouchableOpacity>
                      </View>

                      <View
                        style={{
                          height: 120,
                          width: width,
                          justifyContent: 'center',
                          flexDirection: 'row',
                          marginTop: 25,
                          paddingHorizontal: 10,
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
                            <Image
                              style={{height: 50, width: 50, borderRadius: 25}}
                              source={{uri: item.product.Imagesrc}}
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
                          <Text
                            numberOfLines={1}
                            style={[
                              styles.text,
                              {
                                fontSize: 20,
                                width: '100%',
                                color: primaryColor,
                                textTransform: 'capitalize',
                                paddingVertical: 2,
                              },
                            ]}>
                            {item.product.title}
                          </Text>
                          {item.product.description == '' ? (
                            <Text
                              numberOfLines={2}
                              style={[
                                styles.text,
                                {
                                  fontSize: 12,
                                  width: '100%',
                                  color: 'gray',
                                  textTransform: 'capitalize',
                                  paddingVertical: 2,
                                },
                              ]}>
                              {item.product.description}
                            </Text>
                          ) : (
                            <View
                              style={{
                                maxHeight: 50,
                                overflow: 'hidden',
                                justifyContent: 'flex-start',
                              }}>
                              <HTML
                                style={[
                                  styles.text,
                                  {
                                    fontSize: 12,
                                    width: '100%',
                                    color: 'gray',
                                    textTransform: 'capitalize',
                                    paddingTop: 20,
                                  },
                                ]}
                                source={{html: item.product.description}}
                              />
                            </View>
                          )}
                          <View style={{flexDirection: 'row'}}>
                            <Image
                              source={Images.BritishPoundIcon}
                              style={{height: 22, width: 22}}
                              tintColor={'gray'}
                            />
                            <Text
                              numberOfLines={1}
                              style={[
                                styles.text,
                                {
                                  fontSize: 12,
                                  width: '100%',
                                  color: 'gray',
                                  textTransform: 'capitalize',
                                  paddingVertical: 2,
                                },
                              ]}>
                              {item.product.price}
                            </Text>
                          </View>
                        </View>
                      </View>

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
                            <Text style={{fontSize: 15, color: primaryColor}}>
                              {moment(item.created_at).format('DD/MM/YYYY')}
                            </Text>
                          </View>
                          <View style={{marginVertical: 5}}>
                            <Text style={{color: 'gray'}}>Location</Text>
                            <Text style={{fontSize: 15, color: primaryColor}}>
                              {item.product.city
                                ? item.product.city
                                : item.product.region}
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
                            <Text style={{fontSize: 15, color: primaryColor}}>
                              {moment(item.created_at).format('HH:mm')}
                            </Text>
                          </View>
                          <TouchableOpacity
                            onPress={() => this.saveItem(item)}
                            activeOpacity={1}
                            style={{
                              marginTop: 3,
                              height: 40,
                              justifyContent: 'center',
                              alignItems: 'center',
                              borderRadius: 15,
                              backgroundColor: primaryColor,
                              width: '80%',
                              flexDirection: 'row',
                            }}>
                            {/* <Icon
                              name="star"
                              type="FontAwesome"
                              style={{fontSize: 20, color: white}}
                            /> */}
                            <Text
                              style={[
                                styles.text,
                                {
                                  fontSize: 14,
                                  color: white,
                                  paddingHorizontal: 5,
                                  fontWeight: '700',
                                },
                              ]}>
                              Read More
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </TouchableWithoutFeedback>
                )}
              />
            )}
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
                <TouchableOpacity
                  onPress={() => {
                    this.setModalVisible(false);
                  }}
                  style={{
                    height: 30,
                    width: 30,
                    borderRadius: 15,
                    backgroundColor: white,
                    position: 'absolute',
                    top: -10,
                    right: -10,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={Images.CancelIcon}
                    style={{height: 30, width: 30}}
                  />
                </TouchableOpacity>
                <View style={styles.modelheader}>
                  <Text
                    style={[
                      {
                        color: primaryColor,
                        fontWeight: 'bold',
                        fontSize: 20,
                        fontFamily: sofiaFont,
                      },
                    ]}>
                    Tasting notes for {item.product.title}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    paddingHorizontal: 10,
                    backgroundColor: white,
                    borderRadius: 10,
                    alignSelf: 'flex-start',
                    alignItems: 'flex-start',
                  }}>
                  <View
                    style={{
                      flexDirection: 'column',
                      flex: 0.5,
                      paddingHorizontal: 10,
                    }}>
                    <View style={{marginVertical: 5}}>
                      <Text style={{color: 'gray'}}>Intensity</Text>
                      <Text style={{fontSize: 15, color: primaryColor}}>
                        {item.intensity}
                      </Text>
                    </View>

                    <View style={{marginVertical: 5}}>
                      <Text style={{color: 'gray'}}>Tanin</Text>
                      <Text style={{fontSize: 15, color: primaryColor}}>
                        {item.tannin}
                      </Text>
                    </View>
                    <View style={{marginVertical: 5}}>
                      <Text style={{color: 'gray'}}>Sweetness</Text>
                      <Text style={{fontSize: 15, color: primaryColor}}>
                        {item.sweetness}
                      </Text>
                    </View>
                    <View style={{marginVertical: 5}}>
                      <Text style={{color: 'gray'}}>Balance</Text>
                      <Text style={{fontSize: 15, color: primaryColor}}>
                        {item.balance}
                      </Text>
                    </View>
                    <View style={{marginVertical: 5}}>
                      <Text style={{color: 'gray'}}>Finish</Text>
                      <Text style={{fontSize: 15, color: primaryColor}}>
                        {item.finish}
                      </Text>
                    </View>
                    <View style={{marginVertical: 5}}>
                      <Text style={{color: 'gray'}}>Score</Text>
                      <Text style={{fontSize: 15, color: primaryColor}}>
                        {item.overall}
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
                      <Text style={{color: 'gray'}}>Acidity</Text>
                      <Text style={{fontSize: 15, color: primaryColor}}>
                        {item.acidity}
                      </Text>
                    </View>
                    <View style={{marginVertical: 5}}>
                      <Text style={{color: 'gray'}}>Body</Text>
                      <Text style={{fontSize: 15, color: primaryColor}}>
                        {item.body}
                      </Text>
                    </View>
                    <View style={{marginVertical: 5}}>
                      <Text style={{color: 'gray'}}>Complexity</Text>
                      <Text style={{fontSize: 15, color: primaryColor}}>
                        {item.complexity}
                      </Text>
                    </View>
                    <View style={{marginVertical: 5}}>
                      <Text style={{color: 'gray'}}>Maturity</Text>
                      <Text style={{fontSize: 15, color: primaryColor}}>
                        {item.maturity}
                      </Text>
                    </View>
                    <View style={{marginVertical: 5}}>
                      <Text style={{color: 'gray'}}>Listing Candidate</Text>
                      <Text style={{fontSize: 15, color: primaryColor}}>
                        {item.listing_candidate}
                      </Text>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    marginVertical: 5,
                    marginHorizontal: 5,
                    paddingHorizontal: 10,
                  }}>
                  <Text style={{color: 'gray'}}>Description</Text>
                  <Text style={{fontSize: 15, color: primaryColor}}>
                    {item.description}
                  </Text>
                </View>
                {!isNull(item.flavours) && (
                  <View
                    style={{
                      marginVertical: 5,
                      marginHorizontal: 5,
                      paddingHorizontal: 10,
                    }}>
                    <Text style={{color: 'gray'}}>Flavours</Text>
                    <Text style={{fontSize: 15, color: primaryColor}}>
                      {item.flavours.map(item => item).join(', ')}
                    </Text>
                  </View>
                )}
                <TouchableOpacity
                  style={{
                    paddingVertical: 10,
                    width: '80%',
                    alignItems: 'center',
                    flexDirection: 'row',
                    paddingHorizontal: 10,
                  }}>
                      <Image
                    source={
                      !isEmpty(item) && item.is_favourite == 1
                        ? Images.FavouriteSelectedIcon
                        : Images.HeartIcon
                    }
                    style={{
                      height: 20,
                      width: 20,
                      color:
                        !isEmpty(item) && item.is_favourite == 1
                          ? primaryColor
                          : 'gray',
                    }}
                    tintColor={'red'}
                  />
                  {/* <Icon
                    name={
                      !isEmpty(item) && item.is_favourite == 1
                        ? 'heart'
                        : 'hearto'
                    }
                    type="AntDesign"
                    style={{
                      color:
                        !isEmpty(item) && item.is_favourite == 1
                          ? primaryColor
                          : 'gray',
                    }}
                  /> */}
                  <Text style={{color: primaryColor, paddingHorizontal: 10}}>
                    Favourite
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
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
    color: white,
    fontSize: 25,
    fontFamily: sofiaFont,
  },
  text: {
    color: white,
    fontSize: 14,
    fontFamily: sofiaFont,
  },
  view: {
    flex: 1,
    marginVertical: 5,
    borderRadius: 5,
    paddingBottom: 10,
  },
  modelView: {
    height: '80%',
    width: width - 20,
    backgroundColor: white,
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginTop: 60,
  },
  modelheader: {
    // height: 130,
    padding: 20,
    marginBottom: 2,
    width: '90%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 18,
  },
  searchcontainer: {
    flexDirection: 'row',
    backgroundColor: white,
    width: '95%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 20,
    marginBottom: 10,
  },
  icon: {
    fontSize: 20,
    color: 'gray',
    fontFamily: sofiaFont,
  },
  input: {
    width: '80%',
    color: 'black',
    fontFamily: sofiaFont,
  },
});

const mapProps = state => ({
  user: state.root.user,
});

export default connect(mapProps, null)(SearchableTastingNots);
