import AsyncStorage from '@react-native-community/async-storage';
import http from '../http';
import store from '../store';
import axios from 'axios';
import {setUser} from '../store/Actions/common';
import {isEmpty} from 'lodash';
import * as RootNavigation from '../navigation/RootNavigation';

const localStorageName = 'app-token';

export async function _register(user) {
  try {
    // console.log('This is Form Value', user);

    let userData = await http.post('sommelier/signup', user);
    // console.log('User data:', userData.data); // parse the data property of the response

    // Assuming _setLocalStorage is also an asynchronous function
    await _setLocalStorage(userData.data); // pass the data property of the response to _setLocalStorage

    return userData.data; // return the data property of the response
  } catch (err) {
    // console.log('Error in register in Api', err);
    throw err; // Re-throw the error to be caught in the calling function
  }
}
// }

export async function _(user) {
  try {
    let url = 'auth/login';
    let userLoginData = await http.post(url, user); // Note the 'await' here
    // console.log('user Login Data:', userLoginData);
    store.dispatch(setUser(userLoginData));
    await _handleAuthentication(userLoginData);
  } catch (error) {
    // console.log('Error in log in Api', error);
    throw error; // Rethrow the error to propagate it to the calling code
  }
}

// export function _login(user) {
//   return new Promise(async (resolve, reject) => {
//     let url = 'auth/login';
//     http
//       .post(url, user)
//       .then(async res => {
//         store.dispatch(setUser(res));
//         resolve(_handleAuthentication(res));
//       })
//       .catch(err => {
//         reject(err);
//         console.log('Error in log in Api', err);
//       });
//   });
// }
export async function _login(user) {
  try {
    let url = 'auth/login';
    const res = await http.post(url, user);
    store.dispatch(setUser(res));
    return _handleAuthentication(res);
  } catch (error) {
    console.log('Error in log in Api', error);
    throw error;
  }
}

// let url = 'auth/login';
// http
//   .post(url, user)
//   .then(async res => {
//     store.dispatch(setUser(res));
//     resolve(_handleAuthentication(res));
//   })
//   .catch(err => {
//     reject(err);
//     console.log('Error in log in Api', err);
//   });
// }
// }

export function _verifyOTP(user) {
  // console.log('_verifyOTP', user);
  return new Promise((resolve, reject) => {
    let url = 'auth/verify-email';
    http
      .post(url, user)
      .then(res => {
        const {token, user} = res;
        // console.log('Api Responce', res);
        store.dispatch(setUser(res));
        resolve(_handleAuthentication(res));
        // resolve(true)
      })
      .catch(err => {
        // console.log('Api err Responce', err);
        reject(err);
      });
  });
}

export function _handleAuthentication(data) {
  // console.log('_handleAuthentication data', data);
  return new Promise((resolve, reject) => {
    _setLocalStorage(data)
      .then(res => {
        // console.log('_handleAuthentication Responce', res);
        resolve(_handleAuthUser());
      })
      .catch(err => {
        reject(err);
      });
  });
}

export function _setLocalStorage(data) {
  // console.log('SetResponceDATA', data);
  return new Promise((resolve, reject) => {
    const data_user = AsyncStorage.setItem(
      localStorageName,
      JSON.stringify(data),
    );
    AsyncStorage.setItem(localStorageName, JSON.stringify(data))
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        // console.log('_setLocalData from async', err);
        reject(err);
      });
  });
}

export function _getAcessToken() {
  return new Promise((resolve, reject) => {
    _getUser()
      .then(res => {
        // console.log('responcetokenAcces', res);
        if (res) {
          // console.log('res', res);
          resolve(res.data.access_token);
        } else {
          resolve(null);
        }
      })
      .catch(err => {
        reject(err);
        // console.log('Error on accesstoken', err);
        // reject(RootNavigation.replace('Auth'))
      });
  });
}

export function _getUser() {
  return new Promise(async (resolve, reject) => {
    await AsyncStorage.getItem(localStorageName)
      .then(res => {
        // console.log('getuserFunction', JSON.parse(res));
        // console.log('localStorageName', JSON.parse(res).access_token);
        resolve(JSON.parse(res));
      })
      .catch(err => {
        // console.log('Error on getuser', err);
        reject(err);
      });
  });
}

export function _handleAuthUser(userData) {
  return new Promise((resolve, reject) => {
    _getUser()
      .then(res => {
        const {user} = res.data;
        // console.log('This is user foor Verification:', user);
        if (isEmpty(res) && isEmpty(res.data)) {
          // console.log('idhar aaya111111');
          RootNavigation.replace('Auth');
          resolve(true);
        } else if (user.email_verified_at == null) {
          // console.log('VerifyEmail......handle2222');
          RootNavigation.replace('Auth', {screen: 'VerifyEmail'});
          resolve(user);
        } else {
          // console.log('idhar aaya33333');
          RootNavigation.replace('App');
          resolve(user);
        }
      })
      .catch(err => {
        RootNavigation.replace('Auth');
        reject(false);
      });
  });
}

export function _logout() {
  return new Promise(async (resolve, reject) => {
    // let url = 'auth/signout';
    // http.get('/auth/signout').then(async res => {
    store.dispatch(setUser());
    await AsyncStorage.clear();
    RootNavigation.replace('Auth');
    resolve(true);
    // }).catch(err => {
    //     reject(err)
    // })
  });
}
