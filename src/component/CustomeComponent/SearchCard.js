import React from 'react';
import {
  Dimensions,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import {
  primaryColor,
  white,
  primaryTextColor,
  sofiaFont,
} from '../../style/variables';
const {width} = Dimensions.get('window');

const SearchCard = ({
  subtitle,
  time,
  ratingtype,
  item,
  remove,
  title,
  ViewMore,
  ratingValue,
  status,
  date,
  Type,
  onPressView,
  areaname,
  imagelist,
  onPress,
  removeData
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          height: 100,
          width: '100%',
          alignSelf: 'center',
          marginHorizontal: 5,
          marginVertical: 5,
          justifyContent: 'center',
          backgroundColor: '#F8F8F8',
          elevation: 1,
          flexDirection: 'row',
          borderRadius: 15,
        }}>
        <View style={{flex: 0.3, justifyContent: 'center'}}>
          <View style={{justifyContent: 'center', paddingHorizontal: 5}}>
            <Image
              style={{height: '95%', width: '90%', borderRadius: 10}}
              resizeMode="contain"
              source={{uri: imagelist}}
            />
          </View>
        </View>
        <View
          style={{
            flex: 0.4,
            marginHorizontal: 5,
            marginTop: 3,
            paddingRight: 12,
            justifyContent: 'center',
          }}>
          <Text
            numberOfLines={1}
            style={[
              styles.text,
              {
                fontSize: 16,
                width: '100%',
                color: primaryColor,
                textTransform: 'capitalize',
                paddingVertical: 2,
              },
            ]}>
            {title}{' '}
          </Text>
          {Type && (
            <Text
              numberOfLines={1}
              style={[
                styles.text,
                {
                  fontSize: 12,
                  width: '100%',
                  color: primaryTextColor,
                  textTransform: 'capitalize',
                  paddingVertical: 2,
                },
              ]}>
              Type - {Type}
            </Text>
          )}

          {date ? (
            <View
              style={{
                flexDirection: date ? 'row' : 'column',
                justifyContent: date ? 'space-between' : 'flex-start',
              }}>
              <Text
                numberOfLines={1}
                style={[
                  styles.text,
                  {
                    fontSize: 12,
                    width: '100%',
                    color: 'lightgray',
                    textTransform: 'capitalize',
                    paddingVertical: 2,
                  },
                ]}>
                Rating - {date}
              </Text>
            </View>
          ) : (
            <Text
              numberOfLines={1}
              style={[
                styles.text,
                {
                  fontSize: 12,
                  width: '100%',
                  color: 'lightgray',
                  textTransform: 'capitalize',
                  paddingVertical: 2,
                },
              ]}>
              {subtitle} {time && '|'} {time}
            </Text>
          )}
          <Text
            numberOfLines={1}
            style={[
              styles.text,
              {
                fontSize: 12,
                width: '100%',
                color: primaryTextColor,
                textTransform: 'capitalize',
                paddingVertical: 2,
              },
            ]}>
            {areaname}
          </Text>
          <Text
            numberOfLines={1}
            style={[
              styles.text,
              {
                fontSize: 12,
                width: '100%',
                color: 'green',
                textTransform: 'capitalize',
                paddingVertical: 2,
              },
            ]}>
            {status}
          </Text>
        </View>

        <View style={{flex: 0.3}}>
          {removeData && (
            <TouchableOpacity
              activeOpacity={1}
              onPress={removeData}
              style={{
                height: 30,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 15,
                backgroundColor: primaryColor,
                width: 80,
                marginVertical: 20,
                marginHorizontal: 80,
              }}>
              <Text
                style={[
                  styles.text,
                  {color: white, paddingHorizontal: 2, fontWeight: '700'},
                ]}>
                Remove
              </Text>
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity
          activeOpacity={1}
          style={{flex: 0.3, justifyContent: 'center', paddingHorizontal: 10}}>
          {ViewMore && (
            <TouchableOpacity
              onPress={onPressView}
              style={{
                height: 30,
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'flex-end',
                borderRadius: 15,
                backgroundColor: primaryColor,
                width: 80,
                marginTop: 40,
              }}>
              <Text
                style={{
                  color: white,
                  paddingHorizontal: 0,
                  fontWeight: '500',
                  fontSize: 10,
                  fontFamily: sofiaFont,
                }}>
                {ViewMore}
              </Text>
            </TouchableOpacity>
          )}
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};
export default SearchCard;

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
