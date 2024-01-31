import * as React from 'react';
import { View, Modal, StyleSheet,Image } from 'react-native';
import CustomButton from './Button'
import { Icon, Text } from 'native-base';
import { textColor ,sofiaFont} from '../../style/variables';

export default class AppModal extends React.Component {
  constructor() {
    super();
    this.state = {
      visible: false
    }
  }
  open = () => this.setState({ visible: true })

  close = () => {
    this.setState({ visible: false });
    this.props.onClose()
  }
  

  render() {
    if (!this.state.visible) return null;     
    let iamgeshow =require(`../../assets/success.png`)
    return (
      <Modal visible={this.state.visible} onRequestClose={this.close} transparent={true} animationType="fade" >

        <View style={styles.view1}>

          <View style={styles.view2}>
                    
            <View style={styles.view4}>
              <Text style={styles.texttitle}>{this.props.title}</Text>
              <View style={{justifyContent:"center",alignItems:"center"}}>
                <Image style={{height:100,width:100}} source={this.props.image}/>
              </View>
              <Text style={styles.title}>{this.props.subtitle}</Text>
              <Text style={styles.subtitle}>{this.props.text}</Text>
             
            </View> 
          </View>
   
        </View>
  
      </Modal>
    );
  }
}

AppModal.defaultProps = {
  onClose: () => null,
  text: '',
  title: '',
  image:'success.png',
  buttonText: 'OK'
}

const styles = StyleSheet.create({
  view1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,.6)'
  },
  view2: {
    flexDirection: 'column',
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    marginVertical:20,
    marginHorizontal: 10,     
  },
  view4: {
    marginHorizontal:5, 
    borderRadius: 10,
    paddingHorizontal:5,
    alignItems: 'center', 
    justifyContent: 'space-between',
    marginTop: 25
  },
  texttitle: {
    fontSize: 18,
    fontFamily:sofiaFont,
    marginBottom: 15,
    fontWeight:"bold"
  },
  subtitle: {  
    fontSize: 15, 
    textAlign:"center",
    marginBottom: 25,    
    color: '#c1c1c1',
    fontFamily:sofiaFont,
  },
title:{
  color:textColor,
  fontSize:16,
  fontFamily:sofiaFont,
}
  
})



