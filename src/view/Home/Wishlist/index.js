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
import SearchCard from '../../../component/CustomeComponent/SearchCard';
import Header from '../../../component/Header/Header';
import {Icon, Button} from 'native-base';
import {
  white,
  secondryTextColor,
  secondryColor,
  primaryColor,
  primaryTextColor,
  sofiaFont,
} from '../../../style/variables';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import {isEmpty, isNull} from 'lodash';
import {connect} from 'react-redux';
import http from '../../../http';
import FLEC from '../../../component/Common/FLEC';
import FPI from '../../../component/Indicator/FPI';
import moment from 'moment';
import BottomIndicator from '../../../component/Indicator/BottomIndicator';
const {width, height} = Dimensions.get('window');
import LinearGradient from 'react-native-linear-gradient';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import {Images} from '../../../../theme/Images';
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

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {},
      data: data,
      Wishlist: [],
      modalVisible: false,
      visible: false,
      refreshing: false,
      page: 0,
      total: '',
    };
  }

  componentDidMount() {
    // this._unsubscribe = this.props.navigation.addListener('focus', () => {
    //     console.log('hello');
    this.Store();
    // });
  }

  Store = async () => {
    this.setState({loading: true});
    http
      .get(`sommelier/myfavouriterating?page=${this.state.page}`)
      .then(res => {
        console.log('response Wishlist..', res);
        // this.setState({Wishlist:res.data,loading: false,refreshing: false})
        this.setState({
          Wishlist:
            this.state.page === 0
              ? res.data.data
              : [...this.state.Wishlist, ...res.data.data],
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
    console.log('length', this.state.Wishlist.length);
    if (this.state.Wishlist.length < this.state.total) {
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
      isEmpty(this.state.Wishlist) && (
        <FLEC
          text="Currently No Wines Have Been Favourited"
          // image={require('../../../assets/logo.png')}
        />
      )
    );
  }

  _renderFooterComponent() {
    return this.state.loading && !isEmpty(this.state.Wishlist) ? (
      <BottomIndicator />
    ) : null;
  }

  onRefresh = () => {
    this.setState(
      {
        refreshing: true,
        Wishlist: [],
      },
      () => this.Store(),
    );
  };

  removeItem() {
    return (console.log('itemn'));
  }

  render() {
    console.log('pdata........', this.state.Wishlist);
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
          iconProps={Images.BackNavigationIcon}
          onPress={() => this.props.navigation.goBack()}
          image={require('../../../assets/blueLogo.png')}
        />

        <View style={{marginHorizontal: 5, flex: 1}}>
          <View style={{marginHorizontal: 10, marginVertical: 10}}>
            <Text style={styles.textheading}>My Favourite Wines</Text>
          </View>

          <View style={[styles.view]}>
            {this.state.loading && isEmpty(this.state.Wishlist) ? (
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
              <FlatList
                data={this.state.Wishlist}
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
                    onRefresh={this.onRefresh}
                  />
                }
                renderItem={({item, index}) => {
                  if (!isNull(item.product)) {
                    return (
                      <SearchCard
                        onPress={() =>
                          this.props.navigation.navigate(
                            'WishListProductDetail',
                            {ProductDetail: item},
                          )
                        }
                        onPressView={() =>
                          this.props.navigation.navigate('ChooseProduct', {
                            Testing: item,
                            event: item.event,
                            isFromAdditional: true,
                          })
                        }
                        // onPress={() => this.props.navigation.navigate("WishlistDetail", { wishlistItem: item })}
                        subtitle={
                          !isNull(item.product) &&
                          moment(item.product.created_at).format('DD/MM/YYYY')
                        }
                        imagelist={
                          !isNull(item.product) && item.product.Imagesrc
                        }
                        // status={item.product.type}
                        areaname={item.event == null ? '' : item.event.city}
                        Type={!isNull(item.product) && item.product.type}
                        date={moment(item.created_at).format('DD/MM/YYYY')}
                        ViewMore={'View'}
                        title={!isNull(item.product) && item.product.title}
                        removeData={()=>this.removeItem()}
                      />
                    );
                  }
                }}
              />
            )}
          </View>
        </View>
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
});

const mapProps = state => ({
  utilities_all: state.root.utilities_all,
  user: state.root.user,
  theme: state.root.theme,
});

export default connect(mapProps, null)(Index);
