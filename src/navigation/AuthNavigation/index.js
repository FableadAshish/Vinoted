import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../../view/Auth/Login';
import SignUp from '../../view/Auth/SignUp';
import ForgotPassword from '../../view/Auth/ForgotPassword';
import VerifyEmail from '../../view/Auth/VerifyEmail'
import ChangeEmail from '../../view/Auth/ChangeEmail'
import {useDispatch} from 'react-redux';
import {isEmpty} from 'lodash';


const Stack = createStackNavigator();

export default function MyStack() {
  const dispatch = useDispatch();

 

  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
        <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{headerShown: false}}
      />
       <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{headerShown: false}}
      />
       <Stack.Screen
        name="VerifyEmail"
        component={VerifyEmail}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ChangeEmail"
        component={ChangeEmail}
        options={{headerShown: false}}
      />
      
      

    </Stack.Navigator>
  );
}