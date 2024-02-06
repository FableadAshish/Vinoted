import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';

import {ActionSheet, Icon} from 'native-base';
import ImagePicker from 'react-native-image-crop-picker';
var BUTTONS = ['From Camera', 'From Gallery', 'Cancel'];
// var DESTRUCTIVE_INDEX = 3;
var CANCEL_INDEX = 2;
const ImagePickerCom = props => {

            const [image,setimage] = useState('');

  const fromCamera = () => {
    ImagePicker.openCamera({
      width: Dimensions.get('window').width,
      height: 400,
      cropping: true,
    }).then(res => {
      setimage(res.path);
      console.log('res gallery'.res);
    });

  };

  const fromGallery = () => {
    ImagePicker.openPicker({
      width: Dimensions.get('window').width,
      height: 400,
      cropping: true,
    }).then(res => {
      setimage(res.path);
      console.log(res);
    });
  };

  const imagePickerHandelr = () => {
    ActionSheet.show(
      {
        options: BUTTONS,
        cancelButtonIndex: CANCEL_INDEX,
        // destructiveButtonIndex: DESTRUCTIVE_INDEX,
        title: 'Select an Image',
      },
      buttonIndex => {
        if (buttonIndex === 0) {
          fromCamera();
        } else if (buttonIndex == 1) {
          fromGallery();
        }
      },
    );
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={imagePickerHandelr}>
        {image != '' ? (
          <Image
            source={{uri: image}}
            style={{width: '100%', height: '100%', resizeMode: 'cover'}}
          />
        ) : (
          <Icon
            name="adduser"
            type="AntDesign"
            style={{fontSize: 30, color: 'black'}}
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#cccc',
    overflow: 'hidden',
  },
});
export default ImagePickerCom;
