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
    TouchableOpacity, ActivityIndicator, PickerIOSComponent, TextInput
} from 'react-native';
import Header from '../../../component/Header/Header';
import { Icon, Toast } from 'native-base';
import Button from '../../../component/Common/Button';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import SearchCard from '../../../component/CustomeComponent/SearchCard';
import DateTimePicker from '@react-native-community/datetimepicker';
import {
    white,
    secondryTextColor,
    secondryColor,
    primaryColor,
    cardBackground, error, black, sofiaFont, lineColor
} from '../../../style/variables';
import { isEmpty, unset, set, isNull } from 'lodash';
import { connect } from 'react-redux';
import http from '../../../http'
import Slider from "react-native-smooth-slider";
import moment from 'moment'
import { Picker } from '@react-native-picker/picker';
// import Slider from '@react-native-community/slider';
const { width, height } = Dimensions.get('window');
import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'
// import MultiSelect from 'react-native-multiple-select';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Modal from 'react-native-modal';
import { Images } from '../../../../theme/Images';
import { Colors } from 'react-native/Libraries/NewAppScreen';
const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient)







class ChooseProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                wineType: [],
            },
            data: [],
            Testing: {},
            showToast: false,
            modalVisible: false,
            visible: false,
            refreshing: false,
            loading: false,
            productlist: [],
            min: 0,
            max: 1,
            errors: {},
            slideValue: "",
            eventTesting: {},
            selectedItems: [],
            SupplierList: [],
            date: '',
            currentDate: new Date(),
            ShowDate: false,
            checked: false,
            namekey: '',
            value: '',
            page: 0,
        };
    }

    setModalVisible(visible) {
        this.setState({ modalVisible: visible })
    }

    componentWillUnmount = () => {
        this._unsubscribe()
    }


    componentDidMount() {

        this.Store()
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            console.log('hello',);
            this.Store();
        });
    }

    Store = async () => {
        const data = [
            {
                id: 1,
                name: 'W - White ',
                value: 'White',
                checked: false,
            },
            {
                id: 2,
                name: 'R - Red ',
                value: 'Red',
                checked: false,
            },
            {
                id: 3,
                name: 'RO - Rose',
                value: 'Rose',
                checked: false,
            },
            {
                id: 4,
                name: 'SP - Sparkling',
                value: 'sparkling',
                checked: false,
            },
            {
                id: 5,
                name: 'SW - Sweet',
                value: 'Sweet',
                checked: false,
            },
            {
                id: 6,
                name: 'Other - Other',
                value: 'Other',
                checked: false,
            },

        ]
        this.setState({ loading: true, data });
        http.get(`sommelier/suppliers?page=${this.state.page}`).then(res => {
            console.log("response UsersList..", res)
            this.setState({
                SupplierList: res.data.page,
                loading: false,
                refreshing: false
            })

        }).catch(err => {
            console.log('errorrr', err);
            let errors = {};
            if (err && err.status == 422) errors = err.errors;
            this.setState({ loading: false, errors });
            console.log('errorrr ', err);
            this.setState({ loading: false, refreshing: false });
        });
    }


    productApi = async (text) => {
        this.setState({ loading: true, });
        http.get(`sommelier/product-search-by-name?product_name=${text}`).then(res => {
            console.log("productserach", res)
            this.setState({
                productlist: res.data.result,
                loading: false,
                refreshing: false
            })

        }).catch(err => {
            console.log('errorrr', err);
            let errors = {};
            if (err && err.status == 422) errors = err.errors;
            this.setState({ loading: false, errors });
            console.log('errorrr ', err);
            this.setState({ loading: false, refreshing: false });
        });
    }




    onSave = async () => {
        const { form } = this.state;
        console.log("Formdataon Filter", form)
        // this.props.navigation.navigate("SearchableTastingNots",{Search:form})
        this.props.navigation.navigate("SearchableTastingNots", { Search: form })
        this.setState({ form: { wineType: [] }, data: [] })
        // { 
        //     Object.entries(form).map(([key, value]) => {
        //      console.log("Key value", key, value)
        //      this.setState({ namekey: key, value })
        //  }
        //  )}
        //  const { namekey,value } = this.state;
        // this.setState({ loading: true, });
        // http.get(`sommelier/eventproductrating?page=${this.state.page}&${namekey}=${value}`).then(res => {
        //     console.log("responce of ProductRatinge noted", res)
        //     this.props.navigation.navigate("MyTestingNotes",{Search:res})


        // }).catch(err => {
        //     console.log("errr Notification", err)
        //     this.setState({ loading: false, refreshing: false });
        //     // this._snk.show("OIROOR")
        // });
    }


    color = () => {
        return (
            <View style={{ flex: 1, backgroundColor: "red" }}>
                <Text>12</Text>
            </View>
        )
    }

    handleChange(name, value) {
        console.log("name", name, value)

        let errors = this.state.errors;
        unset(errors, name);
        let form = { ...this.state.form, [name]: value };
        this.setState({ form });
    }



    onSelectedItemsChange = selectedItems => {
        this.setState({ selectedItems });
    };



    showMode = (currentMode) => {
        // setMode(currentMode);
        this.setState({ mode: currentMode, ShowDate: true })
    };



    showDatePicker = (name) => {
        console.log("date picker")
        this.showMode('date');
        // this.setState({date:name})
    };


    onChange = (e, d) => {
        const { form, } = this.state
        console.log("date timeonchangee", d)
        if (e.type != 'dismissed') {
            if (Platform.OS !== 'ios') {
                // if(date){
                this.setState({ form: { ...this.state.form, date: moment(d).format("YYYY-MM-DD") }, ShowDate: false, date: '' },);
                // }

            }

        } else {
            this.setState({ ShowDate: false })
        }


    }




    onCheck = (item, i) => {
        let items = this.state.data;
        const winetype = []
        items[i].checked = items[i].checked || item.id == items[i].id ? !items[i].checked : true
        // this.setState({data:items})
        items.forEach((item) => {
            if (item.checked == true) {
                winetype.push(item)
            }
        })
        this.setState({ form: { ...this.state.form, wineType: winetype }, ...this.state.data }, () => console.log("Formafterset", this.state.form.wineType))


    }



    selectProduct = (item) => {
        this.setState({ form: { ...this.state.form, product_name: item.title } }, () => this.setModalVisible(false))
    }

    render() {
        const { errors, form, Testing, is_favourite, eventTesting, selectedItems, checked, data } = this.state
        console.log("thdatawinetype", data)

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
                    onPress={() => this.props.navigation.goBack()}
                    image={require('../../../assets/Logo.png')}
                />


                <ScrollView
                    showsVerticalScrollIndicator={false}

                >
                    <View style={{ marginHorizontal: 5 }}>

                        {this.state.ShowDate &&
                            <DateTimePicker
                                // minimumDate={this.state.currentDate}
                                testID="dateTimePicker"
                                value={this.state.currentDate}
                                mode={this.state.mode}
                                is24Hour={true}
                                display="default"
                                onChange={(e, d) =>
                                    this.onChange(e, d)
                                }
                            />
                        }


                        <View style={{ paddingVertical: 10, paddingHorizontal: 5 }}>
                            <Text style={[styles.textheading, { fontSize: 25, color: white, fontFamily: sofiaFont }]}>Filters</Text>
                        </View>

                        <View style={[styles.view, { marginHorizontal: 5 }]}>

                            <TouchableOpacity
                                onPress={() => this.setModalVisible(true)}
                                style={styles.pickerView}>
                                <Text style={styles.pickerText}>Wine Name
                                </Text>
                                <View style={styles.pickerstyle}>
                                    <Text style={{ color: this.state.form.product_name ? white : "grey", marginLeft: 15, fontSize: 15, fontFamily: sofiaFont }}>{!isEmpty(this.state.form.product_name) ? this.state.form.product_name : 'Select'}</Text>

                                </View>

                            </TouchableOpacity>


                            <View style={styles.pickerView}>
                                <Text style={styles.pickerText}>Type
                                </Text>

                                {data.map((item, i) => {
                                    return (<TouchableOpacity
                                        onPress={() => this.onCheck(item, i)}
                                        style={{ flexDirection: "row", alignItems: "center", marginVertical: 2 }}>
                                        {/* <Icon name={item.checked ? "check-square" : "checkbox-passive"} type={item.checked ? "Feather" : 'Fontisto'} style={{ fontSize: 20, color: item.checked == true ? "white" : "grey", paddingHorizontal: 10 }} /> */}
                                        <Image source={item.checked ? Images.CheckedSquareIcon : Images.EmptyCheckSquareIcon} style={{ marginHorizontal: 10, height: 20, width: 20 }} tintColor={item.checked == true ? "white" : "grey"} />

                                        <Text style={[styles.pickerText, { color: item.checked == true ? "white" : "grey" }]}>{item.name}</Text>
                                    </TouchableOpacity>)
                                })}

                            </View>


                            <View style={styles.pickerView}>
                                <Text style={styles.pickerText}>Supplier Name
                                </Text>
                                <View style={styles.pickerstyle}>
                                    <Picker
                                        style={styles.pickerItem}
                                        itemStyle={styles.pickerItem}
                                        dropdownIconColor="white"
                                        selectedValue={this.state.form.supplierName}
                                        onValueChange={this.handleChange.bind(this, 'supplierName')}>
                                        <Picker.Item label="Select" value={null} />
                                        {this.state.SupplierList.map((item, i) => {
                                            return <Picker.Item label={item.name} value={item.name} />
                                        })}
                                    </Picker>
                                </View>
                                {/* {!isEmpty(errors) && errors["supplier_name"] && !form.supplier_name && (
                                    <Text style={{ fontFamily: sofiaFont, fontSize: 12, color: error }}>{errors["supplier_name"]}</Text>
                                )} */}
                            </View>



                            <View style={[styles.pickerView, { borderBottomColor: lineColor, borderBottomWidth: 1 }]}>
                                <Text style={styles.pickerText}>Tasting Date
                                </Text>
                                <TouchableOpacity
                                    //  onPress={() => this.showDatePicker("date")} 
                                    onPress={() => this.showDatePicker("date")}
                                    style={{ flexDirection: "row", alignItems: "center", marginVertical: 2, width: "100%", }}>
                                    <Text style={[styles.pickerText, { color: "grey", width: "90%",   }]}>{!isEmpty(form.date) ? form.date : "Select Date"}</Text>
                                    <Image source={Images.CalendarIcon} style={{ fontSize: 20}} tintColor={Colors.white} />

                                </TouchableOpacity>
                                {/* {!isEmpty(errors) && errors["supplier_name"] && !form.supplier_name && (
                                    <Text style={{ fontFamily: sofiaFont, fontSize: 12, color: error }}>{errors["supplier_name"]}</Text>
                                )} */}
                            </View>


                        </View>




                        <View style={[styles.view, { marginHorizontal: 5 }]}>


                            <View>
                                {this.state.loading ?
                                    <TouchableWithoutFeedback style={{ width: "100%" }}>
                                        <View style={[styles.button, { marginTop: 70 }]}>
                                            <ActivityIndicator animating={this.state.loading} size='large' color={white} />
                                        </View>
                                    </TouchableWithoutFeedback>
                                    :
                                    <Button
                                        title='Search'
                                        buttonstyles={{
                                            backgroundColor: secondryColor,
                                            width: '100%',
                                            borderRadius: 20,
                                            marginTop: 100
                                        }}
                                        textsyles={{ fontFamily: sofiaFont, color: '#fff', fontSize: 12 }}
                                        onPress={this.onSave}
                                    />}
                            </View>
                        </View>


                    </View>
                </ScrollView>






                {this.state.modalVisible &&
                    <Modal
                        transparent={true}
                        animationType={"none"}
                        visible={this.state.modalVisible}
                        style={{ flex: 1, marginVertical: -20, height: height, width: width, backgroundColor: "#00000069", alignSelf: "center" }}
                        onBackButtonPress={() => { this.setModalVisible(false) }}
                        onBackdropPress={() => { this.setModalVisible(false) }}
                    >


                        <View style={{ flex: 1, justifyContent: "center" }}>
                            <View style={styles.modelView}>

                                <Header
                                    navigation={this.props.navigation}
                                    iconColor={primaryColor}
                                    iconProps={Images.BackNavigationIcon}
                                    onPress={() => { this.setModalVisible(false) }}
                                    image={require('../../../assets/blueLogo.png')}
                                />


                                <View style={styles.searchcontainer}>

                                    <TextInput
                                        style={styles.input}
                                        // onChangeText={text => this.onTyping(text)}
                                        onChangeText={text => this.productApi(text)}
                                        value={this.state.searchText}
                                        underlineColorAndroid="transparent"
                                        placeholder="Type Wine Name"
                                    // placeholderTextColor={primaryColor}
                                    />
                                    <TouchableWithoutFeedback >
                                        <View style={styles.iconContainer}>
                                            {/* <Icon name="search" type="FontAwesome" style={styles.icon} ></Icon> */}
                                            <Image source={Images.SearchIcon} style={{ height: 22, width: 22 }} />
                                        </View>
                                    </TouchableWithoutFeedback>
                                </View>


                                <FlatList
                                    showsVerticalScrollIndicator={false}
                                    data={this.state.productlist}
                                    keyExtractor={(item, i) => i.toString()}
                                    horizontal={false}
                                    showsVerticalScrollIndicator={false}
                                    contentContainerStyle={{ flexGrow: 1 }}
                                    refreshControl={
                                        <RefreshControl
                                            refreshing={this.state.refreshing}
                                        // onRefresh={this.onRefresh}
                                        />
                                    }
                                    renderItem={({ item }) => (
                                        <TouchableOpacity onPress={() => this.selectProduct(item)} style={styles.productCard}>
                                            <Text style={{ color: primaryColor, fontFamily: sofiaFont, fontSize: 15 }}>{item.title}</Text>
                                        </TouchableOpacity>

                                    )}
                                />

                            </View>
                        </View>
                    </Modal>}




            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    thumb: {
        width: 20,
        height: 20,
        borderColor: "black",
        borderWidth: 1,
        backgroundColor: 'white',
        // borderBottomRightRadius: 100,
        // borderTopRightRadius: 100,

    },
    pickerView: {
        // marginHorizontal: 10,
        marginVertical: 20,
        // borderColor: "grey",
        // borderWidth: 1
    },
    pickerItem: {
        color: "grey",
        fontFamily: sofiaFont
    },
    pickerText: { color: "white", fontFamily: sofiaFont, marginVertical: 5, },
    track: {
        height: 20,
        width: 20,
        color: "green",
        borderBottomRightRadius: 20,
        borderTopRightRadius: 20,
    },
    pickerstyle: {
        height: 50, width: "100%",
        justifyContent: "center",
        borderBottomColor: lineColor,
        borderBottomWidth: 1,
        borderRadius: 5,
    },
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
        backgroundColor: primaryColor,
        // elevation: 1,
        borderRadius: 5,
        paddingVertical: 5,
        paddingHorizontal: 5,
    },
    button: {
        width: "100%",
        marginTop: 5,
        marginBottom: 5,
        borderRadius: 50,
        height: 45,
        backgroundColor: secondryColor,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modelView: {
        height: "100%",
        width: "100%",
        backgroundColor: white,
        alignSelf: "center",
        justifyContent: "center",
        borderRadius: 10,
        marginTop: 40
    },
    modelheader: {
        height: 30,
        padding: 20,
        marginBottom: 2,
        width: "90%",
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
    },
    input: {
        width: "80%",
        color: primaryColor,
        fontFamily: sofiaFont

    },
    searchcontainer: {
        flexDirection: "row",
        backgroundColor: white,
        elevation: 1,
        width: '95%',
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        borderRadius: 20,
    },
    icon: {
        fontSize: 20,
        color: primaryColor,
        fontFamily: sofiaFont,

    },
    productCard:
    {
        height: 50,
        width: "90%",
        alignSelf: "center",
        justifyContent: "center",
        backgroundColor: white,
        elevation: 1,
        paddingHorizontal: 20,
        marginVertical: 5,
        borderRadius: 5
    }

});

const mapProps = state => ({
    user: state.root.user,
});

export default connect(
    mapProps,
    null,
)(ChooseProduct);