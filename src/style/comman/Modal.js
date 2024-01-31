import {StyleSheet} from 'react-native';
import {primaryColor, white, sofiaFont} from '../variables';

export default StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(2, 40, 89, .5)',
  },
  container: {
    flexDirection: 'column',
    width: '90%',
    minHeight: 200,
    backgroundColor: white,
    elevation: 20,
    padding: 20,
    borderRadius: 15,
  },
  header: {},
  content: {},
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 25,
  },
  headerTitle: {
    fontSize: 36,
    color: primaryColor,
    alignSelf: 'center',
    fontFamily: sofiaFont,
  },
  uploadBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: primaryColor,
    marginTop: 20,
    marginHorizontal: 10,
    height: 45,
    borderRadius: 6,
  },
  saveBtn: {
    flex: 1,
    alignItems: 'center',
    borderColor: primaryColor,
    borderWidth: 2,
    marginTop: 20,
    marginHorizontal: 10,
    height: 45,
    borderRadius: 6,
    justifyContent: 'center',
  },
  uploadBtnText: {},
  saveBtnText: {
    color: primaryColor,
  },
  uploadIcon: {
    color: white,
    marginRight: 5,
  },
  icon: {
    color: 'red',
    position: 'absolute',
    top: -2,
    right: 2,
  },
});
