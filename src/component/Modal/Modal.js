import React, {useState} from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import {
  lineColor,
  primaryColor,
  secondryColor,
  sofiaFont,
  white,
} from '../../style/variables';
import {Images} from '../../../theme/Images';

const ModalRatings = ({value1, value2, value3, title, modalTitle, value4}) => {
  const [isModal, setIsModal] = useState(false);

  return (
    <>
      <View style={styles.pickerView}>
        <Text style={styles.pickerText}>{title}</Text>
        <View style={styles.pickerstyle}>
          <Modal visible={isModal} animationType="slide" transparent={true}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <TouchableOpacity
                  style={[styles.buttonClose]}
                  onPress={() => setIsModal(false)}>
                  <Image
                    source={Images.CancelIcon}
                    style={{
                      height: 25,
                      width: 25,
                      marginLeft: 25,
                      marginTop: -5,
                    }}
                  />
                </TouchableOpacity>
                <View style={{marginTop: 10}}>
                  <Text style={styles.modalText}>{value1}</Text>
                  <Text style={styles.modalText}>{value2}</Text>
                  <Text style={styles.modalText}>{value3}</Text>
                  <Text style={styles.modalText}>{value4}</Text>
                </View>
              </View>
            </View>
          </Modal>
          <TouchableOpacity
            style={[styles.SimpleText]}>
            <Text style={styles.textStyle}>{modalTitle}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  thumb: {
    width: 20,
    height: 20,
    borderColor: 'black',
    borderWidth: 1,
    backgroundColor: 'white',
  },
  pickerView: {
    marginVertical: 5,
  },
  pickerItem: {
    color: primaryColor,
    fontFamily: sofiaFont,
  },
  pickerText: {color: 'grey', fontFamily: sofiaFont},
  track: {
    height: 20,
    width: 20,
    color: 'green',
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20,
  },
  pickerstyle: {
    height: 50,
    width: '100%',
    justifyContent: 'center',
    borderBottomColor: lineColor,
    borderBottomWidth: 1,
    borderRadius: 5,
  },
  headingtitle: {
    fontSize: 15,
    opacity: 0.6,
    marginVertical: 5,
    fontFamily: sofiaFont,
  },
  subtitle: {
    fontSize: 12,
    fontFamily: sofiaFont,
  },
  textheading: {
    color: primaryColor,
    fontSize: 25,
    fontFamily: sofiaFont,
  },
  text: {
    color: primaryColor,
    fontSize: 14,
    fontFamily: sofiaFont,
  },
  view: {
    flex: 1,
    marginVertical: 1,
    backgroundColor: white,
    // elevation: 1,
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 5,
  },
  button: {
    width: '100%',
    marginTop: 5,
    marginBottom: 5,
    borderRadius: 50,
    // height: 45,
    backgroundColor: secondryColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  SimpleText: {
    color: primaryColor,
    fontFamily: sofiaFont,
    fontSize: 16,
    textTransform: 'capitalize',
    marginLeft: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    height: 'auto',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  textStyle: {
    color: 'black',
    // fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color: 'black',
  },
  buttonClose: {
    marginLeft: 50,
  },
});
export default ModalRatings;
