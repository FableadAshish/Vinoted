import EStyleSheet from "react-native-extended-stylesheet";
import { secondryTextColor, sofiaFont, white } from "../../../style/variables";
import { Dimensions } from "react-native";
const {height, width} = Dimensions.get('window');

const styles = EStyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: white,
      },
      headerContainer: {
        height: 100,
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
      },
      userDetailContainer: {
        paddingHorizontal: 5,
        flex: 1,
      },
      backgroundImage: {
        width: '100%',
        height: '100%',
      },
      text: {
        fontSize: 14,
        marginLeft: 10,
        color: 'white',
        fontFamily: sofiaFont,
      },
      icon: {
        color: white,
        fontSize: 24,
        width: 24,
        fontFamily: sofiaFont,
      },
      profilePic: {
        width: 70,
        height: 70,
        borderRadius: 35,
        margin: 10,
      },
      listItem: {
        height: 40,
        marginLeft: 25,
      },
      logoContainer: {
        flex: 0.5,
        justifyContent: 'center',
        alignItems: 'center',
      },
      logo: {
        height: 80,
      },
      card: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: width - 100,
        height: 50,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 5,
        marginBottom: 5,
        elevation: 4,
        backgroundColor: secondryTextColor,
      },
      AddmodelView: {
        height: 380,
        width: width - 20,
        backgroundColor: white,
        alignItems: 'center',
        borderRadius: 10,
        marginVertical: 100,
      },
      modelView: {
        height: 150,
        width: width - 20,
        backgroundColor: white,
        alignItems: 'center',
        borderRadius: 10,
        marginVertical: 100,
      },
      modelheader: {
        alignItems: 'center',
        marginBottom: 20,
      },
      viewinput: {
        height: 200,
        width: width - 90,
        backgroundColor: white,
        flexDirection: 'row',
        marginBottom: 5,
        alignItems: 'center',
        justifyContent: 'center',
      },
      buttoninput: {
        alignItems: 'center',
        marginTop: 5,
        width: width - 90,
        alignSelf: 'center',
        height: 45,
        justifyContent: 'center',
        borderRadius: 5,
        backgroundColor: secondryTextColor,
      },
})

export default styles;