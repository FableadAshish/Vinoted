/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  Dimensions,
  TouchableOpacity,
  View,
  StyleSheet,
  Text,
  Image,
} from 'react-native';
// import {Icon} from 'native-base';
import {
  primaryColor,
  white,
  MoreButton,
  primaryTextColor,
  textColor,
  sofiaFont,
} from '../../style/variables';
const {width, height} = Dimensions.get('window');

const EventRequest = ({
  subtitle,
  type,
  homedate,
  hometime,
  region,
  year,
  onPressMore,
  discription,
  more,
  morefromHome,
  title,
  date,
  imagelist,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={{width: '100%', alignSelf: 'center'}}
      onPress={onPress}>
      <View
        style={{
          width: '100%',
          alignSelf: 'center',
          marginHorizontal: 5,
          marginVertical: 5,
          justifyContent: 'center',
          backgroundColor: white,
          elevation: 1,
          flexDirection: 'row',
          borderBottomColor: 'grey',
          borderBottomWidth: 0.4,
        }}>
        <View style={{flex: 0.3, justifyContent: 'center'}}>
          <View
            style={{
              justifyContent: 'center',
              paddingHorizontal: 5,
              height: 80,
              width: '100%',
            }}>
            <Image
              style={{height: 50, width: 50, borderRadius: 25}}
              source={{uri: imagelist}}
            />
          </View>
        </View>
        <View
          style={{
            flex: 0.6,
            paddingHorizontal: 5,
            marginHorizontal: 5,
            marginTop: 3,
            justifyContent: 'center',
          }}>
          <View
            style={{
              marginTop: 0,
              justifyContent: 'flex-start',
              flexDirection: 'row',
            }}>
            <Text
              numberOfLines={1}
              style={[
                styles.text,
                {
                  textAlign: 'left',
                  fontSize: 15,
                  width: '100%',
                  color: primaryColor,
                  textTransform: 'capitalize',
                  paddingVertical: 0,
                },
              ]}>
              {title}{' '}
            </Text>
            {subtitle && (
              <View style={{flexDirection: 'row', marginLeft: 30}}>
                <Text
                  numberOfLines={1}
                  style={[
                    styles.text,
                    {
                      fontSize: 12,
                      width: '100%',
                      color: 'gray',
                      textTransform: 'capitalize',
                      paddingVertical: 0,
                    },
                  ]}>
                  {subtitle}
                </Text>
              </View>
            )}
          </View>
          {homedate && (
            <Text
              numberOfLines={1}
              style={[
                styles.text,
                {
                  fontSize: 12,
                  width: '100%',
                  color: 'grey',
                  textTransform: 'capitalize',
                  paddingVertical: 0,
                  marginTop: 5,
                },
              ]}>
              {homedate} {hometime && '| '}
              {hometime}{' '}
            </Text>
          )}
          {type && (
            <Text
              style={[
                styles.text,
                {
                  fontSize: 12,
                  width: '100%',
                  color: primaryTextColor,
                  textTransform: 'capitalize',
                  paddingVertical: 0,
                  marginTop: 5,
                },
              ]}>
              {type}{' '}
            </Text>
          )}
          {region && (
            <Text
              style={[
                styles.text,
                {
                  fontSize: 12,
                  width: '100%',
                  color: primaryColor,
                  textTransform: 'capitalize',
                  paddingVertical: 0,
                },
              ]}>
              {region}
              {year && ','} {year}{' '}
            </Text>
          )}
          {discription && (
            <Text
              numberOfLines={2}
              style={[
                styles.text,
                {
                  fontSize: 12,
                  width: '100%',
                  color: 'lightgray',
                  textTransform: 'capitalize',
                  paddingVertical: 0,
                },
              ]}>
              {discription}
            </Text>
          )}

          {date && (
            <Text
              numberOfLines={1}
              style={[
                styles.text,
                {
                  fontSize: 12,
                  width: '100%',
                  color: 'lightgray',
                  textTransform: 'capitalize',
                  paddingVertical: 0,
                },
              ]}>
              {date}
            </Text>
          )}
        </View>
        <TouchableOpacity
          style={{
            flex: 0.3,
            justifyContent: 'flex-end',
            paddingHorizontal: 10,
          }}>
          {more && (
            <TouchableOpacity
              onPress={onPressMore}
              style={{
                height: 30,
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'flex-end',
                borderRadius: 15,
                backgroundColor: MoreButton,
                width: '90%',
                opacity: 0.6,
                marginVertical: 10,
              }}>
              <Text
                style={[
                  styles.text,
                  {color: textColor, paddingHorizontal: 2, fontWeight: '700'},
                ]}>
                {more}
              </Text>
            </TouchableOpacity>
          )}
        </TouchableOpacity>
        {morefromHome && (
          <TouchableOpacity
            style={{
              flex: 0.3,
              justifyContent: 'center',
              paddingHorizontal: 10,
            }}>
            <TouchableOpacity
              onPress={onPress}
              style={{
                height: 30,
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'flex-end',
                borderRadius: 15,
                backgroundColor: MoreButton,
                width: '90%',
                marginVertical: 10,
              }}>
              <Text
                style={[
                  styles.text,
                  {color: textColor, paddingHorizontal: 2, fontWeight: '700'},
                ]}>
                {morefromHome}
              </Text>
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
};
export default EventRequest;

const styles = StyleSheet.create({
  view: {
    marginTop: 20,
    height: 180,
    width: 120,
    marginHorizontal: 5,
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 12,
    fontFamily: sofiaFont,
  },
});
