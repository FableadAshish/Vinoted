import React from 'react';
import {
  Dimensions,
  TouchableOpacity,
  View,
  StyleSheet,
  Text,
  Image,
} from 'react-native';
import {Icon} from 'native-base';
import {
  primaryColor,
  white,
  MoreButton,
  textColor,
  sofiaFont,
} from '../../style/variables';
const {width, height} = Dimensions.get('window');

const EventRequestWithType = ({
  props,
  subtitle,
  type,
  color,
  region,
  year,
  doller,
  onPressMore,
  discription,
  more,
  morefromHome,
  item,
  isLike,
  title,
  date,
  imagelist,
  onPress,
}) => {
  console.log('colorcolorcolor ', color);

  const getColor = color => {
    if (color === 'White') {
      return '#FBD301';
    } else if (color === 'Red') {
      return '#F14236';
    } else if (color === 'Rose') {
      return '#EC979A';
    } else if (color === 'Sparkling') {
      return '#4EAC4F';
    } else if (color === 'Sweet') {
      return '#755246';
    } else if (color === 'Other') {
      return 'white';
    } else if (color === 'black') {
      return 'black';
    } else {
      return 'black';
    }
  };
  return (
    <TouchableOpacity onPress={onPress}>
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
        }}>
        <View style={{flex: 0.1, justifyContent: 'center'}}>
          <View
            style={{
              width: '100%',
              flexDirection: 'column',
              marginHorizontal: 0,
              marginBottom: 0,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            }}>
            <View
              style={{
                borderWidth: 1,
                borderRadius: 5,
                borderColor: getColor(color),
                borderBottomWidth: 0,
                shadowColor: 'grey',
                shadowOffset: {width: 0, height: 2},
                shadowOpacity: 0.9,
                shadowRadius: 13,
                elevation: 3,
                backgroundColor: getColor(color),
                height: 15,
                width: 15,
                borderRadius: 50,
                marginBottom: 8,
              }}
            />
            {/* < Text style={{ color: primaryColor, fontSize: 12 }}> {renderColor}</Text> */}
          </View>
        </View>
        <View style={{flex: 0.2, justifyContent: 'center'}}>
          <View
            style={{
              justifyContent: 'center',
              paddingHorizontal: 5,
              height: 80,
              width: 80,
              borderRadius: 50,
            }}>
            <Image
              style={{height: 50, width: 50, borderRadius: 25}}
              resizeMode={'contain'}
              source={{uri: imagelist}}
            />
          </View>
        </View>
        <View
          style={{
            flex: 0.4,
            paddingHorizontal: 5,
            marginHorizontal: 5,
            marginTop: 3,
            justifyContent: 'center',
          }}>
          <View
            style={{
              marginTop: 0,
              justifyContent: 'space-between',
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
              <View style={{flexDirection: 'row', marginLeft: 35}}>
                <Icon
                  name="pound"
                  type="Foundation"
                  style={{
                    color: 'gray',
                    fontSize: 15,
                    paddingTop: 1,
                    marginHorizontal: 0,
                  }}
                />
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
            {type}{' '}
          </Text>
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
            {region}, {year}{' '}
          </Text>
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
          {morefromHome && (
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
                opacity: 0.6,
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
          )}
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};
export default EventRequestWithType;

//   #D52020

// export default class CardList extends Component {

//     constructor(props) {
//         super(props);
//         this.state = {

//         };
//     }
//     onNavigete() {
//         // this.props.navigation.navigate("VendorsList")
//     }

//     render() {
//         return (
//             <View style={{ flex: 1, marginVertical: 10,marginHorizontal:10 }}>
//                 <Text style={{fontSize:15,fontWeight:"700"}}>
//                     Vendor from Udaipur
//                 </Text>
//                 <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
//               <View style={{ flexDirection: "row" }}>
//                 <Card onPress={this.onNavigete.bind(this)}  />
//                 <Card onPress={this.onNavigete.bind(this)}  />
//                 <Card  onPress={this.onNavigete.bind(this)} />
//               </View>
//             </ScrollView>
//             </View>
//         )
//     }

// }

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
