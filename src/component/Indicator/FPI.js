/* eslint-disable no-undef */
import React from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import {primaryColor} from '../../style/variables';

export default FPIndicator = props => (
  <View style={styles.root}>
    <ActivityIndicator size="large" color={primaryColor} />
  </View>
);

const styles = StyleSheet.create({
  root: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
  },
});
