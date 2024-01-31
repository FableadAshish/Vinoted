/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
import React from 'react';
import {
  Dimensions,
  TouchableOpacity,
  View,
  StyleSheet,
  Text,
  Image,
} from 'react-native';
import {
  primaryColor,
  white,
  MoreButton,
  textColor,
  sofiaFont,
} from '../../style/variables';
const {width, height} = Dimensions.get('window');

const CardList = ({
  subtitle,
  mobile,
  more,
  ShowCount,
  item,
  onPressCall,
  isLike,
  onPressIcon,
  title,
  date,
  imagelist,
  onPress,
  onPressEnquiry,
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
          backgroundColor: white,
          elevation: 1,
          flexDirection: 'row',
        }}>
        <View style={{flex: 0.3, justifyContent: 'center'}}>
          <View
            style={{
              justifyContent: 'center',
              paddingHorizontal: 5,
              height: 100,
              width: 100,
              borderRadius: 50,
            }}>
            <Image
              style={{height: 80, width: 80, borderRadius: 40}}
              source={{uri: imagelist}}
            />
          </View>
        </View>
        <View
          style={{
            flex: ShowCount ? 0.6 : 0.7,
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
                fontSize: 20,
                width: '100%',
                color: primaryColor,
                textTransform: 'capitalize',
                paddingVertical: 2,
              },
            ]}>
            {title}{' '}
          </Text>
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
            {subtitle}
          </Text>

          {mobile && (
            <TouchableOpacity
              activeOpacity={1}
              onPress={onPressCall}
              style={{
                height: 30,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 15,
                backgroundColor: primaryColor,
                width: '60%',
                marginVertical: 10,
              }}>
              <Text
                style={[
                  styles.text,
                  {color: white, paddingHorizontal: 2, fontWeight: '700'},
                ]}>
                {mobile}
              </Text>
            </TouchableOpacity>
          )}
          {more && (
            <TouchableOpacity
              activeOpacity={1}
              style={{
                height: 30,
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'flex-end',
                borderRadius: 15,
                backgroundColor: MoreButton,
                width: '30%',
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
          {/* <View style={{ position: "absolute", bottom: 0, right: 0 }}>
                        {date && <Text style={[styles.text, { textAlign: "right", color: ShowCount ? "green" : "gray", paddingHorizontal: 2, fontWeight: "700" }]}>
                            {date}
                        </Text>}
                    </View> */}
        </View>

        {ShowCount && (
          <View style={{flex: 0.1, justifyContent: 'center'}}>
            <View
              style={{
                height: 16,
                width: 16,
                borderRadius: 8,
                backgroundColor: 'green',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: -15,
              }}>
              <Text style={{color: white, fontSize: 10, fontWeight: '700'}}>
                {ShowCount}
              </Text>
            </View>
          </View>
        )}

        <View style={{position: 'absolute', bottom: 0, right: 0, padding: 10}}>
          {date && (
            <Text
              style={[
                styles.text,
                {
                  textAlign: 'right',
                  color: ShowCount ? 'green' : 'gray',
                  paddingHorizontal: 2,
                  fontWeight: '700',
                },
              ]}>
              {date}
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default CardList;

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
