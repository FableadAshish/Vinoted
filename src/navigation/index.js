

import React from 'react'
import { connect } from 'react-redux';
import {connectionChange} from './../store/Actions/common';
import SplashScreen from 'react-native-splash-screen';
import { View, StatusBar } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import AuthNavigation from './AuthNavigation';
import HomeRoute from './Drawer';
import Bottomtab from './TabNavigation'
import Chat from '../view/Home/Chat'
import Messaging from '../view/Home/Messaging'
import ProEventDetails from '../view/Home/ProEventDetails';
import Notification from '../view/Home/Notification'
import { primaryColor } from '../style/variables';
import AppLoadingMain from '../component/AppInitilization';
import Home from '../view/Home';
import DrawerDemo from './Drawer';


const Stack = createStackNavigator();
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20:StatusBar.currentHeight;

const MainNavigation = () => {
  return (
    <Stack.Navigator >
   
      <Stack.Screen
        name="Init"
        component={AppLoadingMain}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Auth"
        component={AuthNavigation}
        options={{headerShown: false}}
      />
     
       <Stack.Screen
        name="App"
        component={DrawerDemo}
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
        name="Home"
        component={Bottomtab}
        options={{ headerShown: false }}
      /> 
       
       <Stack.Screen
        name="ProEventDetails"
        component={ProEventDetails}
        options={{ headerShown: false }}
      />

       <Stack.Screen
        name="Notification"
        component={Notification}
        options={{headerShown: false}}
      />
      
      </Stack.Navigator>
  )
}



class Navigation extends React.Component {

    constructor(props) {
      super(props)
      this.state={
        user : {},
        connection_Status : ""
        
      }
    }

    async componentDidMount(){
    
      SplashScreen.hide()
  
     
     
    }
    
    render() {

    
        return (
          <View style={{ flex: 1 }}>
            {/* <Root> */}
              
               <View style={{height:STATUSBAR_HEIGHT}}>
               <StatusBar translucent = {true} barStyle = "light-content" hidden = {false} backgroundColor ={primaryColor}/>
               </View>
               <View style={{flex:1}}>
               <MainNavigation />
                </View>
               
            {/* </Root>  */}
          </View>
        )
      }
    }
    const mapStateToProps = state => ({
      isConnected: state.root.isConnected
    })
    const mapDispatchToProps = dispatch => ({
      connectionStatus: (status, info) => dispatch(connectionChange(status, info))
    })
    
    export default connect(mapStateToProps, mapDispatchToProps)(Navigation)
    



 