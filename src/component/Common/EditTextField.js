import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {Icon} from 'native-base';
import {
  primaryColor,
  secondryColor,
  textColor,
  white,
  sofiaFont,
} from '../../style/variables';
import {isEmpty} from 'lodash';

export default class InputTexts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasFocus: false,
    };
  }

  handleFocus = () => this.setState({hasFocus: true});
  handleBlur = () => this.setState({hasFocus: false});

  _getColor = () => {
    const {errorColor, tintColor, baseColor, errors, value, name} = this.props;
    const {hasFocus} = this.state;

    if (!isEmpty(errors) && !isEmpty(errors[name])) {
      return errorColor;
    }
    if (hasFocus || (!hasFocus && !isEmpty(value))) {
      return tintColor;
    }
    return baseColor;
  };

  _getLineStyleVariant = () => {
    const {errors, name} = this.props;
    const {hasFocus} = this.state;

    return (!isEmpty(errors) && !isEmpty(errors[name])) || hasFocus
      ? {borderBottomWidth: 2, paddingBottom: 1}
      : {borderBottomWidth: 0.8, paddingBottom: 2.5};
  };

  render() {
    const {
      errorColor,
      Textcolor,
      tintColor,
      baseColor,
      value,
      name,
      label,
      onRef,
      errors,
      placeholder,
      iconProps,
      showIcon,
      onChange,
      ...textInputProps
    } = this.props;
    const {hasFocus} = this.state;
    const inputContainerBorderStyle = {
      borderBottomColor: this._getColor(),
      ...this._getLineStyleVariant(),
    };
    const textInputStyle = {
      ...StyleSheet.flatten(),
    };
    const labelStyle = [
      {
        fontFamily: sofiaFont,
        position: 'absolute',
        left: showIcon ? 2 : 0,
        top: !hasFocus && isEmpty(value) ? 12 : 0,
        fontSize: !hasFocus && isEmpty(value) ? 15 : 12,
      },
      {color: this._getColor()},
    ];

    return (
      <View style={styles.container}>
        <View style={[styles.inputContainer, inputContainerBorderStyle]}>
          <Text style={labelStyle}>{label}</Text>
          {/* {
            showIcon && <Icon {...iconProps} style={styles.icon} />
        } */}

          <TextInput
            ref={onRef.bind(this)}
            autoCapitalize="none"
            autoCorrect={false}
            blurOnSubmit={false}
            returnKeyType="next"
            {...textInputProps}
            disableFullscreenUI={true}
            placeholder={hasFocus ? placeholder : null}
            underlineColorAndroid="transparent"
            value={value}
            editable={this.props.editable}
            maxLength={this.props.maxLength}
            multiline={this.props.multiline}
            onChangeText={onChange.bind(this)}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            selectionColor={baseColor}
            style={[
              styles.textInput,
              {color: Textcolor, marginLeft: showIcon ? 12 : 0},
            ]}
            placeholderTextColor={secondryColor}
          />
        </View>
        {!isEmpty(errors) && !isEmpty(errors[name]) && (
          <Text style={[styles.helper, {color: errorColor}]}>
            {errors[name][0]}
          </Text>
        )}
      </View>
    );
  }
}
// "#525b67"
InputTexts.defaultProps = {
  name: 'email',
  errors: [],
  errorColor: 'rgb(213, 0, 0)',
  tintColor: '#b8bec6',
  baseColor: '#b8bec6',
  Textcolor: white,
  onChange: () => null,
  onRef: () => null,
  showIcon: true,
  value: null,
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingTop: 14,
  },
  helper: {
    fontSize: 12,
    fontFamily: sofiaFont,
    marginVertical: 2,
    marginLeft: 30,
  },
  textInput: {
    flex: 1,
    fontSize: 18,
    fontFamily: sofiaFont,
    height: 30,
    padding: 0,
  },
  icon: {
    position: 'relative',
    bottom: 5,
    color: white,
  },
});
