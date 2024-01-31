// import React from 'react';
// import { StyleSheet, Dimensions, View,Text } from 'react-native';
// import Slideshow from './slideshow'
// const Hprcone = require('./../../assets/hprcone.jpg')
// const Hprctwo = require('./../../assets/hprctwo.jpg')
// const Hprcthree = require('./../../assets/hprcthree.jpg')
// const Hprcfour = require('./../../assets/hprcfour.jpg')
// const dataSource =   [
//     {
       
//         "src": Hprcone
//     },
//     {
       
//         "src":Hprctwo
//     },
//     {
       
//         "src":Hprcthree
//     },
//     {
       
//         "src":Hprcfour 
//     },
// ]
// export default class Slides extends React.Component {

//     constructor(props) {
//         super(props);

//         this.state = {
//             // dataSource: [],
//             loading: true,
//             position: 1,
//             interval: null,
//         }  
//     };
 
    
//     componentWillUnmount() {
//         clearInterval(this.state.interval);
//     }


//     render() {
//         return (
//             <View>
                
               
//                 <Slideshow
//                     itemKey={'src'}
//                     containerStyle={styles.slider}
//                     dataSource={dataSource}
//                     position={this.state.position}
//                     onPositionChanged={position => this.setState({ position })}
//                 />
//             </View>
//         )
//     }
// }

// Slides.defaultProps = {

//     dataSource: [],

// }

// const styles = StyleSheet.create({
//     container: {
//         opacity: 1,
//         height: Dimensions.get('window').height
//     }
// });
