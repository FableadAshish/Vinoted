import React, { Component, useEffect } from 'react';
import {
  FlatList,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
  Text,
  Alert,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import Header from '../../component/Header/Header';
// import {Icon, Button} from 'native-base';
import EventRequest from '../../component/CustomeComponent/EventRequestcard';
import {
  white,
  secondryTextColor,
  primaryColor,
  primaryTextColor,
  sofiaFont,
} from '../../style/variables';
import { _getUser, _handleAuthUser } from '../../api/auth';
import FLEC from '../../component/Common/FLEC';
import BottomIndicator from '../../component/Indicator/BottomIndicator';
import { isEmpty } from 'lodash';
import { connect } from 'react-redux';
import http from '../../http';
import moment from 'moment';
import firebase from '@react-native-firebase/app';
import messaging from '@react-native-firebase/messaging';
const { width, height } = Dimensions.get('window');
import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import { Images } from '../../../theme/Images';
import { requestUserPermission } from '../../push_notification_helper';

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

const Shimmer = ({ }) => {
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
        <View style={{ flex: 0.3, justifyContent: 'center' }}>
          <View
            style={{
              justifyContent: 'center',
              paddingHorizontal: 5,
              height: 100,
              width: 100,
              borderRadius: 50,
            }}>
            <ShimmerPlaceHolder
              style={{ height: 50, width: 50, borderRadius: 25 }}
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


const Shimmer2 = ({ }) => {
  return (
    <View
      style={{
        width: 130,
        height: 170,
        borderRadius: 10,
        marginHorizontal: 10,
        backgroundColor: white,
      }}>
      <ShimmerPlaceHolder
        style={{
          height: 80,
          width: '90%',
          borderRadius: 10,
          marginVertical: 5,
          alignSelf: 'center',
        }}
      />
      <ShimmerPlaceHolder
        style={{
          height: 15,
          width: '60%',
          borderRadius: 10,
          marginVertical: 3,
          marginHorizontal: 5,
        }}
      />
      <ShimmerPlaceHolder
        style={{
          height: 15,
          width: '80%',
          borderRadius: 10,
          marginVertical: 3,
          marginHorizontal: 5,
        }}
      />
      <ShimmerPlaceHolder
        style={{
          height: 15,
          width: '80%',
          borderRadius: 10,
          marginVertical: 3,
          marginHorizontal: 5,
        }}
      />
    </View>
  );
};

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {},
      Events: [],
      user: {},
      PendingEvent: [],
      modalVisible: false,
      visible: false,
      refreshing: false,
      page: 0,
      total: '',
    };
  }

  UNSAFE_componentWillMount() {
    this._backEnable = this.props.navigation.addListener('focus', payload => {
      console.log('focused first time');
      this.backHandler = BackHandler.addEventListener(
        'backPress',
        this.handleBackButton.bind(this),
      );
    });

    this._backDisable = this.props.navigation.addListener('blur', payload => {
      console.log('calling blur...');
      if (this.backHandler) { this.backHandler.remove(); }
    });
  }

  handleBackButton = value => {
    Alert.alert(
      'Exit App',
      'Are you sure you want to exit the application?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => BackHandler.exitApp(),
        },
      ],
      {
        cancelable: false,
      },
    );
    return true;
  };
  componentWillUnmount() {
    if (this.backHandler) { this.backHandler.remove(); }
    this._backEnable();
    this._backDisable();
  }

  // componentWillMount = () => {

  //     BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  // }

  // componentWillUnmount = () => {

  //     BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  // }

  //     handleBackButtonClick = async() => {
  //         BackHandler.exitApp()

  //       return true

  // }

  // backActionHandler = () => {

  //     Alert.alert(
  //         'Exit App',
  //         'Are you sure you want to exit the application?',
  //         [
  //             {
  //                 text: 'Cancel',
  //                 onPress: () => console.log('Cancel Pressed'),
  //                 style: 'cancel',
  //             },
  //             {
  //                 text: 'OK',
  //                 onPress: () => this.callhandle(),
  //             },
  //         ],
  //         {
  //             cancelable: false,
  //         },
  //     );
  //     return true;
  //   };

  //   callhandle=()=>{
  //     BackHandler.exitApp((("Vinoted").self.getApplicationContext()).kill());

  //     // this.setState({Events: [],
  //     //     PendingEvent: [],},()=>BackHandler.exitApp() self.)

  //   }

  //   UNSAFE_componentWillMount=() => {

  //     // Add event listener for hardware back button press on Android
  //     BackHandler.addEventListener("hardwareBackPress", this.backActionHandler);

  //     return () =>
  //       // clear/remove event listener
  //       BackHandler.removeEventListener("hardwareBackPress", this.backActionHandler);
  //   }

  componentDidMount = async () => {

    const getuser = await _getUser();
    console.log("data Loaded", getuser.data)
    this.setState({ user: getuser.data });
    this.PendingEvents();
    this.Store();
    requestUserPermission()

    messaging().subscribeToTopic(`user_id_${getuser.data.user.id}`);
    messaging().subscribeToTopic('vinoted');
  };
  checkNotificationPermission = () => {
    messaging()
      .hasPermission()
      .then(enabled => {
        if (!enabled) {
          this.promptForNotificationPermission();
        }
      });
  };

  promptForNotificationPermission = () => {
    messaging()
      .requestPermission({ provisional: true })
      .then(() => {
        console.log('Permission granted.');
      })
      .catch(() => {
        console.log('Permission rejected.');
      });
  };

  createAndroidNotificationChannel() {
    const channel = new firebase.notifications.Android.Channel(
      'channelId',
      'Push Notification',
      firebase.notifications.Android.Importance.Max,
    ).setDescription('Turn on to receive push notification');

    firebase.notifications().android.createChannel(channel);
  }
  foregroundState = () => {
    const unsubscribe = messaging().onMessage(async notification => {
      console.log('Message handled in the foregroundState!', notification);
    });

    return unsubscribe;
  };

  // Register background handler
  backgroundState = () => {
    messaging().setBackgroundMessageHandler(async notification => {
      console.log('Message handled in the background!', notification);
    });
  };

  unreadMessages = ()=>{
    
  }
  Store = async () => {
    this.setState({ loading: true });

    http.get("https://www.admin.vinoted-admin.com/api/unreadMsg")
    .then((res) => console.log("res for unread Message", res))
    .catch(err => console.log("error for unread Message",err));

    http
      .get(`sommelier/events?type=pendingrequest&page=${this.state.page}`)
      .then(res => {
        console.log('response Events..', res);
        this.setState(
          {
            Events:
              this.state.page === 0
                ? res.data.page.data
                : [...this.state.Events, ...res.data.page.data],
            loading: false,
            // total: res.data.enquires.total,
            refreshing: false,
          },
          () => console.log('Events', this.state.Events),
        );
      })
      .catch(err => {
        let errors = {};
        if (err && err.status == 422) { errors = err.errors; }
        this.setState({ errors, loading: false, refreshing: false });
      });

  };

  LoadMoreRandomData = () => {
    console.log('length is here', this.state.Events.length);
    if (this.state.Events.length < this.state.total) {
      this.setState(
        {
          page: this.state.page + 1,
        },
        () => this.Store(),
      );
    };
  };

  _renderEmptyComponent() {
    return (
      !this.state.loading &&
      isEmpty(this.state.Events) && (
        <FLEC
          text="Currently No Events Waiting For Approval"
        // image={require('../../../assets/logo.png')}
        />
      )
    );
  }

  _renderFooterComponent() {
    return this.state.loading && !isEmpty(this.state.Events) ? (
      <BottomIndicator />
    ) : null;
  }

  onRefresh = () => {
    this.setState(
      {
        refreshing: true,
        Events: [],
        PendingEvent: [],
      },
      () => this.Refreshfunction(),
    );
  };

  Refreshfunction() {
    this.PendingEvents();
    this.Store();
  }



  PendingEvents = async () => {
    this.setState({ loading: true });
    http
      .get(`sommelier/events?type=pendingevent`)
      .then(res => {
        console.log('response pendingevent..', res);
        this.setState(
          {
            PendingEvent: res.data.page.data,
            loading: false,
            refreshing: false,
          },
          () => console.log('Events111', this.state.PendingEvent),
        );
      })
      .catch(err => {
        let errors = {};
        if (err && err.status == 422) { errors = err.errors; }
        this.setState({ errors, loading: false, refreshing: false });
      });
  };

  SearchFilterFunction(text) {
    console.log('hgdcjkTEXT', text);
  }

  render() {
    const { user, PendingEvent, Events, Eventitem } = this.state;
    console.log('hgdcjkTEXTPendingEvent', PendingEvent);
    console.log('hgdcjkTEXT', Events);
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: primaryColor,
        }}>
        <Header
          navigation={this.props.navigation}
          iconColor={white}
          iconProps={Images.MenuBarIcon}
          onPress={() => this.props.navigation.toggleDrawer()}
          image={require('../../assets/Logo.png')}
        />
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={() => this.onRefresh()}
            />
          }>
          <View style={{ flex: 1 }}>
            {!this.state.loading && !isEmpty(user) ? (
              <View
                style={{
                  marginHorizontal: 10,
                  marginBottom: 15,
                  alignItems: 'flex-start',
                  width: '90%',
                }}>
                {/* <Text
                  style={{
                    fontFamily: sofiaFont,
                    fontSize: 25,
                    color: secondryTextColor,
                  }}>
                  Welcome {user.user.name}!
                </Text> */}
              </View>
            ) : (
              <View
                style={{
                  width: '90%',
                  alignSelf: 'center',
                  height: 40,
                  marginBottom: 15,
                  justifyContent: 'center',
                }}>
                <ShimmerPlaceHolder
                  style={{
                    height: 20,
                    width: '80%',
                    borderRadius: 10,
                    marginVertical: 3,
                  }}
                />
                {/* <ShimmerPlaceHolder style={{ height: 20, width: "80%", borderRadius: 10, marginVertical: 3 }} /> */}
              </View>
            )}

            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Search')}
              style={styles.searchcontainer}>
              <Text
                style={{
                  width: '80%',
                  color: primaryColor,
                  fontFamily: sofiaFont,
                }}>
                Search Here..
              </Text>
              <TouchableWithoutFeedback>
                <View style={styles.iconContainer}>
                  <Image
                    source={Images.SearchIcon}
                    style={{ height: 25, width: 25 }}
                  />
                  {/* <Icon
                    name="search"
                    type="FontAwesome"
                    style={styles.icon}></Icon> */}
                </View>
              </TouchableWithoutFeedback>
            </TouchableOpacity>

            <View style={{ marginHorizontal: 10, marginTop: 10 }}>
              <Text style={[styles.textheading, { color: white }]}>
                Upcoming Events
              </Text>
            </View>

            <View
              style={{ height: 170, flexDirection: 'row', marginVertical: 20 }}>
              {this.state.loading && isEmpty(this.state.PendingEvent) ? (
                <View style={{ flexDirection: 'row' }}>
                  <Shimmer2 />
                  <Shimmer2 />
                  <Shimmer2 />
                </View>
              ) : !this.state.loading && isEmpty(this.state.PendingEvent) ? (
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                  }}>
                  <Text
                    style={{
                      color: white,
                      textAlign: 'center',
                      fontFamily: sofiaFont,
                    }}>
                    There Are Currently No Upcoming Events
                  </Text>
                </View>
              ) : (
                <FlatList
                  showsVerticalScrollIndicator={false}
                  data={this.state.PendingEvent}
                  keyExtractor={(item, i) => i.toString()}
                  horizontal={true}
                  scrollEventThrottle={16}
                  onEndReachedThreshold={0.5}
                  showsVerticalScrollIndicator={false}
                  // onEndReached={()=>this.LoadMoreRandomData()}
                  // ListEmptyComponent={!this.state.loading && isEmpty(this.state.PendingEvent) && <FLEC text="No Data Available"/>}
                  // ListFooterComponent={this.state.loading && !isEmpty(this.state.PendingEvent) ? (
                  //     <BottomIndicator />
                  // ) : null}
                  contentContainerStyle={{ flexGrow: 1 }}
                  refreshControl={
                    <RefreshControl
                      refreshing={this.state.refreshing}
                      onRefresh={this.onRefresh}
                    />
                  }
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      onPress={() =>
                        this.props.navigation.push('ProEventDetails', {
                          Eventitem: item,
                        })
                      }>
                      <View
                        style={[
                          styles.view,
                          {
                            width: 140,
                            alignItems: 'center',
                            backgroundColor: white,
                            marginHorizontal: 10,
                          },
                        ]}>
                        <Image
                          style={{ height: 80, width: '100%', borderRadius: 10 }}
                          source={{ uri: item.Imagesrc }}
                        />
                        <Text
                          numberOfLines={1}
                          style={[
                            styles.text,
                            {
                              fontFamily: sofiaFont,
                              fontSize: 18,
                              width: '100%',
                              color: primaryColor,
                              textTransform: 'capitalize',
                              paddingVertical: 2,
                            },
                          ]}>
                          {item.name}
                        </Text>
                        <Text
                          numberOfLines={1}
                          style={[
                            styles.text,
                            {
                              fontFamily: sofiaFont,
                              fontSize: 12,
                              width: '100%',
                              color: 'lightgray',
                              textTransform: 'capitalize',
                              paddingVertical: 2,
                            },
                          ]}>
                          {moment(item.date).format('DD/MM/YYYY')} |{' '}
                          {moment(item.date).format('HH:mm')}{' '}
                        </Text>
                        {!isEmpty(item.country_name) &&
                          item.country_name != null && (
                            <Text
                              numberOfLines={1}
                              style={[
                                styles.text,
                                {
                                  fontFamily: sofiaFont,
                                  fontSize: 12,
                                  width: '100%',
                                  color: primaryTextColor,
                                  textTransform: 'capitalize',
                                  paddingVertical: 2,
                                },
                              ]}>
                              {item.country_name}
                            </Text>
                          )}
                      </View>
                    </TouchableOpacity>
                  )}
                />
              )}
            </View>

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
              <View style={{ marginHorizontal: 10 }}>
                <Text style={styles.textheading}>Requested Events</Text>
              </View>

              <View style={[styles.view, { flex: 1, minHeight: 300 }]}>
                {this.state.loading && isEmpty(this.state.Events) ? (
                  <View>
                    <Shimmer />
                    <Shimmer />
                    <Shimmer />
                  </View>
                ) : (
                  <FlatList
                    showsVerticalScrollIndicator={false}
                    data={this.state.Events}
                    keyExtractor={(item, i) => i.toString()}
                    horizontal={false}
                    scrollEventThrottle={16}
                    onEndReachedThreshold={0.5}
                    showsVerticalScrollIndicator={false}
                    onEndReached={this.LoadMoreRandomData}
                    ListEmptyComponent={() => this._renderEmptyComponent()}
                    ListFooterComponent={() => this._renderFooterComponent()}
                    contentContainerStyle={{ flexGrow: 1 }}
                    refreshControl={
                      <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this.onRefresh}
                      />
                    }
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        onPress={() =>
                          this.props.navigation.push('ProEventDetails', {
                            Eventitem: item,
                          })
                        }>
                        <EventRequest
                          onPress={() =>
                            this.props.navigation.push('ProEventDetails', {
                              Eventitem: item,
                            })
                          }
                          // more='More'
                          // more={this.state.Events.is_started == 0 && "More"}
                          morefromHome={'More'}
                          type={item.country_name}
                          imagelist={item.Imagesrc}
                          homedate={moment(item.date).format('DD/MM/YYYY')}
                          hometime={moment(item.date).format('HH:mm')}
                          title={item.name}
                        />
                      </TouchableOpacity>
                    )}
                  />
                )}
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headingtitle: {
    fontSize: 15,
    fontFamily: sofiaFont,
    opacity: 0.6,
    marginVertical: 5,
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
  view: {
    flex: 1,
    marginVertical: 1,
    backgroundColor: white,
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
  searchcontainer: {
    flexDirection: 'row',
    backgroundColor: white,
    width: '95%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 20,
  },
  icon: {
    fontSize: 20,
    color: 'gray',
    fontFamily: sofiaFont,
  },
  input: {
    width: '80%',
    color: primaryColor,
  },
});

const mapProps = state => ({
  utilities_all: state.root.utilities_all,
  user: state.root.user,
  theme: state.root.theme,
  // console.log('state.toot.utilities', state.root.utilities_all),
});

export default connect(mapProps, null)(Home);


