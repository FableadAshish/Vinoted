import React from 'react';
import { StyleSheet, Text, TextInput, View} from 'react-native';
import { Icon } from 'native-base';
import { primaryColor,secondryColor, textColor ,sofiaFont} from '../../style/variables';
import { isEmpty } from 'lodash';

export default class InputText extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasFocus: false,
      showEye:false
    }
  }

  handleFocus = () => this.setState({ hasFocus: true });
  handleBlur = () => this.setState({ hasFocus: false }); 

_getColor = () => {
    const { errorColor, tintColor, baseColor, errors,value,name } = this.props;
    const { hasFocus } = this.state;

    if (!isEmpty(errors) && !isEmpty(errors[name])) {
      return errorColor;
    }
    if (hasFocus || (!hasFocus && !isEmpty(value))) {
      return tintColor;
    }
    return baseColor;
  };

 _getLineStyleVariant = () => {
    const { errors,name } = this.props;
    const { hasFocus } = this.state;

    return (!isEmpty(errors) && !isEmpty(errors[name])) || hasFocus ?
      { borderBottomWidth: 2, paddingBottom: 1 } :
      { borderBottomWidth: 0.8, paddingBottom: 2.5 };
  };

  render(){
     const { errorColor,textColor,
             tintColor,baseColor,value,name, label,onRef, errors,placeholder,iconProps,showIcon,onChange,...textInputProps } = this.props;
    const { hasFocus } = this.state;
    const inputContainerBorderStyle = { borderBottomColor: this._getColor(), ...this._getLineStyleVariant() };
    const textInputStyle = {
      ...StyleSheet.flatten()
    };
    const labelStyle = [{
      fontFamily:sofiaFont,
      position: 'absolute',
      left: showIcon ?30 :0,
      top: (!hasFocus && isEmpty(value)) ? 12 : 0,
      fontSize: (!hasFocus && isEmpty(value)) ? 18 : 12,
    },{ color: this._getColor() }];

    return (
      <View style={styles.container}>
        <View style={[styles.inputContainer, inputContainerBorderStyle]}>
        <Text style={labelStyle}>
          {label}
        </Text>
        {
            showIcon && <Icon  {...iconProps} style={styles.icon} />
        }
        
        <TextInput
            ref={onRef.bind(this)}
            autoCapitalize= 'none'
            autoCorrect={false}
            blurOnSubmit={false}
            returnKeyType="next"
            { ...textInputProps }
            disableFullscreenUI={true}
            placeholder={hasFocus ? placeholder:null}
            underlineColorAndroid="transparent"
            value={value}
            onChangeText={onChange.bind(this)}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            selectionColor={baseColor} 
            style={[styles.textInput,{color:textColor,marginLeft:showIcon ? 12:0}]}
            placeholderTextColor={secondryColor}
          />
         {this.props.passEye && <Icon name={this.state.showEye?"eye-off":"eye"} onPress={()=>{
           this.setState({
            showEye:!this.state.showEye
           })
           this.props.seePass()}} type="Ionicons" style={styles.icon} />}
        </View>
        { !isEmpty(errors) && !isEmpty(errors[name]) && <Text style={[styles.helper, { color: errorColor }]}>{errors[name][0]}</Text>}
      </View>
    );
  }
}

InputText.defaultProps = {
    name:'email',
    errors:[],
    errorColor: 'rgb(213, 0, 0)',
    tintColor: primaryColor,
    baseColor: primaryColor,
    Textcolor:primaryColor,
    onChange:() => null,
    onRef:() => null,
    showIcon:true,
    value:null
}

const styles = StyleSheet.create({
  container: {
      marginVertical:6,
      width:'100%',
      // backgroundColor:"red"
  },
  inputContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingTop:14,
  },
  helper: {
    fontSize: 12,
    marginVertical: 2,
    marginLeft:30,
    fontFamily:sofiaFont,
  },
  textInput: {
    flex: 1,
    fontSize: 20,
    height: 30,
    padding: 0,
    fontFamily:sofiaFont,
    
  },
  icon:{
    position: 'relative',
    bottom:5,
    color:primaryColor
  }
});