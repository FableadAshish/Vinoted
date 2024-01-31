import * as React from 'react';
import {CommonActions, StackActions} from '@react-navigation/native';

//import console = require('console');
export const isReadyRef = React.createRef();

export const navigationRef = React.createRef();

// export function navigate(routeName, params){
//   navigationRef.current.dispatch(
//     StackActions.navigate(routeName,
//      params
//     )
//   );
// }

export function push(routeName, params) {
  navigationRef.current.dispatch(StackActions.push(routeName, params));
}

export function resetAppAndNavigate(routeName, params) {
  navigationRef.current.dispatch(
    CommonActions.reset({
      index: 1,
      routes: [
        {name: 'App'},
        {
          name: routeName,
          params: params,
        },
      ],
    }),
  );
}

export function replace(routeName, params) {
  navigationRef.current.dispatch(StackActions.replace(routeName, params));
}

export function navigate(routeName, params) {
  console.log('isReadyRef...', isReadyRef);
  console.log('navigationRef...', navigationRef);
  //if (isReadyRef.current && navigationRef.current) {
  console.log('routeName');
  // Perform navigation if the app has mounted
  //navigationRef.current.dispatch(
  CommonActions.navigate({
    name: routeName,
    params,
  });
  // )
  //}
  // else {
  //  console.log('RootNavigation else block')
  // }
}
