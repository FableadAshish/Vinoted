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
} from 'react-native';
import Header from '../../../component/Header/Header';
import {Icon, Button} from 'native-base';
import CardList from '../../../component/CustomeComponent/CardList';
import {
  white,
  secondryTextColor,
  secondryColor,
  primaryColor,
  cardBackground,
  sofiaFont,
} from '../../../style/variables';
import SearchCard from '../../../component/CustomeComponent/SearchCard';
import FLEC from '../../../component/Common/FLEC';
import FPI from '../../../component/Indicator/FPI';
import BottomIndicator from '../../../component/Indicator/BottomIndicator';
import http from '../../../http';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import {isEmpty, isNull} from 'lodash';
import {connect} from 'react-redux';
import moment from 'moment';
import {Images} from '../../../../theme/Images';
const {width, height} = Dimensions.get('window');

let data = ['1', '2', '3', '4', '5'];

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {},
      data: data,
      Events: [],
      modalVisible: false,
      visible: false,
      refreshing: false,
      arrayholder: [],
    };
  }

  componentDidMount() {
    this.Store();
  }

  // componentWillMount(){
  //     this.Store();
  // }

  Store = async () => {
    this.setState({loading: true});
    http
      .get(`sommelier/events?page=${this.state.page}`)
      .then(res => {
        console.log('response All Events..', res.data.page.data);
        this.setState({
          Events:
            this.state.page === 0
              ? res.data.page.data
              : [...this.state.Events, ...res.data.page.data],
          loading: false,
          // total: res.data.enquires.total,
          refreshing: false,
        });
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
    console.log('length', this.state.Events.length);
    if (this.state.Events.length < this.state.total) {
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
      isEmpty(this.state.Events) && (
        <FLEC
          text="No Data Available"
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
      },
      () => this.Store(),
    );
  };

  SearchFilterFunction(text) {
    console.log('hgdcjkTEXT', text);
    this.setState({text});
    this.setState({loading: true});
    http
      .get(`sommelier/events?search=${text}`)
      .then(res => {
        console.log('response Events..', res.data.page.data);
        this.setState({
          arrayholder: res.data.page.data,
          loading: false,
          refreshing: false,
        });
      })
      .catch(err => {
        let errors = {};
        if (err && err.status == 422) {
          errors = err.errors;
        }
        this.setState({errors, loading: false, refreshing: false});
      });
  }

  render() {
    console.log('pdata');
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
          image={require('../../../assets/blueLogo.png')}
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
              {/* <Icon name="search" type="FontAwesome" style={styles.icon}></Icon> */}
              <Image
                source={Images.SearchIcon}
                tintColor={'white'}
                style={{height: 25, width: 25}}
              />
            </View>
          </TouchableWithoutFeedback>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          // refreshControl={
          //     <RefreshControl
          //         refreshing={this.state.refreshing}
          //         onRefresh={() => this.onRefresh()}
          //     />
          // }
        >
          <View style={{marginHorizontal: 5, flex: 1}}>
            <View style={styles.view}>
              {this.state.loading && isEmpty(this.state.Events) ? (
                // <SkeletonContent
                //   containerStyle={{flex: 1, width: '100%'}}
                //   boneColor="whitesmoke"
                //   // layout={[
                //   //     { height: 100, width:"95%", alignSelf: "center", marginHorizontal: 5, marginVertical: 5, justifyContent: "center", flexDirection: "row" },
                //   //     // { height: 100, width:"95%", alignSelf: "center", marginHorizontal: 5, marginVertical: 5, justifyContent: "center", flexDirection: "row" },
                //   //     // { height: 100, width:"95%", alignSelf: "center", marginHorizontal: 5, marginVertical: 5, justifyContent: "center", flexDirection: "row" },
                //   //     // { height: 100, width:"95%", alignSelf: "center", marginHorizontal: 5, marginVertical: 5, justifyContent: "center", flexDirection: "row" },
                //   //     // { height: 100,width:"95%", alignSelf: "center", marginHorizontal: 5, marginVertical: 5, justifyContent: "center", flexDirection: "row" },
                //   //     // { height: 100, width:"95%", alignSelf: "center", marginHorizontal: 5, marginVertical: 5, justifyContent: "center", flexDirection: "row" },
                //   //     // { height: 100, width:"95%", alignSelf: "center", marginHorizontal: 5, marginVertical: 5, justifyContent: "center", flexDirection: "row" },
                //   //     // { height: 100, width:"95%", alignSelf: "center", marginHorizontal: 5, marginVertical: 5, justifyContent: "center", flexDirection: "row" },
                //   // ]}
                //   animationDirection="horizontalRight"
                //   backgroundColor="grey"
                //   loading={true}
                //   // ...
                // />
                <View>
                  <Text>Loading ....</Text>
                </View>
              ) : (
                <FlatList
                  showsVerticalScrollIndicator={false}
                  data={
                    !isEmpty(this.state.arrayholder)
                      ? this.state.arrayholder
                      : this.state.Events
                  }
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
                    // <SearchCard
                    //     // onPressView={() => this.props.navigation.push("ProductDetail")}
                    //     onPress={() => this.props.navigation.push("ProEventDetails", { Eventitem: item })}
                    //     subtitle={moment(item.date).format("DD/MM/YYYY")}
                    //     imagelist={item.Imagesrc}
                    //     areaname={item.supplier.default_address.city}
                    //     status={item.status}
                    //     title={item.name}
                    // />
                    <SearchCard
                      ViewMore={'View More'}
                      onPressView={() =>
                        this.props.navigation.push('ProEventDetails', {
                          Eventitem: item,
                        })
                      }
                      onPress={() =>
                        this.props.navigation.push('ProEventDetails', {
                          Eventitem: item,
                        })
                      }
                      subtitle={moment(item.date).format('DD/MM/YYYY')}
                      time={moment(item.date).format('HH:mm')}
                      imagelist={item.Imagesrc}
                      // areaname={item.supplier.default_address.city}
                      status={item.status}
                      title={item.name}
                    />
                  )}
                />
              )}
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    height: 60,
    backgroundColor: white,
    paddingLeft: 10,
  },
  subtitle: {
    fontSize: 12,
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
  input: {
    width: '80%',
    color: white,
    fontFamily: sofiaFont,
  },
  searchcontainer: {
    flexDirection: 'row',
    backgroundColor: primaryColor,
    width: '95%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 20,
  },
  icon: {
    fontSize: 20,
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
