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
  TouchableOpacityBase,
} from 'react-native';
import Header from '../../../component/Header/Header';
import {Icon, Button} from 'native-base';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import SearchCard from '../../../component/CustomeComponent/SearchCard';
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
import moment from 'moment';
import HTML from 'react-native-render-html';
import FLEC from '../../../component/Common/FLEC';
import FPI from '../../../component/Indicator/FPI';
import {Images} from '../../../../theme/Images';
const {width, height} = Dimensions.get('window');

let data = ['1', '2', '3'];

class WishListProductDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {},
      data: data,
      ProductDetail: {},
      modalVisible: false,
      visible: false,
      refreshing: false,
      isLike: false,
    };
  }
  componentDidMount() {
    const ProductDetail = this.props.route.params.ProductDetail;
    console.log('ProductDetail...', ProductDetail);
    this.setState({ProductDetail: ProductDetail});
  }

  Store = async () => {
    const {form} = this.state;
    this.setState({loading: true});
    http
      .get(`sommelier/product/${form.id}`)
      .then(res => {
        console.log('response ProductDetail..', res);
        if (res.data.page == null) {
          this.setState({loading: false});
        } else {
          this.setState({loading: false, ProductDetail: res.data.page});
        }
      })
      .catch(err => {
        console.log('error', err);
        let errors = {};
        if (err && err.status == 422) {
          errors = err.errors;
        }
        this.setState({errors, loading: false, refreshing: false});
      });
  };

  AddWishlist = async () => {};

  render() {
    const {ProductDetail, isLike} = this.state;
    console.log('Render Item on Product..Wid new', ProductDetail);
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
        {isEmpty(ProductDetail) && this.state.loading ? (
          <SkeletonContent
            containerStyle={{flex: 1, width: '100%'}}
            boneColor="whitesmoke"
            layout={[
              {
                height: 150,
                width: '95%',
                alignSelf: 'center',
                borderRadius: 30,
                marginVertical: 5,
              },
              {
                height: 150,
                width: '95%',
                alignSelf: 'center',
                borderRadius: 30,
                marginVertical: 5,
              },
              {
                height: 150,
                width: '95%',
                alignSelf: 'center',
                borderRadius: 30,
                marginVertical: 5,
              },
              {
                height: 150,
                width: '95%',
                alignSelf: 'center',
                borderRadius: 30,
                marginVertical: 5,
              },
              {
                height: 150,
                width: '95%',
                alignSelf: 'center',
                borderRadius: 30,
                marginVertical: 5,
              },
            ]}
            animationDirection="horizontalRight"
            backgroundColor="gray"
            loading={true}
            // ...
          />
        ) : !this.state.loading && isEmpty(this.state.ProductDetail) ? (
          <FLEC
            text="No data available"
            // image={require('../../../assets/logo.png')}
          />
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            // refreshControl={
            //     <RefreshControl
            //         refreshing={this.state.refreshing}
            //         onRefresh={() => this.onRefresh()}
            //     />
            // }
          >
            {!isEmpty(ProductDetail) && (
              <View style={{flex: 1}}>
                {/* <TouchableOpacity style={{ width: "100%", alignSelf: "center", backgroundColor: "green" }} onPress={()=>this.AddWishlist()}>
                            <Icon name={isLike ? "heart" : "hearto"} style={{ color: isLike ? "red" : "gray" }} />
                        </TouchableOpacity> */}

                <View
                  style={[
                    styles.view,
                    {
                      flexDirection: 'row',
                      marginHorizontal: 5,
                      marginBottom: 20,
                    },
                  ]}>
                  <View style={{flexDirection: 'column', flex: 0.7}}>
                    <View style={{marginVertical: 5}}>
                      <Text style={[styles.textheading, {fontWeight: '500'}]}>
                        {ProductDetail.product.title}
                      </Text>
                    </View>

                    <View style={{marginVertical: 5}}>
                      <Text style={{color: 'gray'}}>Producer</Text>
                      <Text
                        style={{
                          fontFamily: sofiaFont,
                          fontSize: 20,
                          fontWeight: '500',
                          color: primaryColor,
                        }}>
                        {ProductDetail.product.producer}
                      </Text>
                    </View>

                    <View style={{marginVertical: 5}}>
                      <Text style={{color: 'gray'}}>Year</Text>
                      <Text
                        style={{
                          fontFamily: sofiaFont,
                          fontSize: 20,
                          fontWeight: '500',
                          color: primaryColor,
                        }}>
                        {ProductDetail.product.year}
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
                        {ProductDetail.product.alcohol}%
                      </Text>
                    </View>

                    {!isEmpty(ProductDetail) &&
                      !isNull(ProductDetail.event) &&
                      ProductDetail.event.is_started == 1 && (
                        <>
                          <View style={{marginVertical: 5}}>
                            <Text style={{color: 'gray'}}>Tasted on</Text>
                            <Text
                              style={{
                                fontFamily: sofiaFont,
                                fontSize: 20,
                                fontWeight: '500',
                                color: primaryColor,
                              }}>
                              {moment(ProductDetail.created_at).format(
                                'DD MMM,YYYY',
                              )}
                            </Text>
                          </View>
                          <View style={{marginVertical: 5}}>
                            <Text style={{color: 'gray'}}>Price</Text>
                            <Text
                              style={{
                                fontFamily: sofiaFont,
                                fontSize: 20,
                                fontWeight: '500',
                                color: primaryColor,
                              }}>
                              <Image source={Images.BritishPoundIcon} />
                              {ProductDetail.product.price}
                            </Text>
                          </View>
                        </>
                      )}
                  </View>

                  <View style={{flexDirection: 'column', flex: 0.3}}>
                    <Image
                      style={{height: '100%', width: '100%', marginTop: 20}}
                      resizeMode="contain"
                      source={{uri: ProductDetail.product.Imagesrc}}
                      // source={require('../../../assets/darkBotle.png')}
                    />
                  </View>
                </View>

                <View style={[styles.view, {marginHorizontal: 5}]}>
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
                        <Text style={{color: 'gray'}}>Type</Text>
                        <Text
                          style={{
                            fontFamily: sofiaFont,
                            fontSize: 15,
                            color: primaryColor,
                          }}>
                          {ProductDetail.product.type}
                        </Text>
                      </View>
                      <View style={{marginVertical: 5}}>
                        <Text style={{color: 'gray'}}>Region</Text>
                        <Text
                          style={{
                            fontFamily: sofiaFont,
                            fontSize: 15,
                            color: primaryColor,
                          }}>
                          {ProductDetail.product.region}
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
                        <Text style={{color: 'gray'}}>Country</Text>
                        <Text
                          style={{
                            fontFamily: sofiaFont,
                            fontSize: 15,
                            color: primaryColor,
                          }}>
                          {ProductDetail.product.country}
                        </Text>
                      </View>
                      <View style={{marginVertical: 5}}>
                        <Text style={{color: 'gray'}}>Company</Text>
                        <Text
                          style={{
                            fontFamily: sofiaFont,
                            fontSize: 15,
                            color: primaryColor,
                          }}>
                          {ProductDetail.product.supplier_name}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View style={[
                      styles.view,
                      {marginHorizontal: 5, backgroundColor: white},
                    ]}>
                    <HTML
                      // style={{
                      //   fontFamily: sofiaFont,
                      //   // fontSize: 20,
                      //   fontWeight: '500',
                      //   color: 'black',
                      // }}>
                      // {ProductDetail.product.description}
                      style={{fontSize: 15, color: primaryColor}}
                      source={{html: ProductDetail.product.description}}
                      imagesMaxWidth={Dimensions.get('window').width - 20}
                    />
                  </View>
                </View>
              </View>
            )}
          </ScrollView>
        )}

        {isEmpty(ProductDetail) && this.state.loading ? (
          <ShimmerPlaceHolder
            style={{
              height: 50,
              width: '90%',
              position: 'absolute',
              bottom: 0,
              borderTopRightRadius: 30,
              borderBottomRightRadius: 30,
            }}
          />
        ) : !this.state.loading && isEmpty(this.state.ProductDetail) ? (
          <FLEC
            text="No data available"
            // image={require('../../../assets/logo.png')}
          />
        ) : (
          !isEmpty(ProductDetail) &&
          !isNull(ProductDetail.event) &&
          ProductDetail.event.is_started == 1 && (
            <TouchableOpacity
              onPress={() =>
                !isEmpty(ProductDetail) &&
                ProductDetail.event.is_started == 1 &&
                this.props.navigation.navigate('ChooseProduct', {
                  Testing: ProductDetail,
                  event: ProductDetail.event,
                })
              }
              style={{
                justifyContent: 'center',
                alignItems: 'flex-end',
                paddingHorizontal: 10,
                height: 50,
                width: '90%',
                backgroundColor: secondryColor,
                borderTopRightRadius: 30,
                borderBottomRightRadius: 30,
                marginVertical: 10,
                position: 'absolute',
                bottom: 0,
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                {/* <Icon name="pound" type="Foundation" style={{ color: white, fontSize: 30, paddingTop: 5, marginHorizontal: 5 }} /> */}
                <Text style={[styles.textheading, {color: white}]}>
                  {' '}
                  Tasting
                </Text>
              </View>
            </TouchableOpacity>
          )
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

export default connect(mapProps, null)(WishListProductDetail);
