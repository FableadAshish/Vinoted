import {
  LOGIN,
  LOGOUT,
  LOADING,
  END_LOADING,
  SHOW_TOAST,
  SET_USER,
  SET_CART,
  CHANGE_CONNECTION_STATUS,
  TOGGLE_SNACKBAR,
  RESET_CART,
  UTILITIES_ALL,
  CATEGORIES_ALL,
  SET_THEME,
  USER_ROLE,
  CMS_DATA,
  UNREAD_MESSAGES,
} from '../constants';

export function login(user = null) {
  return dispatch => {
    dispatch({
      type: LOGIN,
      user,
    });
  };
}

export function connectionChange(status = false, connectionInfo = null) {
  return dispatch => {
    dispatch({
      type: CHANGE_CONNECTION_STATUS,
      status,
      connectionInfo,
    });
  };
}

export function loading() {
  return {type: LOADING};
}

export function showToast() {
  return {type: SHOW_TOAST};
}

export function endLoading() {
  return {type: END_LOADING};
}

export function logout() {
  return dispatch => {
    dispatch({type: LOGOUT});
  };
}

export function toggleSnackbar(showError = false, error = null, toast = {}) {
  return dispatch => {
    dispatch({
      type: TOGGLE_SNACKBAR,
      showError,
      toast,
      error,
    });
  };
}
export function setUser(user = {}) {
  return dispatch => {
    dispatch({
      type: SET_USER,
      user,
    });
  };
}

export function setTheme(theme = {}) {
  return dispatch => {
    dispatch({
      type: SET_THEME,
      theme,
    });
  };
}

export function setUserRole(role = '') {
  return dispatch => {
    dispatch({
      type: USER_ROLE,
      role,
    });
  };
}

export function setUtilities(utilities_all = []) {
  console.log('helodfkldl', utilities_all);
  return dispatch => {
    dispatch({
      type: UTILITIES_ALL,
      utilities_all,
    });
  };
}

export function setCms(cms_data = []) {
  console.log('helodfkldl cms data..', cms_data);
  return dispatch => {
    dispatch({
      type: CMS_DATA,
      cms_data,
    });
  };
}

export function setCategories(categories_all = []) {
  console.log('categories.....', categories_all);
  return dispatch => {
    dispatch({
      type: CATEGORIES_ALL,
      categories_all,
    });
  };
}

export const unreadMessages = payload => {
  console.log('unreadMessages', payload);
  return dispatch => {
    dispatch({
      type: UNREAD_MESSAGES,
      payload,
    });
  };
};

// export function setCartCount(count=0) {
//     return dispatch => {
//         dispatch({
//             type: SET_CART,
//             count:count
//         })
//     }
// }
// export function resetCartCount() {
//     return dispatch => {
//         dispatch({
//             type: RESET_CART,
//             count:0
//         })
//     }
// }
