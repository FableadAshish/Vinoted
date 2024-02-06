// import messaging from '@react-native-firebase/messaging';
// import AsyncStorage from '@react-native-community/async-storage';

// export async function requestUserPermission() {
//   const authStatus = await messaging().requestPermission();
//   const enabled =
//     authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
//     authStatus === messaging.AuthorizationStatus.PROVISIONAL;

//   if (enabled) {
//     console.log('Authorization status:', authStatus);
//     getFcmToken();
//   }
// }

// const getFcmToken = async () => {
//   try {
//     let getToken = await AsyncStorage.getItem('fcmToken');
//     console.log("Token Retrieved Again", getToken);

//     if (!getToken) {
//       let fcmToken = await messaging().getToken();
//       await AsyncStorage.setItem("fcmToken", JSON.stringify(fcmToken));
//       console.log("New FCM Token:", fcmToken);
//     }
//   } catch (error) {
//     console.log("Error Retrieving Token", error);
//   }
// }
