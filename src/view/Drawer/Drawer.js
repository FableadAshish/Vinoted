import React from 'react';
import {
  ScrollView,
  View,
  Image,
  Alert,
  TouchableOpacity,
  Linking,
} from 'react-native';
import {Text} from 'react-native';
import {primaryColor, sofiaFont} from '../../style/variables';
import {connect} from 'react-redux';
import {_logout, _getUser} from '../../api/auth';
import {DrawerActions} from '@react-navigation/native';
import {unset} from 'lodash';
import messaging from '@react-native-firebase/messaging';
import styles from './Styles/DrawerStyles';

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
      referModal: false,
    };
  }

  handleChange(name, value) {
    let {errors} = this.state;
    unset(errors, name);
    this.setState(prevState => ({
      form: {...prevState.form, [name]: value},
      errors,
    }));
  }

  navigateTo(route, param) {
    this.props.navigation.dispatch(DrawerActions.closeDrawer());
    this.props.navigation.navigate(route, param);
  }
  onLogout = () => {
    Alert.alert('Logout', 'Are you sure to logout from app?', [
      {text: 'Cancel', onPress: () => null},
      {text: 'Logout', onPress: this.onServerLogout.bind(this)},
    ]);
  };

  onServerLogout = async () => {
    const getuser = await _getUser();
    _logout()
      .then(res => {
        this.props.navigation.dispatch(DrawerActions.closeDrawer());
        this.props.navigation.replace('Auth');
        messaging().unsubscribeFromTopic(`user_id_${getuser.data.user.id}`);
        messaging().unsubscribeFromTopic('vinoted');
      })
      .catch(err => {
        let errors = {};
        if (err && err.status == 422) {
          errors = err.errors;
        }
        this.setState({errors});
      });
  };

  render() {
    return (
      <>
        <View
          style={{
            flex: 1,
            backgroundColor: primaryColor,
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
                style={{height: '80%', width: '80%'}}
                source={require('../../assets/Logo.png')}
              />
            </View>
            <TouchableOpacity
              style={styles.listItem}
              onPress={() => this.navigateTo('Home')}>
              <Text style={[styles.text, {fontFamily: sofiaFont}]}>Home</Text>
            </TouchableOpacity>

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
              onPress={() =>
                this.navigateTo('EventRequest', {type: 'pendingrequest'})
              }
              style={styles.listItem}>
              <Text style={[styles.text]}>Tasting Invitations</Text>
            </TouchableOpacity>

            <TouchableOpacity
              button
              noBorder
              onPress={() =>
                this.navigateTo('PendingEvents', {type: 'pendingevent'})
              }
              style={styles.listItem}>
              <Text style={[styles.text]}>Upcoming Tastings</Text>
            </TouchableOpacity>

            <TouchableOpacity
              button
              noBorder
              onPress={() => this.navigateTo('Messaging')}
              style={styles.listItem}>
              <Text style={[styles.text]}>Live Chat</Text>
            </TouchableOpacity>

            <TouchableOpacity
              button
              noBorder
              onPress={() => this.navigateTo('Notification')}
              style={styles.listItem}>
              <Text style={[styles.text]}>Notifications</Text>
            </TouchableOpacity>

            <TouchableOpacity
              button
              noBorder
              onPress={() => this.navigateTo('ChangePassword')}
              style={styles.listItem}>
              <Text style={[styles.text]}>Change Password</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.listItem}
              onPress={() =>
                Linking.openURL('https://www.vinoted.com/user-agreement')
              }>
              <Text style={[styles.text]}>User Aggrement</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.listItem}
              onPress={() =>
                Linking.openURL('https://www.vinoted.com/privacy-policy')
              }>
              <Text style={[styles.text]}>Privacy Policy</Text>
            </TouchableOpacity>

            <TouchableOpacity
              button
              noBorder
              onPress={() => this.onLogout()}
              style={styles.listItem}>
              <Text style={[styles.text]}>Logout</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </>
    );
  }
}

const mapState = state => ({
  user: state.root.user,
  theme: state.root.theme,
  user_role: state.root.role,
  cms_data: state.root.cms_data,
});
export default connect(mapState, null)(SideBar);
