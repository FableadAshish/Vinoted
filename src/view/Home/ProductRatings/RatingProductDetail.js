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
import {Icon} from 'native-base';
import {
  white,
  secondryColor,
  primaryColor,
  sofiaFont,
} from '../../../style/variables';
import {isEmpty} from 'lodash';
import {connect} from 'react-redux';
import http from '../../../http';
import moment from 'moment';
import FLEC from '../../../component/Common/FLEC';
const {width, height} = Dimensions.get('window');
import LinearGradient from 'react-native-linear-gradient';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import {Images} from '../../../../theme/Images';
const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

let data = ['1', '2', '3'];

const Shimmer = ({}) => {
  return (
    <View style={{width: '100%'}}>
      <ShimmerPlaceHolder
        style={{
          marginLeft: 10,
          height: 30,
          width: '60%',
          borderRadius: 10,
          marginVertical: 10,
        }}
      />
      <View
        style={[
          {
            width: '90%',
            alignSelf: 'center',
            height: 200,
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: 5,
            marginBottom: 20,
          },
        ]}>
        <View style={{justifyContent: 'center'}}>
          <ShimmerPlaceHolder
            style={{
              height: 20,
              width: '60%',
              borderRadius: 10,
              marginVertical: 10,
            }}
          />
          <ShimmerPlaceHolder
            style={{
              height: 20,
              width: '70%',
              borderRadius: 10,
              marginVertical: 10,
            }}
          />
          <ShimmerPlaceHolder
            style={{
              height: 20,
              width: '80%',
              borderRadius: 10,
              marginVertical: 10,
            }}
          />
          <ShimmerPlaceHolder
            style={{
              height: 20,
              width: '90%',
              borderRadius: 10,
              marginVertical: 10,
            }}
          />
        </View>
        <View
          style={{
            flexDirection: 'column',
            width: '30%',
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <ShimmerPlaceHolder
            style={{height: 100, width: '100%', marginTop: 20, borderRadius: 5}}
          />
        </View>
      </View>
      <ShimmerPlaceHolder
        style={{
          height: 50,
          width: '90%',
          borderTopRightRadius: 30,
          borderBottomRightRadius: 30,
          marginVertical: 10,
        }}
      />
      {/* <ShimmerPlaceHolder style={{ height: 20, width: "90%", borderRadius: 10, marginVertical: 10,marginBottom:20 }}/> */}
      <View style={{width: '90%', alignSelf: 'center'}}>
        <ShimmerPlaceHolder
          style={{
            height: 20,
            width: '40%',
            borderRadius: 10,
            marginVertical: 10,
          }}
        />
        <ShimmerPlaceHolder
          style={{
            height: 20,
            width: '90%',
            borderRadius: 10,
            marginVertical: 10,
            marginBottom: 20,
          }}
        />

        <ShimmerPlaceHolder
          style={{
            height: 20,
            width: '40%',
            borderRadius: 10,
            marginVertical: 10,
          }}
        />
        <ShimmerPlaceHolder
          style={{
            height: 20,
            width: '90%',
            borderRadius: 10,
            marginVertical: 10,
            marginBottom: 20,
          }}
        />
      </View>
    </View>
  );
};

class RatingProductDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {},
      event: {},
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
    // if (ProductRatings) {
    //     this.setState({ form: ProductRatings, event }, () => this.Store())
    // }
    const event = this.props.route.params.event;
    console.log('ProductDetailevent', ProductDetail);
    this.setState({form: ProductDetail, event}, () => this.Store());
  }

  Store = async () => {
    const {form} = this.state;
    this.setState({loading: true});
    http
      .get(`sommelier/product/${form.product_id}`)
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
    const ProductRatings = this.props.route.params.ProductRatings;
    const {ProductDetail, isLike, event, form} = this.state;
    console.log('Render Product Detail..', event);
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
          <Shimmer />
        ) : !this.state.loading && isEmpty(this.state.ProductDetail) ? (
          <FLEC text="No data available" />
        ) : (
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{flexGrow: 1}}>
              <View
                style={[
                  styles.view,
                  {flexDirection: 'row', marginHorizontal: 5, marginBottom: 20},
                ]}>
                <View style={{flexDirection: 'column', flex: 0.7}}>
                  <View style={{marginVertical: 5}}>
                    <Text style={[styles.textheading, {fontWeight: '500'}]}>
                      {ProductDetail.title}
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
                      {ProductDetail.year}
                    </Text>
                  </View>

                  {!isEmpty(event) && event.is_started == 1 && (
                    <View style={{marginVertical: 5}}>
                      <Text style={{color: 'gray'}}>Tasted on</Text>
                      <Text
                        style={{
                          fontFamily: sofiaFont,
                          fontSize: 20,
                          fontWeight: '500',
                          color: primaryColor,
                        }}>
                        {moment(form.created_at).format('DD MMM,YYYY')}
                      </Text>
                    </View>
                  )}
                </View>

                <View style={{flexDirection: 'column', flex: 0.3}}>
                  <Image
                    style={{height: '100%', width: '100%', marginTop: 20}}
                    resizeMode="contain"
                    source={{uri: ProductDetail?.Imagesrc}}
                    // source={require('../../../assets/darkBotle.png')}
                  />
                </View>
              </View>

              <View
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
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  {/* <Icon name="pound" type="Foundation" style={{ color: white, fontSize: 30, paddingTop: 5, marginHorizontal: 5 }} /> */}
                  <Image
                    source={Images.BritishPoundIcon}
                    style={{backgroundColor: 'white', height: 25, width: 25}}
                  />
                  <Text style={[styles.textheading, {color: white}]}>
                    {' '}
                    {ProductDetail.price}
                  </Text>
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
                        {ProductDetail.type}
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
                        {ProductDetail.region}
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
                        {ProductDetail.country}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>

              <View style={[styles.view, {marginHorizontal: 5}]} />
            </View>
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
          <FLEC text="No data available" />
        ) : (
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('ChooseProduct', {
                Testing: form,
                event: event,
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
              <Text style={[styles.textheading, {color: white}]}> Tasting</Text>
            </View>
          </TouchableOpacity>
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

export default connect(mapProps, null)(RatingProductDetail);
