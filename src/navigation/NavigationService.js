import {CommonActions, StackActions} from '@react-navigation/native';

let _navigator;

export function setTopLevelNavigator(navigatorRef) {
  // console.log("navigatorRef",navigatorRef)
  _navigator = navigatorRef;
}

export function navigate(routeName, params) {
  _navigator.dispatch(CommonActions.push({routeName, params}));
}

export function resetNavigation(routeName, params) {
  _navigator.dispatch(
    StackActions.reset({
      index: 0,
      key: null,
      actions: [CommonActions.navigate({routeName, params})],
    }),
  );
}
