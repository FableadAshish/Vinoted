import {
  CHANGE_CONNECTION_STATUS,
  SET_USER,
  Set_color,
  Set_timezone, 
  Set_Bg_Image,
  Set_Clock_color,
  Set_Profile_Image,
  Set_Prority_color
} from '../constants';    
import { textColor } from '../../common/variables';

const initalState = { 
  isConnected:false,
  connectionInfo:{},
  user:{}, 
  color: textColor,
  timezone:"Pacific/Marquesas",
  bg_image:"" ,
  profile_image:""
} 

export default reducers = function(state = initalState,actions){
  switch(actions.type){
      case SET_USER: 
          return {
              ...state, 
              user:actions.user
          }   
      case CHANGE_CONNECTION_STATUS:
          return {
              ...state,  
              isConnected:actions.status,
              connectionInfo:actions.connectionInfo
          }        
      case Set_color:
         
          return {
              ...state,
              color:actions.color
          }         
      case Set_timezone:
          return {
              ...state,
              timezone:actions.timezone
          }        
      case Set_Bg_Image:
          return {
              ...state,
              bg_image:actions.bg_image
          }        
      case Set_Clock_color:
          return {
              ...state,
              clock_color:actions.clock_color
          }        
      case Set_Profile_Image:
          return {
              ...state,
              profile_image:actions.profile_image
          }        
      case Set_Prority_color:
              console.log('Set_Prority_color--- ')
          return {
              ...state,
              priority_color:actions.priority_color
          }        
      default: return state;
  }
} 