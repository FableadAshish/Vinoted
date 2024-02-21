import {StyleSheet} from 'react-native';
import {white, sofiaFont} from '../variables';

export default StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    paddingLeft: 20,
    paddingTop: 25,
    justifyContent: 'space-between',
  },
  headerIcon: {
    color: white,
    fontSize: 35,
    fontFamily: sofiaFont,
  },
  saveIcon: {
    color: white,
    marginRight: 10,
  },
  searchIcon: {
    color: white,
    fontSize: 20,
    marginRight: 10,
    fontFamily: sofiaFont,
  },
  headerTitle: {
    marginLeft: 20,
    fontSize: 20,
    width: '65%',
    color: 'white',
    fontWeight: '500',
    fontFamily: sofiaFont,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    color: white,
    marginRight: 5,
  },
  saveText: {
    marginRight: 10,
  },
  search: {
    marginLeft: '12%',
    color: white,
  },
  text: {
    fontSize: 11,
    textAlign: 'center',
    fontFamily: sofiaFont,
  },
  bellContainer: {
    width: 50,
    alignItems: 'center',
  },
  badgeStyle: {
    position: 'absolute',
    top: -8,
    right: 5,
    height: 20,
    width: 20,
    borderRadius: 10,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  },
  container: {
    flex: 1,
    //flexGrow:1,

    //backgroundColor:'red'
  },
});
