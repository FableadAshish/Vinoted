import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Image, Text} from 'react-native';
import {white, sofiaFont} from '../../style/variables';
import Home from '../../view/Home';
import Messaging from '../../view/Home/Messaging';
import Wishlist from '../../view/Home/Wishlist';
import Profile from '../../view/Home/Profile';
import ProductRatings from '../../view/Home/ProductRatings';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Images} from '../../../theme/Images';
import http from '../../http';

const Tab = createBottomTabNavigator();

export default function MyTabs() {
  const [unRead, setUnread] = useState('');

  useEffect(() => {
    const intervalId = setInterval(() => {
      http
        .get('https://www.admin.vinoted-admin.com/api/unreadMsg')
        .then(res => setUnread(res))
        .catch(err => console.log(err));
    }, 2000);

    return () => clearInterval(intervalId);
  }, [unRead]);
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {backgroundColor: '#3f4970'},
      }}
      tabBarOptions={{
        activeTintColor: 'black',
        inactiveTintColor: 'darkgray',
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        tabBarVisible={false}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({focused}) => (
            <View style={[styles.iconView]}>
              <View style={{flex: 0.8}}>
                <Image
                  source={Images.HomeTabIcon}
                  style={
                    focused ? {height: 28, width: 28} : {height: 25, width: 25}
                  }
                  tintColor={focused ? 'white' : 'grey'}
                />
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
          tabBarIcon: ({focused}) => (
            <View style={styles.iconView}>
              <View style={{flex: 0.8, flexDirection: 'row'}}>
                <Image
                  source={Images.MessageIcon}
                  style={
                    focused ? {height: 28, width: 28} : {height: 25, width: 25}
                  }
                  tintColor={focused ? 'white' : 'grey'}
                />
                {unRead !== 0 ? (
                  <View
                    style={{
                      height: 18,
                      width: 18,
                      borderRadius: 20,
                      backgroundColor: 'white',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginLeft: -5,
                      marginTop: -5,
                    }}>
                    <Text
                      style={{
                        marginBottom: 5,
                        fontSize: 12,
                        fontWeight: '800',
                        color: 'black',
                      }}>
                      {unRead}
                    </Text>
                  </View>
                ) : (
                  ''
                )}
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
          tabBarIcon: ({focused}) => (
            <View style={styles.iconView}>
              <View style={{flex: 0.8}}>
                <Image
                  source={Images.HeartIcon}
                  style={
                    focused ? {height: 28, width: 28} : {height: 25, width: 25}
                  }
                  tintColor={focused ? 'white' : 'grey'}
                />
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
          tabBarIcon: ({focused}) => (
            <View style={styles.iconView}>
              <View style={{flex: 0.8}}>
                <Image
                  source={Images.ListIcon}
                  style={
                    focused ? {height: 28, width: 28} : {height: 25, width: 25}
                  }
                  tintColor={focused ? 'white' : 'grey'}
                />
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
          tabBarIcon: ({focused}) => (
            <View style={styles.iconView}>
              <View style={{flex: 0.8}}>
                <Image
                  source={Images.UserIcon}
                  style={
                    focused ? {height: 28, width: 28} : {height: 25, width: 25}
                  }
                  tintColor={focused ? 'white' : 'grey'}
                />
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
