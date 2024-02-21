import EStyleSheet from 'react-native-extended-stylesheet';
import {sofiaFont, white} from '../../../../style/variables';

const styles = EStyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    paddingLeft: 10,
    justifyContent: 'space-between',
  },
  headerIcon: {
    color: white,
    fontSize: 35,
    fontFamily: sofiaFont,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
export default styles;
