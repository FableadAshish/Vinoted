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
  TouchableOpacity,
  RefreshControl,
  TextInput,
  BackHandler,
} from 'react-native';
import Header from '../../../component/Header/Header';
import {Icon, Button} from 'native-base';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import CardList from '../../../component/CustomeComponent/CardList';
import BottomIndicator from '../../../component/Indicator/BottomIndicator';
import {
  white,
  secondryTextColor,
  secondryColor,
  primaryColor,
  cardBackground,
  sofiaFont,
} from '../../../style/variables';
import {isEmpty, isNull} from 'lodash';
import {connect} from 'react-redux';
import http from '../../../http';
import FLEC from '../../../component/Common/FLEC';
import FPI from '../../../component/Indicator/FPI';
const {width, height} = Dimensions.get('window');
import LinearGradient from 'react-native-linear-gradient';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);
import moment from 'moment';
import * as RootNavigation from '../../../navigation/RootNavigation';
import {compose} from 'redux';
import {Images} from '../../../../theme/Images';

let data = ['1', '2', '3', '4', '5'];

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

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: new Date(),
      form: {},
      data: data,
      UsersList: {},
      modalVisible: false,
      visible: false,
      refreshing: false,
      page: 0,
      total: '',
      loading: false,
      text: '',
      searchdata: [],
      liveMessages: 0,
    };
  }

  componentDidMount() {
    this.Store();
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.Store();
    });
  }

  // _fetchLiveMessage(){
  //   this.setState({liveMessages: liveMessages++})
  // }
  UNSAFE_componentWillMount = () => {
    // this.backHandler1 = BackHandler.addEventListener(
    //     'hardwareBackPress',
    //     this.handleBackButtonClick.bind(this),
    // );
    // BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    // this._backDisable1 = this.props.navigation.addListener('blur', payload => {
    //     console.log('calling blur...');
    //     if (this.backHandler) this.backHandler.remove();
    // });
  };

  componentWillUnmount = () => {
    this._unsubscribe();
    //  this.backHandler1()
    //  this._backDisable1()
    //  BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  };

  handleBackButtonClick = () => {
    //NavigationIssue
    if (this.props.route.params) {
      // console.log('**Calling');
      this.props.navigation.replace('App', {screen: 'Home'});
    } else {
      // console.log('%%Calling');
      this.props.navigation.goBack(); //Change in  future
      BackHandler.removeEventListener('hardwareBackPress');
    }

    return true;
  };

  Store = async () => {
    this.setState({loading: true});
    // http.get(`sommelier/suppliers?page=${this.state.page}`).then(res => {
    http
      .get(`chatlist?page=${this.state.page}`)
      .then(res => {
        // console.log('chatres', res);
        this.setState({
          UsersList:
            this.state.page === 0
              ? res.data
              : [...this.state.UsersList, ...res.data],
          loading: false,
          // total: res.data.enquires.total,
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

  LoadMoreRandomData = () => {
    // console.log('length', this.state.UsersList.length);
    if (this.state.UsersList.length < this.state.total) {
      this.setState(
        {
          page: this.state.page + 1,
        },
        () => this.Store(),
      );
    }
  };

  _renderEmptyComponent() {
    return (
      !this.state.loading &&
      isEmpty(this.state.UsersList) && (
        <FLEC
          text="No data available"
          // image={require('../../../assets/logo.png')}
        />
      )
    );
  }

  _renderFooterComponent() {
    return this.state.loading && !isEmpty(this.state.UsersList) ? (
      <BottomIndicator />
    ) : null;
  }
  onRefresh = () => {
    this.setState(
      {
        refreshing: true,
        UsersList: [],
      },
      () => this.Store(),
    );
  };

  SearchFilterFunction(text) {
    console.log('hgdcjkTEXT', text);
    this.setState({text});
    if (text == '') {
      this.Store();
    } else {
      http
        .get(`sommelier/suppliers?search=${text}`)
        .then(res => {
          console.log('response search', res);
          this.setState({
            searchdata: res.data.page,
            loading: false,
            refreshing: false,
          });

          //  this.props.navigation.navigate("Chat",{item:item,Session:res.data})
        })
        .catch(err => {
          console.log('errorrr', err);
          let errors = {};
          if (err && err.status == 422) {
            errors = err.errors;
          }
          this.setState({loading: false, errors, refreshing: false});
        });
    }
  }

  createSession(item) {
    console.log('chate....', item);
    this.props.navigation.navigate('Chat', {item: item});
  }

  render() {
    const {UsersList, currentDate} = this.state;
    // console.log('Thius is UsersList', UsersList);
    // this.setState({liveMessages: })

    if (this.state.loading) {
      return (
        <View style={{backgroundColor: white}}>
          <Header
            navigation={this.props.navigation}
            iconColor={primaryColor}
            iconProps={Images.BackNavigationIcon}
            onPress={() =>
              //this.props.navigation.replace("App",{screen: "Home"})
              this.props.navigation.goBack()
            }
            image={Images.blueLogo}
          />
          <Shimmer />
          <Shimmer />
          <Shimmer />
          <Shimmer />
          <Shimmer />
          <Shimmer />
          <Shimmer />
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
          onPress={() =>
            //this.props.navigation.replace("App", {screen:"Home"})
            this.props.navigation.goBack()
          }
          image={Images.blueLogo}
        />

        <View style={styles.searchcontainer}>
          <TextInput
            style={styles.input}
            // onChangeText={text => this.onTyping(text)}
            onChangeText={text => this.SearchFilterFunction(text)}
            value={this.state.searchText}
            underlineColorAndroid="transparent"
            placeholder="Search Here"
            placeholderTextColor={white}
          />
          <TouchableWithoutFeedback>
            <View style={styles.iconContainer}>
              {/* <Icon
                onPress={() => this.SearchFilterFunction(this.state.text)}
                name="search"
                type="FontAwesome"
                style={styles.icon}></Icon> */}
              <TouchableOpacity
                onPress={() => this.SearchFilterFunction(this.state.text)}>
                <Image
                  source={Images.SearchIcon}
                  tintColor={white}
                  style={styles.icon}
                />
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>

        {this.state.loading && isEmpty(this.state.UsersList) ? (
          <View>
            <Shimmer />
            <Shimmer />
            <Shimmer />
            <Shimmer />
            <Shimmer />
            <Shimmer />
            <Shimmer />
          </View>
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{flexGrow: 1}}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={() => this.onRefresh()}
              />
            }>
            <View style={{marginHorizontal: 5}}>
              <View style={styles.view}>
                <Text style={styles.textheading}>All Suppliers</Text>
              </View>
              {this.state.text == '' ? (
                <View style={styles.view}>
                  <FlatList
                    showsVerticalScrollIndicator={false}
                    data={this.state.UsersList}
                    keyExtractor={(item, i) => i.toString()}
                    scrollEventThrottle={16}
                    onEndReachedThreshold={0.5}
                    showsVerticalScrollIndicator={false}
                    onEndReached={this.LoadMoreRandomData}
                    ListEmptyComponent={() => this._renderEmptyComponent()}
                    ListFooterComponent={() => this._renderFooterComponent()}
                    contentContainerStyle={{flexGrow: 1}}
                    refreshControl={
                      <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this.onRefresh}
                      />
                    }
                    renderItem={({item}) => {
                      console.log(
                        'chate....UsersList',
                        item.session.respective_user.profile,
                      );
                      return (
                        <TouchableOpacity
                          onPress={() => this.createSession(item)}>
                          <CardList
                            onPress={() => this.createSession(item)}
                            imagelist={
                              !isEmpty(item.profile)
                                ? item.profile
                                : 'https://www.freeiconspng.com/uploads/customers-icon-3.png'
                            }
                            subtitle={
                              item.message != '' ? item.message.content : ''
                            }
                            ShowCount={
                              item.session.unreadCount > 0 &&
                              item.session.unreadCount
                            }
                            // ShowCount={2}
                            title={
                              !isEmpty(item.session.respective_user.profile) &&
                              item.session.respective_user.profile.first_name
                            }
                            date={
                              //item.message!=''?
                              moment(currentDate).format('DD MMM YYYY') ==
                              moment(item.message.created_at).format(
                                'DD MMM YYYY',
                              )
                                ? moment(item.message.created_at).format(
                                    'HH:mm',
                                  )
                                : moment(item.message.created_at).format(
                                    'DD MMM YYYY',
                                  )
                              //:""
                            }
                          />
                        </TouchableOpacity>
                      );
                    }}
                  />
                </View>
              ) : (
                <View style={styles.view}>
                  <FlatList
                    showsVerticalScrollIndicator={false}
                    data={this.state.searchdata}
                    keyExtractor={(item, i) => i.toString()}
                    scrollEventThrottle={16}
                    onEndReachedThreshold={0.5}
                    showsVerticalScrollIndicator={false}
                    onEndReached={this.LoadMoreRandomData}
                    ListEmptyComponent={() => this._renderEmptyComponent()}
                    ListFooterComponent={() => this._renderFooterComponent()}
                    contentContainerStyle={{flexGrow: 1}}
                    refreshControl={
                      <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this.onRefresh}
                      />
                    }
                    renderItem={({item}) => {
                      console.log('searchobject', item);
                      return (
                        <TouchableOpacity
                          onPress={() => this.createSession(item)}>
                          <CardList
                            onPress={() => this.createSession(item)}
                            imagelist={
                              !isEmpty(item.profile)
                                ? item.profile.photo
                                : 'https://www.freeiconspng.com/uploads/customers-icon-3.png'
                            }
                            subtitle={item.email}
                            title={
                              !isEmpty(item.profile) && item.profile.first_name
                            }
                            date={
                              //item.message!=''?
                              moment(currentDate).format('DD MMM YYYY') ==
                              moment(item.created_at).format('DD MMM YYYY')
                                ? moment(item.created_at).format('HH:mm')
                                : moment(item.created_at).format('DD MMM YYYY')
                              //:""
                            }
                          />
                        </TouchableOpacity>
                      );
                    }}
                  />
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
    fontFamily: sofiaFont,
  },
  view: {
    flex: 1,
    marginVertical: 1,
    backgroundColor: white,
    justifyContent: 'center',
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
    width: '90%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 20,
  },
  icon: {
    height: 25,
    width: 25,
    color: white,
    fontFamily: sofiaFont,
  },
});

const mapProps = state => ({
  utilities_all: state.root.utilities_all,
  user: state.root.user,
  theme: state.root.theme,
  // console.log('state.toot.utilities', state.root.utilities_all),
});

export default connect(mapProps, null)(Index);
