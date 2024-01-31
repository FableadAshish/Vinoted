/* eslint-disable no-unused-vars */
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../../view/Home';

const Stack = createStackNavigator();

export default function HomeNavigation() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
