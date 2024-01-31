import React from 'react';
import {StyleSheet, Dimensions, View} from 'react-native';
import Slideshow from './slideshow';
const Coupingone = require('./../../assets/coupingone.jpg');
const Coupingtwo = require('./../../assets/coupingtwo.jpg');
const coupingthree = require('./../../assets/coupingthree.jpg');
const Coupingfour = require('./../../assets/coupingfour.jpg');
const Coupingfive = require('./../../assets/coupingfive.jpg');

const dataSource = [
  {
    src: Coupingone,
  },
  {
    src: Coupingtwo,
  },
  {
    src: coupingthree,
  },
  {
    src: Coupingfour,
  },
  {
    src: Coupingfive,
  },
];
export default class Slides extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // dataSource: [],
      loading: true,
      position: 1,
      interval: null,
    };
  }

  componentWillUnmount() {
    clearInterval(this.state.interval);
  }

  render() {
    return (
      <View>
        <Slideshow
          itemKey={'src'}
          containerStyle={styles.slider}
          dataSource={dataSource}
          position={this.state.position}
          onPositionChanged={position => this.setState({position})}
        />
      </View>
    );
  }
}

Slides.defaultProps = {
  dataSource: [],
};

const styles = StyleSheet.create({
  container: {
    opacity: 1,
    height: Dimensions.get('window').height,
  },
});
