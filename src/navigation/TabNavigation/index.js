
import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { white, sofiaFont } from '../../style/variables';
import Home from '../../view/Home';
import Messaging from '../../view/Home/Messaging';
import Wishlist from '../../view/Home/Wishlist';
import Profile from '../../view/Home/Profile';
import ProductRatings from '../../view/Home/ProductRatings';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Images } from '../../../theme/Images';
import http from '../../http';

const Tab = createBottomTabNavigator();

export default function MyTabs() {

 
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: '#3f4970' },
      }}
      tabBarOptions={{
        activeTintColor: 'black',
        inactiveTintColor: 'darkgray',
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        tabBarVisible={false}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ focused }) => (
            <View style={[styles.iconView]}>
              <View style={{ flex: 0.8 }}>
                <Image source={Images.HomeTabIcon} style={{ height: 25, width: 25 }} tintColor={"white"} />
              </View>
            </View>
          ),

        }}

      />

      {/* https://www.admin.vinoted-admin.com/api/unreadMsg */}
      
      <Tab.Screen
        name="Messaging"
        component={Messaging}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ focused }) => (
            <View style={styles.iconView}>
              <View style={{ flex: 0.8 }}>
                <Image source={Images.MessageIcon} style={{ height: 25, width: 25 }} tintColor={"white"} />
              </View>
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Wishlist"
        component={Wishlist}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ focused }) => (
            <View style={styles.iconView}>
              <View style={{ flex: 0.8 }}>
                <Image source={Images.HeartIcon} style={{ height: 25, width: 25 }} tintColor={"white"} />
              </View>
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Calendar"
        component={ProductRatings}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ focused }) => (
            <View style={styles.iconView}>
              <View style={{ flex: 0.8 }}>
                <Image source={Images.ListIcon} style={{ height: 25, width: 25 }} tintColor={"white"} />
              </View>
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ focused }) => (
            <View style={styles.iconView}>
              <View style={{ flex: 0.8 }}>
                <Image source={Images.UserIcon} style={{ height: 25, width: 25 }} tintColor={"white"} />
              </View>
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
