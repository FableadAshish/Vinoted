import React from "react";
import {View,Text,StyleSheet,Dimensions} from "react-native";
import HTML from "react-native-render-html";
const CmsAccodian =(props)=>{
    const contentWidth = Dimensions.get("window").width;
          return(
              props.itmeID?<View style={styles.conatainer}>
              <HTML source={{ html: props.content }}
          tagsStyles= { {p: {marginBottom:0, "color": 'black',"marginleft":"20px" }} } 
          contentWidth={contentWidth} />
          </View>:<View/>
          )
}

const styles  = StyleSheet.create({
    conatainer:{
        width:"100%",
        backgroundColor:"#ffff"
    }
});

export default CmsAccodian;