import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet
} from 'react-native'

import { primaryColor } from '../../style/variables';

const Button = ({theme,title,onPress}) => {
  const btnTheme = theme === 'dark' ? [styles.dark, styles.darkText] : [styles.light, styles.lightText] 
  return <TouchableOpacity onPress={onPress && onPress.bind(this)}  style={[styles.button, btnTheme[0], {flex: 1}]}>
    <Text style={[ styles.buttonSize, btnTheme[1]]}>
      {title}
    </Text>
  </TouchableOpacity>
}

export default Button;

const styles = StyleSheet.create({
  dark:{
    backgroundColor:"#4541cf"
  },
  darkText:{
    color:'#ffffff'
  },
  lightText:{
    color:'#222'
  },
  lignt:{
    backgroundColor:'#ffffff'
  },
  button: {
    height: 44,
    alignItems: 'center',
    justifyContent: 'center'
  }
})