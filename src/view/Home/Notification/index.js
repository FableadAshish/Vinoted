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
    TouchableOpacity, ActivityIndicator, BackHandler
} from 'react-native';
import Header from '../../../component/Header/Header';
import HTML from "react-native-render-html";
import {
    white,
    secondryTextColor,
    AcceptBottonColor,
    primaryColor,
    ActiveBottonColor,
    primaryTextColor,
    inputColor,
    cardBackground,
    TexColor, sofiaFont
} from '../../../style/variables';
import { isEmpty, isNull } from 'lodash';
import { connect } from 'react-redux';
import { Icon, Toast } from 'native-base';
import { _getUser } from '../../../api/auth'
import BottomIndicator from '../../../component/Indicator/BottomIndicator';
import http from "../../../http";
import FLEC from "../../../component/Common/FLEC"
import FPI from '../../../component/Indicator/FPI';
import moment from 'moment'
import { color } from 'react-native-reanimated';
const { width, height } = Dimensions.get('window');
import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'
const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient)


let data = [
    '1',
    '2',
    '3'
]

const Shimmer = ({ }) => {
    return (

        <View style={[{ height: 250, borderRadius: 5, backgroundColor: white, marginVertical: 5 }]}>
            <View style={{ height: 120, width:"100%", alignSelf: "center", justifyContent: "center", backgroundColor: white, elevation: 1, flexDirection: "row", alignSelf: "center" }}>
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
            <ShimmerPlaceHolder style={{ marginLeft: 20, height: 15, width: "60%", borderRadius: 10, marginVertical: 3, marginTop: 20 }}
            />
            <ShimmerPlaceHolder style={{ marginLeft: 20, height: 15, width: "70%", borderRadius: 10, marginVertical: 3 }} />

            <View style={{ flexDirection: "row", justifyContent: "space-between", marginHorizontal: 20, marginTop: 10 }}>
                <ShimmerPlaceHolder style={{
                    height: 50,
                    justifyContent: 'center', alignItems: 'center',
                    borderRadius: 15,
                    backgroundColor: cardBackground, width: "40%",
                }}
                />
                <ShimmerPlaceHolder style={{
                    height: 50,
                    justifyContent: 'center', alignItems: 'center',
                    borderRadius: 15,
                    backgroundColor: cardBackground, width: "40%",
                }}
                />
            </View>

            {/* <ShimmerPlaceHolder style={{ marginLeft: 20, height: 15, width: "70%", borderRadius: 10, marginVertical: 3 }}  /> */}



        </View>
    )
}



class Notification extends Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {},
            data: data,
            modalVisible: false,
            loading: false,
            visible: false,
            refreshing: false,
            userData: {},
            notifications: [],
            page: 0,
            total: '',
        };
    }


    componentWillMount = () => {
        // BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    componentWillUnmount = () => {
        // BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick = () => {    
        //NavigationIssue
        if(this.props.route.params) {
            console.log("Aaya hai yaha &&&&")
            this.props.navigation.replace("App", {screen : "Home"});
        }else{
            console.log("Aaya hai yaha ****")
            console.log("%%Calling")
            this.props.navigation.goBack() //Change in  future
            BackHandler.removeListener('hardwareBackPress');
        }
        
        return true;
    }


    onRefresh() {
        this.setState({ refreshing: true, page: 0, notifications: [] }, () => this.fetch());
    }


    async componentDidMount() {
        this._isMounted = true;
        const userdata = await _getUser();
        console.log("USERDATAON Sparepart", userdata)
        this.setState({ userData: userdata.data })
        this.fetch();
    }



    fetch = async () => {

        this.setState({ loading: true, });
        http.get(`sommelier/notifications?page=${this.state.page}`).then(res => {
            console.log("responce of Notification", res)
            this.setState({
                notifications: this.state.page === 0 ? res.data : [...this.state.notifications, ...res.data]
                , loading: false,
                total: res.total,
                refreshing: false
            })

        }).catch(err => {
            console.log("errr Notification", err)
            this.setState({ loading: false, refreshing: false });
            // this._snk.show("OIROOR")
        });

    }


    LoadMoreRandomData = () => {
        if (this.state.notifications.length < this.state.total) {
            this.setState({
                page: this.state.page + 1
            }, () => this.fetch());
        }
        // }

    }


    _renderEmptyComponent() {
        return !this.state.loading && isEmpty(this.state.notifications) && <FLEC textStyle={{ color: white }} text="No Notifications Available." />
    }


    _renderFooterComponent() {
        return this.state.loading && !isEmpty(this.state.notifications) ? (
            <BottomIndicator />
        ) : null;
    }

    updateState(state) {
        this.setState({ ...state });
    }

    componentWillUnmount() {
        this._isMounted = false;
    }


    AcceptEvents(status, id) {
        console.log("eventidAcceptEvents", id)
        this.setState({ loading: true, });
        http.post(`sommelier/changeeventrequeststatus`, {
            event_id: id,
            status: status
        }).then(res => {
            console.log("response changeeventrequeststatus..", res)
            this.props.navigation.replace("App", {screen : "Home"});
            this.setState({ loading: false, refreshing: false }, () =>
                Toast.show({
                    text: `${res.message}`,
                    // buttonText: 'Ok',
                    duration: 2000,
                }))
            // setTimeout(() =>  this.fetch(), 2000)
        }).catch(err => {
            console.log("ERROR on changeeventrequeststatus", err)
            this.setState({ loading: false, refreshing: false })
            if (err.status.data.code == 422) {
                Toast.show({
                    text: `${err.status.data.message}`,
                    buttonText: 'Ok',
                    duration: 2000,
                })
            }
        })
    }

    handlebackFromHeader=()=> {
        console.log("Calling^^^^^")
        if(this.props.route.params) {
            console.log("Aaya hai yaha &&&&")
            this.props.navigation.replace("App", {screen : "Home"});
        }else{
            console.log("Aaya hai yaha ****")
            this.props.navigation.goBack()
        }
    }


    render() {
        console.log('pdata', this.state.notifications);
        // if (this.state.loading) {
        //     return (

        //         <View style={{ backgroundColor: primaryColor }}>
        //             <Header
        //                 navigation={this.props.navigation}
        //                 iconColor={white}
        //                 iconProps={{ name: "keyboard-arrow-left", type: "MaterialIcons" }}
        //                 onPress={()=>this.props.navigation.goBack()}
        //                 image={require('../../../assets/Logo.png')}
        //             />
        //             <Shimmer />
        //             <Shimmer />
        //             <Shimmer />
        //             <Shimmer />
        //         </View>
        //     )
        // }
        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: primaryColor,
                }}>
                <Header
                    navigation={this.props.navigation}
                    iconColor={white}
                    iconProps={{ name: "keyboard-arrow-left", type: "MaterialIcons" }}
                    onPress={() => this.props.navigation.goBack()}
                    image={require('../../../assets/Logo.png')}
                />
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ flexGrow: 1 }}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={() => this.onRefresh()}
                        />
                    }
                >
                    <View style={{ marginHorizontal: 5, flexGrow: 1, justifyContent: "center" }}>
                        {this.state.loading && isEmpty(this.state.notifications) ?
                            <View>
                                <Shimmer />
                                <Shimmer />
                                <Shimmer />
                                <Shimmer />
                            </View>

                            :
                            <FlatList
                                showsVerticalScrollIndicator={false}
                                data={this.state.notifications}
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
                                    <TouchableWithoutFeedback
                                    >
                                        <View style={[styles.view, { backgroundColor: white, alignItems: "center" , }]}>
                                        <TouchableOpacity  
                                        onPress={() => this.props.navigation.navigate("ProEventDetails", { Eventitem: item.data.data,notification:item.data.data })}
                                        >
                                            <View style={{ height: 90, width:"100%", alignSelf: "center", justifyContent: "center", backgroundColor: white, elevation: 1, flexDirection: "row" }}>

                                                <View style={{ flex: 0.3, justifyContent: "center" }}>
                                                    <View style={{ justifyContent: "center", paddingHorizontal: 5, height: 100, width: 100, borderRadius: 50 }}>
                                                        <Image style={{ height: 50, width: 50, borderRadius: 25 }} source={{ uri: item.data.data.Imagesrc }} />
                                                    </View>
                                                </View>
                                                <View style={{ flex: 0.7, marginHorizontal: 5, marginTop: 3, paddingRight: 12, justifyContent: "center" }}>

                                                <View style = {{flexDirection : "row", height:"100%", width:"100%"}}>
                                                <View style = {{flex : 1, justifyContent : "center", alignItems : "center",}}><Text numberOfLines={2} style={[styles.text, { fontSize: 20, width: "100%", color: primaryColor, textTransform: "capitalize", }]}>{item.data.data.name}</Text></View>
                                                {/* <View style = {{flex : 0.5, justifyContent : "center", alignItems : "center"}}> */}
                                                {/* <TouchableOpacity activeOpacity={1}
                                                        style={{
                                                            height: 20,
                                                            justifyContent: 'center', alignItems: 'center', alignSelf: "flex-end",
                                                            borderRadius: 15,
                                                            backgroundColor: ActiveBottonColor, width: "70%",
                                                        }}>
                                                        <Text style={[styles.text, { color: "black", paddingHorizontal: 5, fontWeight: "700" }]}>
                                                            {item.data.data.status}
                                                        </Text>
                                                    </TouchableOpacity> */}
                                                {/* </View> */}
                                                </View>


                                                    
                                                    
                                                    {/* {item.data.data.description == '' && item.data.data.description == null ?
                                                        <Text numberOfLines={2} style={[styles.text, { fontSize: 12, width: "100%", color: "gray", textTransform: "capitalize",}]}>{item.data.data.description}</Text>
                                                        :
                                                        <View style={{ minHeight: 60, maxHeight: 100, overflow: "hidden", justifyContent: "flex-start",}}>
                                                            <HTML numberOfLines={2} tagsStyles={{p:{paddingTop:10, color: "grey"}, span : {color: "grey"}}} style={[styles.text, { fontSize: 12, width: "100%", color: "gray", textTransform: "capitalize", }]} html={item.data.data.description} />
                                                        </View>
                                                    } */}


                                                </View>
                                                
                                            </View>
                                            </TouchableOpacity>

                                            <View style={{ flexDirection: 'row', width: "95%", flex: 1, alignSelf: "center" }}>
                                                <View style={{ flexDirection: 'column', flex: 0.5, paddingHorizontal: 10 }}>
                                                    <View style={{ marginVertical: 5 }}>
                                                        <Text style={{ color: "gray" }}>Date</Text>
                                                        <Text style={{ fontFamily: sofiaFont, fontSize: 15, color: primaryColor }}>{moment(item.data.data.date).format("DD/MM/YYYY")}</Text>
                                                    </View>

                                                </View>

                                                <View style={{ flexDirection: 'column', flex: 0.5, paddingHorizontal: 10 }}>
                                                    <View style={{ marginVertical: 5 }}>
                                                        <Text style={{ color: "gray" }}>Time</Text>
                                                        <Text style={{ fontFamily: sofiaFont, fontSize: 15, color: primaryColor }}>{moment(item.data.data.date).format("HH:mm")}</Text>
                                                    </View>

                                                </View>
                                            </View>

                                            <View style={{ marginVertical: 5,width:"90%",marginBottom:10}}>
                                                <Text style={{ color: "gray" }}>Location</Text>
                                                <Text style={{ fontFamily: sofiaFont, fontSize: 15, color: primaryColor }}>{item.data.data.address_1}</Text>

                                            </View>


                                            {item.request_status === "Pending" && <View style={{ flexDirection: "row" }}>
                                                <View style={{ flex: 0.5, alignItems: "center" }}>
                                                    {/* {this.state.loading ?
                                                        <TouchableWithoutFeedback style={{
                                                            height: 50,
                                                            justifyContent: 'center', alignItems: 'center',
                                                            borderRadius: 15,
                                                            backgroundColor: cardBackground, width: "80%",
                                                        }}>
                                                            <View style={{
                                                            height: 50,
                                                            justifyContent: 'center', alignItems: 'center',
                                                            borderRadius: 15,
                                                            backgroundColor: cardBackground, width: "80%",
                                                        }}>
                                                                <ActivityIndicator animating={this.state.loading} size='large' color={white} />
                                                            </View>
                                                        </TouchableWithoutFeedback>
                                                        : */}
                                                    <TouchableOpacity onPress={() => this.AcceptEvents("Rejected", item.data.data.id)} activeOpacity={1}
                                                        style={{
                                                            height: 50,
                                                            justifyContent: 'center', alignItems: 'center',
                                                            borderRadius: 15,
                                                            backgroundColor: cardBackground, width: "80%",
                                                        }}>
                                                        <Text style={[styles.text, { color: 'gray', paddingHorizontal: 5, fontWeight: "700" }]}>
                                                            Reject
                                                </Text>
                                                    </TouchableOpacity>
                                                    {/* } */}
                                                </View>
                                                <View style={{ flex: 0.5, alignItems: "center" }}>
                                                    {/* {this.state.loading ?
                                                        <TouchableWithoutFeedback  style={{
                                                            height: 50,
                                                            justifyContent: 'center', alignItems: 'center',
                                                            borderRadius: 15,
                                                            backgroundColor: AcceptBottonColor, width: "80%",
                                                        }}>
                                                            <View style={{
                                                            height: 50,
                                                            justifyContent: 'center', alignItems: 'center',
                                                            borderRadius: 15,
                                                            backgroundColor: AcceptBottonColor, width: "80%",
                                                        }}>
                                                                <ActivityIndicator animating={this.state.loading} size='large' color={white} />
                                                            </View>
                                                        </TouchableWithoutFeedback>
                                                        : */}
                                                    <TouchableOpacity onPress={() => this.AcceptEvents("Accepted", item.data.data.id)} activeOpacity={1}
                                                        style={{
                                                            height: 50,
                                                            justifyContent: 'center', alignItems: 'center',
                                                            borderRadius: 15,
                                                            backgroundColor: AcceptBottonColor, width: "80%",
                                                        }}>
                                                        <Text style={[styles.text, { color: white, paddingHorizontal: 5, fontWeight: "700" }]}>
                                                            Accept
                                                </Text>
                                                    </TouchableOpacity>
                                                    {/* } */}
                                                </View>

                                            </View>}

                                        </View>

                                    </TouchableWithoutFeedback>
                                )}
                            />
                        }
                    </View>
                </ScrollView>
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
        // paddingVertical: 5,
        // textAlignVertical: "top",
        fontFamily: sofiaFont,
    },
    view: {
        flex: 1,
        marginVertical: 5,
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 5,
    },

});

const mapProps = state => ({
    user: state.root.user,
});

export default connect(
    mapProps,
    null,
)(Notification);