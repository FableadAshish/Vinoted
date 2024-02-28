import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import {isEmpty} from 'lodash';
import ModalSelector from 'react-native-modal-selector';
import {primaryColor, sofiaFont} from '../../style/variables';

export const WineRatingsModal = ({data, title, checkEmpty}) => {
  return (
    <View style={styles.pickerView}>
      <Text style={styles.pickerText}>{title}</Text>
      <View style={styles.pickerstyle}>
        {isEmpty(checkEmpty) ? (
          <ModalSelector
            data={data}
            optionStyle={{
              borderBottomWidth: 0,
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
            }}
            initValueTextStyle={{color: 'red'}}
            optionTextStyle={{color: 'black'}}
            initValue="Select"
            // onChange={}
          >
            <TextInput
              style={{
                borderBottomWidth: 1,
                borderColor: '#ccc',
                padding: 10,
                height: 50,
                color: primaryColor,
              }}
              editable={false}
              placeholder="Select"
              value={this.state.textInputBalanceValue}
            />
          </ModalSelector>
        ) : (
          ''
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  pickerView: {
    marginVertical: 5,
  },
  pickerItem: {
    color: primaryColor,
    fontFamily: sofiaFont,
  },
  pickerText: {color: 'grey', fontFamily: sofiaFont},

  pickerstyle: {
    height: 50,
    width: '100%',
    justifyContent: 'center',
    borderBottomColor: lineColor,
    borderBottomWidth: 1,
    borderRadius: 5,
  },
});
