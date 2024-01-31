import React from 'react'
import {View,ActivityIndicator,StyleSheet,Modal} from 'react-native'
import {connect} from 'react-redux'

const Indicator = props => {
    if(props.loading){
        return (
            <Modal
             transparent={true}
             animationType={'none'}
             visible={props.loading}
             onRequestClose={() => {console.log('close')}}
            >
                <View style={styles.modal}>
                    <View style={styles.activityIndicator}>
                    <ActivityIndicator
                        animating={props.loading} color="#365899" size={25}/>
                    </View>
                </View>
            </Modal>
            
         )
    }else{
        return null;
    }
}

const mapStateToProps = (state) => ({
    loading: state.root.loading
})

const styles = StyleSheet.create({
      modal: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: '#00000040',
        flexDirection: 'column',
      },
      activityIndicator: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: 'white',
        height: 60,
        width: 60,
        borderRadius: 30,
        
      }
})

export default connect(mapStateToProps,null)(Indicator)