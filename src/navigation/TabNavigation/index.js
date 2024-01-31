/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
import React from 'react';
import {Icon} from 'native-base';
import {StyleSheet, View} from 'react-native';
//import { createBottomTabNavigator } from 'react-navigation-tabs';
import {white, sofiaFont} from '../../style/variables';
import Home from '../../view/Home';
import Messaging from '../../view/Home/Messaging';
import Wishlist from '../../view/Home/Wishlist';
import Profile from '../../view/Home/Profile';
import ProductRatings from '../../view/Home/ProductRatings';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

export default function MyTabs() {
  return (
    <Tab.Navigator
      //     activeColor="black"
      //   inactiveColor="black"
      // style={{backgroundColor:"#3f4970"}}
      barStyle={{backgroundColor: '#3f4970'}}
      tabBarOptions={{
        showLabel: false,
        style: {
          backgroundColor: '#3f4970',
        },
      }}
      // screenOptions = {{
      //                 activeTintColor:white,
      //                 inactiveTintColor:"lightgray",
      //                 showLabel: false,
      //                 style:{backgroundColor:black}
      //             }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        tabBarVisible={false}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={[styles.iconView]}>
              <View style={{flex: 0.8}}>
                <Icon
                  type="AntDesign"
                  name="home"
                  style={{color: focused ? 'white' : 'darkgray'}}
                />
              </View>
              {/* <View style={{flex:0.2,justifyContent:"center"}}>
          <Text style={[styles.iconText, {color: focused ? "black" : 'darkgray'}]}>Home</Text>
              </View> */}
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Messaging"
        component={Messaging}
        options={{
          //tabBarLabel: 'Home',
          tabBarIcon: ({focused}) => (
            <View style={styles.iconView}>
              <View style={{flex: 0.8}}>
                <Icon
                  type="MaterialCommunityIcons"
                  name="message-text-outline"
                  style={{color: focused ? 'white' : 'darkgray'}}
                />
              </View>
              {/* <View style={{flex:0.2,justifyContent:"center"}}>
          <Text style={[styles.iconText, {color: focused ? "black" : 'darkgray'}]}>Message</Text>
              </View>
             */}
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Wishlist"
        component={Wishlist}
        options={{
          //tabBarLabel: 'Home',
          tabBarIcon: ({focused}) => (
            <View style={styles.iconView}>
              <View style={{flex: 0.8}}>
                <Icon
                  type="FontAwesome"
                  name="heart-o"
                  style={{color: focused ? 'white' : 'darkgray'}}
                />
              </View>
              {/* <View style={{flex:0.2,justifyContent:"center"}}>
          <Text style={[styles.iconText, {color: focused ? "black" : 'darkgray'}]}>Wishlist</Text>
              </View> */}
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Calendar"
        component={ProductRatings}
        options={{
          // tabBarLabel: 'Product',
          tabBarIcon: ({focused}) => (
            <View style={styles.iconView}>
              <View style={{flex: 0.8}}>
                <Icon
                  type="AntDesign"
                  name="calendar"
                  style={{color: focused ? 'white' : 'darkgray'}}
                />
              </View>
              {/* <View style={{flex:0.2,justifyContent:"center"}}>
          <Text style={[styles.iconText, {color: focused ? "black" : 'darkgray'}]}>Profile</Text>
              </View> */}
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          // tabBarLabel: 'Product',
          tabBarIcon: ({focused}) => (
            <View style={styles.iconView}>
              <View style={{flex: 0.8}}>
                <Icon
                  type="Feather"
                  name="user"
                  style={{color: focused ? 'white' : 'darkgray'}}
                />
              </View>
              {/* <View style={{flex:0.2,justifyContent:"center"}}>
          <Text style={[styles.iconText, {color: focused ? "black" : 'darkgray'}]}>Profile</Text>
              </View> */}
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  iconView: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5,
  },
  iconImage: {
    flex: 1,
    aspectRatio: 1.5,
    resizeMode: 'contain',
  },
  iconText: {
    color: white,
    fontSize: 10,
    fontWeight: 'bold',
    fontFamily: sofiaFont,
  },
});
