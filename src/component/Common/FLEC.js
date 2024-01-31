import React from 'react';
import {StyleSheet,View,Image,Text} from 'react-native';
import { primaryColor,sofiaFont } from '../../style/variables';

const FLEC = ({image,text,textStyle}) => (
    <View style={styles.root}>    
      { image && <Image source={image}  style={styles.image} />  }
      <Text style={[styles.text,{...textStyle}]}>{text}</Text>          
    </View>  
);

const styles = StyleSheet.create({
    root:{
        flex:1,
        justifyContent:'center', 
        alignItems:'center',
        
    },
    image:{
        width:40,
        height:40
    },
    text:{
        marginTop:10,
        color:primaryColor,
        fontSize: 14,
        fontFamily:sofiaFont,
    }
});

FLEC.defaultProps = {
    image:null,
    text:'Empty Data'
}

export default FLEC;