import React from 'react';
import {View, Image, TouchableWithoutFeedback} from 'react-native';
import {Text, Icon} from 'native-base';
import PropTypes from 'prop-types';
import Styles from '../../style/comman/Header';
import {upperCase, isEmpty} from 'lodash';
import {white, textColor, primaryColor, sofiaFont} from '../../style/variables';

const header = ({
  navigation,
  text,
  title,
  iconProps,
  imagePath,
  onPress,
  image,
  backgroundColor,
  searchName,
  iconColor,
  searchType,
  userimage,
}) => {
  // let icons = <Image resizeMode={"contain"} source={LogoImage} style={Styles.headerIcon} />;

  return (
    <View
      style={[
        Styles.header,
        {paddingVertical: 5, backgroundColor: backgroundColor},
      ]}>
      <View style={Styles.leftContainer}>
        <View style={{flex: 0.2}}>
          <Icon
            {...iconProps}
            onPress={onPress}
            style={{color: iconColor, padding: 10}}></Icon>
        </View>
        <View
          style={{
            flex: 0.6,
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'center',
            flexDirection: 'row',
          }}>
          {image && (
            <Image
              source={image}
              resizeMode="contain"
              style={{
                height: 40,
                width: 150,
              }}
            />
          )}

          {text && (
            <Text
              style={{
                fontFamily: sofiaFont,
                fontSize: 20,
                fontWeight: 'bold',
                textTransform: 'capitalize',
                color: primaryColor,
              }}>
              {text}
            </Text>
          )}
        </View>
        <View style={{flex: 0.2, alignItems: 'flex-end'}}>
          {/* <Icon name="dots-three-vertical" type="Entypo" style={{fontSize:20, color:iconColor, padding: 10 }} onPress={() =>{}}></Icon> */}
        </View>
      </View>
    </View>
  );
};

header.defaultProps = {
  title: 'Home',
};
header.propTypes = {
  title: PropTypes.string,
  imagePath: {},
};

export default header;
