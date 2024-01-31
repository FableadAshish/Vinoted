import React, { Component } from 'react';
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
    TouchableOpacity
} from 'react-native';
import Header from '../../../component/Header/Header';
import { Icon, Button } from 'native-base';
import SearchCard from '../../../component/CustomeComponent/SearchCard'
import {
    white,
    secondryTextColor,
    secondryColor,
    primaryColor,
    cardBackground, sofiaFont,calendarlist
} from '../../../style/variables';
import FLEC from "../../../component/Common/FLEC"
import FPI from '../../../component/Indicator/FPI';
import BottomIndicator from '../../../component/Indicator/BottomIndicator';
import http from '../../../http'
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import { isEmpty, isNull } from 'lodash';
import { connect } from 'react-redux';
import moment from 'moment'
const { width, height } = Dimensions.get('window');
import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'
const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient)

const TextCard = ({
    name,
    value,
    onPress,
    salepercent,
    sign,
    iconname,
    icontype,
}) => {
    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={styles.modelheader}>
                <Text style={[styles.text]}>{name}</Text>
            </View>
        </TouchableWithoutFeedback>
    );
};

const SliderBox = ({ subtitle, title, date, imagelist }) => {
    return (
        <View style={{ width: width - 10, borderRadius: 5 }}>
            <ImageBackground
                imageStyle={{ borderRadius: 5 }}
                resizeMode={'stretch'}
                style={{ height: '100%', width: '97%', alignSelf: 'center' }}
                source={{ uri: imagelist }}>
                <View>
                    <Text style={{ fontFamily: sofiaFont, marginHorizontal: 10, fontSize: 17, color: '#fff' }}>
                        {title}
                    </Text>
                </View>
            </ImageBackground>
        </View>
    );
};


const Shimmer = ({ }) => {
    return (

        <View style={[{ height: 100, borderRadius: 5, backgroundColor: white, marginVertical: 5 }]}>
            <View style={{ height: 100,width:"100%", alignSelf: "center", justifyContent: "center", backgroundColor: white, elevation: 1, flexDirection: "row", alignSelf: "center" }}>
                <View style={{ flex: 0.3, justifyContent: "center" }}>
                    <View style={{ justifyContent: "center", paddingHorizontal: 5, height: 100, width: 100, borderRadius: 50 }}>
                        <ShimmerPlaceHolder style={{ height: 50, width: 50, borderRadius: 25 }}
                        />
                    </View>
                </View>
                <View style={{ flex: 0.7, marginHorizontal: 5, marginTop: 3, paddingRight: 12, justifyContent: "center" }}>
                    <ShimmerPlaceHolder style={{ height: 15, width: "60%", borderRadius: 10, marginVertical: 3 }}
                    />
                    <ShimmerPlaceHolder style={{ height: 15, width: "80%", borderRadius: 10, marginVertical: 3 }}
                    />
                    <ShimmerPlaceHolder style={{ height: 15, width: "80%", borderRadius: 10, marginVertical: 3 }}
                    />
                </View>
            </View>
        </View>
    )
}

let data = [
    '1',
    '2',
    '3'
]


class MyEvents extends Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {},
            data: data,
            Events: [],
            modalVisible: false,
            visible: false,
            refreshing: false,
            page: 0,
            total: "",
            type: ""
        };
    }

    componentDidMount() {

        this.Store();

    }

    // componentWillMount(){
    //     this.Store();
    // }


    Store = async () => {
        const type = this.props.route.params.type;
        console.log("TYPes", type)
        this.setState({ loading: true, type, Events: [] });
        http.get(`sommelier/events?type=${type}&page=${this.state.page}`).then(res => {
            console.log("response Events..", res.data.page.data)
            this.setState({
                Events: this.state.page === 0 ? res.data.page.data : [...this.state.Events, ...res.data.page.data]
                , loading: false,
                // total: res.data.enquires.total,
                refreshing: false
            }, () => console.log("Events", this.state.Events))

        }).catch(err => {
            let errors = {};
            if (err && err.status == 422) errors = err.errors;
            this.setState({ errors, loading: false, refreshing: false });
        });
    }


    LoadMoreRandomData = () => {
        console.log("length", this.state.Events.length)
        if (this.state.Events.length < this.state.total) {
            this.setState({
                page: this.state.page + 1
            }, () => this.Store());
        }
    }



    _renderEmptyComponent() {
        return !this.state.loading && isEmpty(this.state.Events) && <FLEC text="Currently No Events Available"
        // image={require('../../../assets/logo.png')} 
        />
    }

    _renderFooterComponent() {
        return this.state.loading && !isEmpty(this.state.Events) ? (
            <BottomIndicator />
        ) : null;
    }

    onRefresh = () => {
        this.setState({
            refreshing: true,
            Events: []
        }, () => this.Store())
    }

   

    render() {
        const type = this.props.route.params.type;
        console.log('pdata',);
        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: white,
                }}>
                <Header
                    navigation={this.props.navigation}
                    iconColor={primaryColor}
                    iconProps={{ name: "keyboard-arrow-left", type: "MaterialIcons" }}
                    onPress={() => this.props.navigation.goBack()}
                    image={require('../../../assets/blueLogo.png')}
                />

                <View style={{ marginHorizontal: 5, flex: 1 }}>
                   

                    <View style={{ marginHorizontal: 10, marginVertical: 10 }}>
                        <Text style={styles.textheading}>All Events</Text>
                    </View>

                    <View style={styles.view}>
                        {this.state.loading && isEmpty(this.state.Events) ?
                        <View>
                        <Shimmer />
                        <Shimmer />
                        <Shimmer />
                        <Shimmer />
                        <Shimmer />
                        <Shimmer />
                        <Shimmer />
                    </View>
                            
                            :
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
                                    <SearchCard
                                       ViewMore={"View More"}
                                        onPressView={() => this.props.navigation.push("ProEventDetails", { Eventitem: item })}
                                        onPress={() => this.props.navigation.push("ProEventDetails", { Eventitem: item })}
                                        subtitle={moment(item.date).format("DD/MM/YYYY") }
                                        time={moment(item.date).format("HH:mm")}
                                        imagelist={item.Imagesrc}
                                        areaname={item.supplier.default_address.city}
                                        status={item.status}
                                        title={item.name}
                                    />

                                )}
                            />

                        }

                        {/* <FlatList
                                data={this.state.data}
                                keyExtractor={(item, i) => i.toString()}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                    >



                                    </TouchableOpacity>
                                )}
                            /> */}
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

export default connect(
    mapProps,
    null,
)(MyEvents);