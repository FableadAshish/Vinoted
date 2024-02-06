import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Dimensions,
  View,
  Image,
  Alert,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import { Text } from 'react-native';
import {
  white,
  primaryColor,
  secondryTextColor,
  sofiaFont
} from '../../style/variables';
import { connect } from 'react-redux';
import { _logout, _getUser } from '../../api/auth';
import { DrawerActions } from '@react-navigation/native';
import { isEmpty, unset } from 'lodash';
import messaging from "@react-native-firebase/messaging"
const { height, width } = Dimensions.get('window');


class SideBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      visible: false,
      show: false,
      form: {},
      userData: {},
      currentUser: {},
      currentUserRole: '',
      theme: null,
      isFromCms: false,
      referModal: false
    };
  }

  async componentDidMount() {
    const getuser = await _getUser()
    console.log("getuserrrr", getuser)


  }




  handleChange(name, value) {
    let { errors } = this.state;
    unset(errors, name);
    this.setState(prevState => ({
      form: { ...prevState.form, [name]: value },
      errors,
    }));
  }

  navigateTo(route, param) {

    this.props.navigation.dispatch(DrawerActions.closeDrawer());
    this.props.navigation.navigate(route, param);
  }

  // show refer modal

  onLogout = () => {
    Alert.alert('Logout', 'Are you sure to logout from app?', [
      { text: 'Cancel', onPress: () => null },
      { text: 'Logout', onPress: this.onServerLogout.bind(this) },
    ]);
  };

  onServerLogout = async () => {
    const getuser = await _getUser()
    console.log("getuserrrr", getuser)
    _logout()
      .then(res => {
        console.log("Logout Res",res)
        this.props.navigation.dispatch(DrawerActions.closeDrawer());
        this.props.navigation.replace('Auth');
        messaging().unsubscribeFromTopic(`user_id_${getuser.data.user.id}`)
        messaging().unsubscribeFromTopic("vinoted")
      })
      .catch(err => {
        console.log('errorrr', err);
        let errors = {};
        if (err && err.status == 422) errors = err.errors;
        this.setState({ errors });
        console.log('errorrr 422', err);
        // this.setState({isLoading: false});
      });
  }




  render() {
    console.log('HDHDHDHHD in Drawer', this.state.currentUserRole);
    const { name, errors, borderColor, form } = this.props;
    let isLoggedIn = !isEmpty(this.props.user);

    return (
      <>
        <View style={{
          flex: 1,
          backgroundColor: primaryColor
        }}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              justifyContent: 'space-between',
              flexDirection: 'column',
            }}>
            <View
              style={{
                height: 70,
                justifyContent: 'center',
                marginTop: 10,
                marginBottom: 30,
                alignItems: 'center',
              }}>
              <Image
                style={{ height: '80%', width: '80%' }}
                source={require('../../assets/Logo.png')}
              />
            </View>
            <TouchableOpacity
              style={styles.listItem}
            // onPress={this.props.navigation.replace('App', { screen: "Home" })}
            >
              <Text style={[styles.text, { fontFamily: sofiaFont }]}>Home</Text>
            </TouchableOpacity>

            <TouchableOpacity
              button
              noBorder
              onPress={() => this.navigateTo('MyEvents', { type: 'myevent' })}
              style={styles.listItem}>
              {/* <Icon type="FontAwesome" name="product-hunt" style={styles.icon} /> */}
              <Text style={[styles.text]}>All Events</Text>
            </TouchableOpacity>



            <TouchableOpacity
              button
              noBorder
              onPress={() => this.navigateTo('EventRequest', { type: 'pendingrequest' })}
              style={styles.listItem}>
              {/* <Image type="FontAwesome" name="product-hunt" style={styles.icon} /> */}
              <Text style={[styles.text]}>Requested Events</Text>
            </TouchableOpacity>

            <TouchableOpacity
              button
              noBorder
              onPress={() => this.navigateTo('PendingEvents', { type: 'pendingevent' })}
              style={styles.listItem}>
              {/* <Icon type="FontAwesome" name="product-hunt" style={styles.icon} /> */}
              <Text style={[styles.text]}>Upcoming Events</Text>
            </TouchableOpacity>

            {/* <ListItem
                  button
                  noBorder
                  onPress={() => this.navigateTo('EventRequest',{type:'pendingrequest'})}
                  style={styles.listItem}>
                   <Text style={[styles.text]}>Event Request</Text>
                </ListItem> */}

            <TouchableOpacity
              button
              noBorder
              onPress={() => this.navigateTo('MyTestingNotes')}
              style={styles.listItem}>
              <Text style={[styles.text]}>My Tasting Notes</Text>
            </TouchableOpacity>

            <TouchableOpacity
              button
              noBorder
              onPress={() => this.navigateTo('Messaging')}
              style={styles.listItem}>
              {/* <Icon type="FontAwesome" name="product-hunt" style={styles.icon} /> */}
              <Text style={[styles.text]}>Live Chat</Text>
            </TouchableOpacity>


            <TouchableOpacity
              button
              noBorder
              onPress={() => this.navigateTo('Notification')}
              style={styles.listItem}>
              {/* <Icon type="FontAwesome" name="product-hunt" style={styles.icon} /> */}
              <Text style={[styles.text]}>Notifications</Text>
            </TouchableOpacity>
            {/* 
                <ListItem
                  button
                  noBorder
                  onPress={() => this.navigateTo('Search')}
                  style={styles.listItem}>
                  <Text style={[styles.text]}>Search</Text>
                </ListItem> */}

            <TouchableOpacity
              button
              noBorder
              onPress={() => this.navigateTo('ChangePassword')}
              style={styles.listItem}>
              {/* <Icon type="FontAwesome" name="product-hunt" style={styles.icon} /> */}
              <Text style={[styles.text]}>Change Password</Text>
            </TouchableOpacity>

            <TouchableOpacity
              button
              noBorder
              onPress={() => this.onLogout()}
              style={styles.listItem}>
              {/* <Icon type="AntDesign" name="logout" style={styles.icon} /> */}
              <Text style={[styles.text]}>Logout</Text>
            </TouchableOpacity>

          </ScrollView>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
  },
  headerContainer: {
    height: 100,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userDetailContainer: {
    paddingHorizontal: 5,
    flex: 1,
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  text: {
    fontSize: 14,
    marginLeft: 10,
    // fontWeight: 'bold',
    color: 'white',
    fontFamily: sofiaFont,
    // opacity: 0.6,
  },
  icon: {
    color: white,
    fontSize: 24,
    width: 24,
    fontFamily: sofiaFont,
  },
  profilePic: {
    width: 70,
    height: 70,
    borderRadius: 35,
    margin: 10,
  },
  listItem: {
    height: 40,
    // fontFamily:sofiaFont
    //backgroundColor:'red'
    marginLeft:25

  },
  logoContainer: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    height: 80,
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: width - 100,
    height: 50,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 5,
    marginBottom: 5,
    elevation: 4,
    // backgroundColor: white,
    backgroundColor: secondryTextColor,
  },
  AddmodelView: {
    height: 380,
    width: width - 20,
    backgroundColor: white,
    alignItems: 'center',
    // justifyContent: "center",
    borderRadius: 10,
    marginVertical: 100,
  },
  modelView: {
    height: 150,
    width: width - 20,
    backgroundColor: white,
    alignItems: 'center',
    // justifyContent: "center",
    borderRadius: 10,
    marginVertical: 100,
  },
  modelheader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  viewinput: {
    height: 200,
    width: width - 90,
    backgroundColor: white,
    flexDirection: 'row',
    marginBottom: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttoninput: {
    alignItems: 'center',
    marginTop: 5,
    // flex:1,
    width: width - 90,
    alignSelf: 'center',
    height: 45,
    justifyContent: 'center',
    borderRadius: 5,
    backgroundColor: secondryTextColor,
  },
});
const mapState = state => ({
  user: state.root.user,
  theme: state.root.theme,
  user_role: state.root.role,
  cms_data: state.root.cms_data,
});
export default connect(
  mapState,
  null,
)(SideBar);

