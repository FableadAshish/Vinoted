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
import {Icon, Button} from 'native-base';
import SearchCard from '../../../component/CustomeComponent/SearchCard';
// import EventRequest from '../../../component/CustomeComponent/EventRequestcard'
import {
  white,
  secondryTextColor,
  secondryColor,
  primaryColor,
  cardBackground,
  sofiaFont,
  MoreButton,
  textColor,
  calendarlist,
} from '../../../style/variables';
import FLEC from '../../../component/Common/FLEC';
import FPI from '../../../component/Indicator/FPI';
import BottomIndicator from '../../../component/Indicator/BottomIndicator';
import http from '../../../http';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import {isEmpty, isNull} from 'lodash';
import {connect} from 'react-redux';
import moment from 'moment';
const {width, height} = Dimensions.get('window');
import LinearGradient from 'react-native-linear-gradient';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import {Images} from '../../../../theme/Images';
const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

const EventRequest = ({
  subtitle,
  areaname,
  time,
  doller,
  onPressMore,
  discription,
  more,
  item,
  isLike,
  title,
  date,
  imagelist,
  onPress,
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          height: 80,
          overflow: 'hidden',
          width: '100%',
          alignSelf: 'center',
          marginHorizontal: 5,
          marginVertical: 5,
          justifyContent: 'center',
          backgroundColor: calendarlist,
          flexDirection: 'row',
          borderRadius: 5,
          borderColor: primaryColor,
          borderWidth: 1,
        }}>
        <View
          style={{
            flex: 0.2,
            justifyContent: 'center',
            paddingHorizontal: 10,
            backgroundColor: 'white',
          }}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              paddingHorizontal: 5,
              height: 60,
              width: 60,
              backgroundColor: white,
            }}>
            {/* <Image style={{ height: 50, width: 50, borderRadius: 25 }} source={{ uri: imagelist }} /> */}
            {/* {(() => this.sub(moment(item.products.created_at).format('DD'),'th'))()} */}
            <Text style={{color: primaryColor, fontSize: 20}}>
              {moment(item.date).format('DD')}
              <Text style={{fontSize: 10, height: 20}}>th</Text>
            </Text>
            <Text style={{color: primaryColor, fontSize: 20, marginTop: -10}}>
              {moment(item.date).format('MMM')}
            </Text>
          </View>
        </View>
        <View
          style={{
            flex: 0.8,
            paddingHorizontal: 5,
            marginHorizontal: 5,
            marginTop: 3,
            justifyContent: 'center',
          }}>
          <Text
            numberOfLines={1}
            style={[
              styles.text,
              {
                fontSize: 15,
                width: '100%',
                color: white,
                textTransform: 'capitalize',
                paddingVertical: 2,
              },
            ]}>
            {title}{' '}
          </Text>
          {areaname && (
            <Text
              numberOfLines={3}
              style={[
                styles.text,
                {
                  fontSize: 12,
                  width: '100%',
                  color: 'lightgray',
                  textTransform: 'capitalize',
                  paddingVertical: 2,
                },
              ]}>
              {areaname}
            </Text>
          )}
          {/* {date &&
                        <View style={{ flexDirection: "row", }}>
                            <Icon name="pound" type="Foundation" style={{ color: "lightgray", fontSize: 15, paddingTop: 3, marginHorizontal: 5 }} />
                            <Text numberOfLines={1} style={[styles.text, { fontSize: 12, width: "100%", color: "lightgray", textTransform: "capitalize", paddingVertical: 2 }]}>{date}</Text>
                        </View>
                    } */}
          {/* {date && <Text numberOfLines={1} style={[styles.text, { fontSize: 12, width: "100%", color: "lightgray", textTransform: "capitalize", paddingVertical: 2 }]}>{date} {time}</Text>} */}
        </View>

        {/* <TouchableOpacity style={{ flex: 0.3, justifyContent: "flex-end", paddingHorizontal: 10 }}>
                    {more && <TouchableOpacity onPress={onPressMore}
                        style={{
                            height: 30,
                            justifyContent: 'center', alignItems: 'center', alignSelf: "flex-end",
                            borderRadius: 15,
                            backgroundColor: MoreButton, width: "90%", marginVertical: 10,
                        }}>
                        <Text style={[styles.text, { color: primaryColor, paddingHorizontal: 2, fontWeight: "700" }]}>
                            {more}
                        </Text>
                    </TouchableOpacity>}
                </TouchableOpacity> */}
      </View>
    </TouchableOpacity>
  );
};

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

let data = ['1', '2', '3'];

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {},
      data: data,
      Products: [],
      modalVisible: false,
      visible: false,
      refreshing: false,
      page: 0,
      total: '',
      type: '',
    };
  }

  componentDidMount() {
    this.Store();
  }

  // componentWillMount(){
  //     this.Store();
  // }

  Store = async () => {
    const type = 'myevent';
    // const type = this.props.route.params.type;
    console.log('TYPes', type);
    this.setState({loading: true, Products: []});
    this.setState({loading: true, Products: []});
    // http.get(`sommelier/eventproductnorating?page=${this.state.page}`).then(res => {
    http
      .get(`sommelier/events?type=${type}&page=${this.state.page}`)
      .then(res => {
        console.log('response Products..', res.data.page.data);
        this.setState(
          {
            // Products: this.state.page === 0 ? res.data : [...this.state.Products, ...res.data]
            // ,
            Products:
              this.state.page === 0
                ? res.data.page.data
                : [...this.state.Products, ...res.data.page.data],
            loading: false,
            // total: res.data.enquires.total,
            refreshing: false,
          },
          () => console.log('Products', this.state.Products),
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

  LoadMoreRandomData = () => {
    console.log('length', this.state.Products.length);
    if (this.state.Products.length < this.state.total) {
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
      isEmpty(this.state.Products) && (
        <FLEC
          text="No event found"
          // image={require('../../../assets/logo.png')}
        />
      )
    );
  }

  _renderFooterComponent() {
    return this.state.loading && !isEmpty(this.state.Products) ? (
      <BottomIndicator />
    ) : null;
  }

  onRefresh = () => {
    this.setState(
      {
        refreshing: true,
        Products: [],
      },
      () => this.Store(),
    );
  };

  Type(type) {
    console.log('typeon Function', type);
    // const {type} =this.state;
    // const type = this.props.route.params.type;
    if (type == 'past') {
      let past = 'My Products';
      return past;
    } else if (type == 'pendingevent') {
      let PendingEvents = 'Pending Products';
      return PendingEvents;
    } else {
      let Request = 'Pending Request';
      return Request;
    }
  }

  render() {
    console.log('pdata');
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
          {/* <View style={{ marginHorizontal: 10, marginVertical: 5 }}>
                            <Image
                                style={{ height: 150, width: "100%", borderTopLeftRadius: 30, borderTopRightRadius: 30 }}
                                source={{ uri: "https://vistapointe.net/images/bar-3.jpg" }}
                            />
                        </View> */}

          <View style={{marginHorizontal: 10, marginVertical: 10}}>
            {/* <Text style={styles.textheading}>{type == "past" ? "Past Events" : type == "pendingevent" ? "Pending Event" : "Event Request"}</Text> */}
          </View>

          <View style={styles.view}>
            {this.state.loading && isEmpty(this.state.Products) ? (
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
              <View style={{marginBottom: 50}}>
                <Text style={[styles.textheading, {marginBottom: 10}]}>
                  Tasting Calender
                </Text>
                <FlatList
                  showsVerticalScrollIndicator={false}
                  data={this.state.Products}
                  keyExtractor={(item, i) => i.toString()}
                  horizontal={false}
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
                  renderItem={({item}) => (
                    // <View>
                    <EventRequest
                      // onPress={() => this.props.navigation.navigate("RatingProductDetail", { ProductDetail: item, })}
                      onPress={() =>
                        this.props.navigation.push('ProEventDetails', {
                          Eventitem: item,
                        })
                      }
                      onPressMore={() =>
                        this.props.navigation.navigate('ChooseProduct', {
                          Testing: item,
                        })
                      }
                      // more={"Tasting"}
                      imagelist={item.products && item.products.Imagesrc}
                      item={item}
                      time={moment(item.date).format('HH:mm')}
                      date={moment(item.date).format('DD/MM/YYYY')}
                      discription={item.supplier.default_address.city}
                      // subtitle={item.products && ` ${item.products.price}`}
                      areaname={item.address_1}
                      title={item.name}
                    />

                    // </View>
                  )}
                />
              </View>
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
});

const mapProps = state => ({
  utilities_all: state.root.utilities_all,
  user: state.root.user,
  theme: state.root.theme,
  // console.log('state.toot.utilities', state.root.utilities_all),
});

export default connect(mapProps, null)(Index);
