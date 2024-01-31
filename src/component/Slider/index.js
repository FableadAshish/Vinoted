/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  ImageBackground,
  Dimensions,
  View,
  TouchableWithoutFeedback,
} from 'react-native';

import {isEmpty} from 'lodash';

const {width} = Dimensions.get('window');

export default class Silder extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      images: [],
    };
  }

  componentWillMount() {
    this._isMounted = true;
  }

  componentDidMount() {
    // http.get('slider/home').then(res => {
    //     this.updateState({ loading: false, images: res.data.sliders })
    // }).catch(err => {
    //     this.updateState({ loading: false, images: [] })
    // })
  }

  updateState(state) {
    if (this._isMounted) {
      this.setState(state);
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      JSON.stringify(nextProps) !== JSON.stringify(this.props) ||
      JSON.stringify(nextState) !== JSON.stringify(this.state)
    );
  }
  OnRedirect(images) {
    this.props.onPresses(images);
  }
  render() {
    // const { height, images } = this.props;
    // const { images } = this.state;

    // if (isEmpty(imagess)) return null;

    return (
      // <Swiper paginationStyle={{ bottom: 5 }} autoplay={false} style={{
      //     ...styles.root,
      //     height: height
      // }}>

      <View style={{flex: 1, flexDirection: 'row'}}>
        {/* <ScrollView horizontal={true}> */}

        {!isEmpty(imagess) &&
          imagess.map((item, i) => {
            return (
              <TouchableWithoutFeedback
                key={i}
                onPress={this.OnRedirect.bind(this, item)}>
                <View
                  style={{
                    height: 200,
                    marginHorizontal: 5,
                    width: '80%',
                    borderRadius: 5,
                    backgroundColor: 'red',
                  }}>
                  <ImageBackground
                    imageStyle={{borderRadius: 5}}
                    style={{height: '100%', width: '100%'}}
                    source={{uri: item.image}}>
                    <View style={{flex: 0.7}} />
                    <View style={{flex: 0.3}}>
                      {/* <Text style={{ marginHorizontal: 10, fontSize: 17, color: "#fff" }}>{item.title}</Text> */}
                    </View>
                  </ImageBackground>
                </View>
              </TouchableWithoutFeedback>
            );
          })}

        {/* </ScrollView> */}
      </View>
      // </Swiper>
    );
  }
}
Silder.defaultProps = {
  height: 210,
  width: width,
};

const imagess = [
  {
    image:
      'https://www.himanshupal.com/wp-content/uploads/2019/09/Slider-no-2-himanshu-pal-salon-academy.png',
    title: 'What is Coronavirus and how worried should we be?',
  },
  {
    image:
      'https://i1.wp.com/s3.envato.com/files/263424502/01_Preview.__large_preview.png?w=1020&ssl=1',
    title: 'What is Coronavirus and how worried should we be?',
  },
  {
    image:
      'https://fsa.zobj.net/crop.php?r=hmp6cOsrfHzuCUAY7J__F69P4LfcvtSmrd5Qf1X9xHbxFUvU880Lf7zkTABsAnSjubKvBycJWNCaOrYf6OocM5ybQHskn8qppIy6iEEk1W7gQEJ-83FzieMqo6866gvzlKvD6eGtlPYCCXpu',
    title: 'What is Coronavirus and how worried should we be?',
  },
];
