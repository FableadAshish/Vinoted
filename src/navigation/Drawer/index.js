import React from 'react';
import SideBar from '../../view/Drawer/Drawer';
import Search from '../../view/Home/Search';
import ProEventDetails from '../../view/Home/ProEventDetails';
import Notification from '../../view/Home/Notification';
import ChangePassword from '../../view/Home/ChangePassword';
import MyEvents from '../../view/Home/MyEvents';
import Messaging from '../../view/Home/Messaging';
import Filter from '../../view/Home/Product/Filter';
import PastEvents from '../../view/Home/MyEvents/PastEvents';
import EventRequest from '../../view/Home/MyEvents/EventRequest';
import PendingEvents from '../../view/Home/MyEvents/PendingEvents';
import ProductDetail from '../../view/Home/Product/ProductDetail';
import ChooseProduct from '../../view/Home/Product/ChooseWineProduct';
import ViewProduct from '../../view/Home/Product/ViewProduct';
import WishlistDetail from '../../view/Home/Wishlist/WishlistDetail';
import WishListProductDetail from '../../view/Home/Wishlist/WishListProductDetail';
import MyTestingNotes from '../../view/Home/Product/MyTestingNotes';
import SearchableTastingNots from '../../view/Home/Product/SearchableTastingNots';
import ProductRatings from '../../view/Home/ProductRatings';
import RatingProductDetail from '../../view/Home/ProductRatings/RatingProductDetail';

import Chat from '../../view/Home/Chat/ChatScreen';

import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';

import {createDrawerNavigator} from '@react-navigation/drawer';
import MyTabs from '../TabNavigation';
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
export default function DrawerDemo() {
  return (
    <Drawer.Navigator
      drawerContentOptions={{
        activeBackgroundColor: 'red',
      }}
      drawerContent={props => <SideBar {...props} />}
      screenOptions={{headerShown: false}}>
      <Drawer.Screen name="DrawerRoot" component={DrawerStack} />
    </Drawer.Navigator>
  );
}

const DrawerStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={'Home'}
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        headerShown: false,
      }}>
      <Stack.Screen
        name="Home"
        component={MyTabs}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Search"
        component={Search}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ProEventDetails"
        component={ProEventDetails}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Notification"
        component={Notification}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MyEvents"
        component={MyEvents}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EventRequest"
        component={EventRequest}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PastEvents"
        component={PastEvents}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PendingEvents"
        component={PendingEvents}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetail}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Chat"
        component={Chat}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Messaging"
        component={Messaging}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ChooseProduct"
        component={ChooseProduct}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ViewProduct"
        component={ViewProduct}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="WishlistDetail"
        component={WishlistDetail}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="WishListProductDetail"
        component={WishListProductDetail}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MyTestingNotes"
        component={MyTestingNotes}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SearchableTastingNots"
        component={SearchableTastingNots}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ProductRatings"
        component={ProductRatings}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Filter"
        component={Filter}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="RatingProductDetail"
        component={RatingProductDetail}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
