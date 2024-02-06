import React from 'react';
import {View, StyleSheet} from 'react-native';
import { Icon} from 'native-base';
import { Text } from 'react-native';
import PropTypes from 'prop-types';
import {primaryColor, white, sofiaFont} from '../../style/variables';

class ModalHeader extends React.Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return JSON.stringify(nextProps) !== JSON.stringify(this.props);
  }

  render() {
    const {title, onClose} = this.props;
    let icon = (
      <Icon
        android="md-close"
        ios="ios-close"
        style={styles.headerLeftIcon}
        onPress={onClose && onClose.bind(this)}

    );

    return (
      <View style={styles.header}>
        <View style={styles.leftContent}>
          {icon}

          <Text style={styles.headerTitle}>{title}</Text>
        </View>
        {/* <Text style={{color:'transpatent'}}>.</Text> */}
      </View>
    );
  }
}

const commonStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
};

const styles = StyleSheet.create({
  header: {
    ...commonStyle,
    height: 60,
    backgroundColor: primaryColor,
    paddingLeft: 10,
  },
  leftContent: {
    ...commonStyle,
  },
  rightContent: {
    ...commonStyle,
    marginRight: 8,
  },
  headerLeftIcon: {
    color: white,
  },
  headerRightIcon: {
    color: white,
    marginHorizontal: 10,
  },
  headerTitle: {
    marginLeft: 15,
    fontSize: 22,
    color: white,
    fontFamily: sofiaFont,
  },
});

ModalHeader.defaultProps = {
  title: 'Home',
};
ModalHeader.propTypes = {
  title: PropTypes.string,
};

export default ModalHeader;
