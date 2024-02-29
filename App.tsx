import React from 'react';
import messaging from '@react-native-firebase/messaging';
import {Provider} from 'react-redux';
import {View, Text, Image} from 'react-native';
import store from './src/store';
import {NavigationContainer} from '@react-navigation/native';
import MainNavigation from './src/navigation/index';
import * as RootNavigation from './src/navigation/RootNavigation';
import {navigationRef, isReadyRef} from './src/navigation/RootNavigation';
// import {Root, Toast, Button} from 'native-base';
import NotificationPopup from 'react-native-push-notification-popup';
// import Notification from './src/view/Home/Notification';
import {primaryColor, white, sofiaFont} from './src/style/variables';
import EStyleSheet from 'react-native-extended-stylesheet';
import AsyncStorage from '@react-native-community/async-storage';
import {
  GestureHandlerRootView,
  TouchableOpacity,
} from 'react-native-gesture-handler';
// import SplashScreen from 'react-native-splash-screen';
import {NativeBaseProvider} from 'native-base';
import {Images} from './theme/Images';
EStyleSheet.build({});
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {},
      initialRoute: 'Notification',
    };

    // Bind getFcmToken function to component instance
    this.getFcmToken = this.getFcmToken.bind(this);
  }

  componentDidMount() {
    this.unsuscrib();
    // this.forgroundmessanging();
    console.log('check Subs');
    isReadyRef.current = true;
    console.log('isNavigation Mounted: ', isReadyRef.current);
    console.log('current root state', navigationRef.current.getRootState());
  }

  componentWillUnmount() {
    isReadyRef.current = false;
    console.log('isNavigation Mounted: ', isReadyRef.current);
  }

  getFcmToken = async () => {
    try {
      let getToken = await AsyncStorage.getItem('fcmToken');
      console.log('Token Retrieved Again', getToken);

      if (!getToken) {
        let fcmToken = await messaging().getToken();
        await AsyncStorage.setItem('fcmToken', JSON.stringify(fcmToken));
        this.setState({fcmToken});
      }
    } catch (error) {
      console.log('Error Retrieving Token', error);
    }
  };

  requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  };

  unsuscrib = async () => {
    // console.log('Hello This is');
    await messaging().onMessage(async remoteMessage => {
      const notification = remoteMessage.notification;
      console.log('helowin', remoteMessage.notification);
      this.popup.show({
        onPress: () =>
          remoteMessage.data.action_item == 'new_message'
            ? RootNavigation.push('Chat', {
                item: {id: remoteMessage.data.action_id},
              })
            : RootNavigation.push('Notification', {isFromProp: true}), //NavigationIssue
        appTitle: 'Vinoted App',
        timeText: 'Now',
        title: `${notification.title}`,
        body: `${notification.body}`,
        slideOutTime: 5000,
      });
    });

    await messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log(remoteMessage, 'index.setBackgroundMessageHandler');
    });

    await messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.data,
      );

      setTimeout(() => {
        if (remoteMessage.data.action_item == 'new_message') {
          RootNavigation.push('Chat', {
            item: {id: remoteMessage.data.action_id},
          });
        } else {
          RootNavigation.push('Notification', {isFromProp: true}); //NavigationIssue
        }
      }, 1000);
    });
    try {
      const notification = await messaging().getInitialNotification();
      //NavigationIssue
      if (notification) {
        console.log(
          'Notification caused app to open from quit state:',
          notification,
        );
        setTimeout(() => {
          if (
            notification.data &&
            notification.data.action_item == 'new_message'
          ) {
            RootNavigation.push('Chat', {
              item: {id: notification.data.action_id},
            });
          } else {
            RootNavigation.push('Notification', {isFromProp: true});
          }
        }, 4000); //NavigationIssue
      }
    } catch (error) {
      logger.error('errroorororAPP', error);
    }
    //  await messaging()
    //     .getInitialNotification();
    //     if(remoteMessage.data && remoteMessage.data.action_item=='new_message'){
    //             RootNavigation.replace("Chat",{item:{id:remoteMessage.data.action_id}});
    //           }else{
    //             RootNavigation.replace("Notification");
    //           }
    // .then((remoteMessage) => {
    //   console.log(
    //     'Notification caused app to open from quit state:',
    //     remoteMessage)
    //     if(remoteMessage.data && remoteMessage.data.action_item=='new_message'){
    //       RootNavigation.replace("Chat",{item:{id:remoteMessage.data.action_id}});
    //     }else{
    //       RootNavigation.replace("Notification");
    //     }
    //   setLoading(false);
    // }).catch((error)=>{
    //   console.log("ErorrgetInitialNotification",error)
    // })
  };

  renderCustomPopup = ({appIconSource, appTitle, timeText, title, body}) => (
    <TouchableOpacity
      onPress={() => RootNavigation.push('Notification')}
      style={{
        borderRadius: 10,
        backgroundColor: white,
        height: 100,
        width: '100%',
        alignSelf: 'center',
      }}>
      <View
        style={{
          height: 40,
          width: '100%',
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          justifyContent: 'center',
          paddingHorizontal: 20,
          backgroundColor: 'whitesmoke',
          elevation: 1,
        }}>
        <Image source={Images.blueLogo} style={{height: 20, width: '30%'}} />
      </View>
      <View style={{paddingHorizontal: 10}}>
        <Text
          style={{
            color: primaryColor,
            fontSize: 15,
            fontFamily: sofiaFont,
            textTransform: 'capitalize',
          }}>
          {title}
        </Text>
        <Text
          style={{color: 'lightgray', fontSize: 12, fontFamily: sofiaFont}}
          numberOfLines={2}>
          {body}
        </Text>
      </View>
      {/* <Button title='Notification' onPress={() => console.log('Popup button onPress!')} /> */}
    </TouchableOpacity>
  );

  render() {
    console.disableYellowBox = true;
    return (
      <GestureHandlerRootView style={{flex: 1}}>
        <NativeBaseProvider>
          <Provider store={store}>
            <NavigationContainer
              ref={navigationRef}
              onReady={() => {
                isReadyRef.current = true;
              }}>
              <MainNavigation />
              <NotificationPopup
                ref={ref => (this.popup = ref)}
                renderPopupContent={this.renderCustomPopup}
              />
            </NavigationContainer>
          </Provider>
        </NativeBaseProvider>
      </GestureHandlerRootView>
    );
  }
}
