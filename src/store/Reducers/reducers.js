import {
  LOADING,
  END_LOADING,
  SHOW_TOAST,
  CLOSE_TOAST,
  SET_USER,
  SET_CART,
  CHANGE_CONNECTION_STATUS,
  TOGGLE_SNACKBAR,
  RESET_CART,
  UTILITIES_ALL,
  CATEGORIES_ALL,
  SET_THEME,
  USER_ROLE,
  CMS_DATA
} from '../constants';

const initalState = {
  loading: false,
  error: {},
  showError: false,
  toast: {},
  user: {},
  theme : {},
  cartCount: 0,
  isConnected: false,
  connectionInfo: {},
  utilities_all: [],
  categories_all: [],
  role : '',
  cms_data : []
};

export default (reducers = function(state = initalState, actions) {
  switch (actions.type) {
    case LOADING:
      return {
        ...state,
        loading: true,
      };
    case SET_USER:
      return {
        ...state,
        user: actions.user,
      };
      case USER_ROLE:
      return {
        ...state,
        role: actions.role,
      };
    case SET_THEME:
      return {
        ...state,
        theme: actions.theme,
      };
      case CMS_DATA:
      return {
        ...state,
        cms_data: actions.cms_data,
      };
    case TOGGLE_SNACKBAR:
      // if(actions.showError === state.showError) return

      return {
        ...state,
        toast: actions.toast,
        error: actions.error,
        showError: actions.showError,
      };
    case SHOW_TOAST:
      return {
        ...state,
        toast: {
          ...action.toast,
        },
        error: action.error,
      };
    case CLOSE_TOAST:
      return {
        ...state,
        toast: {},
        error: null,
      };
    case END_LOADING:
      return {
        ...state,
        loading: false,
      };
    case CHANGE_CONNECTION_STATUS:
      return {
        ...state,
        isConnected: actions.status,
        connectionInfo: actions.connectionInfo,
      };
    case SET_CART:
      return {
        ...state,
        cartCount: state.cartCount + actions.count,
      };
    case RESET_CART:
      return {
        ...state,
        cartCount: 0,
      };
    case UTILITIES_ALL:
      return {
        ...state,
        utilities_all: actions.utilities_all,
      };
    case CATEGORIES_ALL:
      return {
        ...state,
        categories_all: actions.categories_all,
      };
    default:
      return state;
  }
});