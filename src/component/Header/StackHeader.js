import React from 'react';
import {View} from 'react-native';
import {Icon} from 'native-base';
import { Text } from 'react-native';
import Styles from '../../style/comman/Header';
import PropTypes from 'prop-types';
import {textColor, white, primaryColor} from '../../style/variables';

const StackHeader = ({
  navigation,
}) => {
  let icons = (
    <Icon
      android="md-arrow-back"
      ios="ios-arrow-back"
      style={[Styles.headerIcon, {color: white}]}
      onPress={() => navigation.goBack(null)}
    />;
  );
  if (hideDrawer) {icons = null;}
  return (
    <View
      style={[
        Styles.header,
        {
          backgroundColor: primaryColor,
          borderTopLeftRadius,
          borderTopRightRadius,
        },
      ]}>
      <View style={Styles.leftContainer}>{icons}</View>
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-start',
          alignItems,
          flexDirection: 'row',
        }}>
        {headerContent && <View>{headerContent}</View>}


          <Text style={[Styles.headerTitle, {textAlign}]}>{title}</Text>
        )}
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        {logouticon == true && (
          <Icon
            type="Feather"
            name="power"
            style={Styles.icon}
            onPress={onSave.bind(this)}
          />
        )}
        {chaticon == true && (
          <Icon
            type="Entypo"
            name="chat"
            style={Styles.icon}
            onPress={onSave.bind(this)}
          />
        )}
        {cameraicon == true && (
          <Icon
            type="EvilIcons"
            name="camera"
            style={[Styles.icon, {fontSize: 30, marginTop: 5}]}
            onPress={onChangeImage.bind(this)}
          />
        )}
        {brushicon == true && (
          <Icon
            type="Entypo"
            name="brush"
            style={[Styles.icon, {fontSize: 22, marginTop: 5}]}
            onPress={onBrush.bind(this)}
          />
        )}
        {usersicon == true && (
          <Icon
            type="Feather"
            name="users"
            style={[Styles.icon, {fontSize: 22, marginTop: 5}]}
            onPress={onUsers.bind(this)}
          />
        )}
        {shareicon == true && (
          <Icon
            type="MaterialCommunityIcons"
            name="share-outline"
            style={[Styles.icon, {fontSize: 22, marginTop: 5}]}
            onPress={onShare.bind(this)}
          />
        )}
        {savebutton == true && (
          <Text
            style={[Styles.icon, {fontSize: 15, marginRight: 10}]}
            onPress={onSave.bind(this)}>
            Save
          </Text>
        )}
        {noteupdate == true && (
          <Text
            style={[Styles.icon, {fontSize: 15, marginRight: 10}]}
            onPress={onNoteUpdate.bind(this)}>
            Update
          </Text>
        )}
      </View>
    </View>
  );
};


StackHeader.defaultProps = {
  title: null,
  hideSave: true,
  onSave: () => null,
  onSkip: () => null,
  onNoteUpdate: () => null,
  textAlign: 'left',
  bgcolor: textColor,
  borderTopLeftRadius: 0,
  borderTopRightRadius: 0,
  headerContent: null,
  alignItems: 'center',
  chaticon: false,
  logouticon: false,
  cameraicon: false,
  savebutton: false,
  brushicon: false,
  usersicon: false,
  shareicon: false,
  report: false,
  noteupdate: false,
  onShare: () => false,
  onUsers: () => false,
  onBrush: () => false,
  onChangeImage: () => false,
};
StackHeader.propTypes = {
  title: PropTypes.string,
};    


export default StackHeader;
