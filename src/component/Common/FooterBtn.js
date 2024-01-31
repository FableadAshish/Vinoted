import React from 'react';
import {
  StyleSheet,
  View
} from 'react-native'

import Button from './Btn'

const FooterButton = props => (
  <View style={styles.footer}>
    <Button {...props} />
  </View>
)

export default FooterButton;

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'flex-end',
    shadowColor: "#000000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: {
      height: 0,
      width: 0
    },
  }
})