import React from 'react';
import {
  StyleSheet,
  View,
  ToastAndroid,
  ScrollView,
  Dimensions,
  TouchableWithoutFeedback,
  Text,
  ImageBackground,
  Image,
  BackHandler,
} from 'react-native';
import {Icon} from 'native-base';
import {isEmpty, set, unset, isNull} from 'lodash';
import {connect} from 'react-redux';
import * as RootNavigation from '../../../navigation/RootNavigation';
import {
  GiftedChat,
  Composer,
  InputToolbar,
  MessageText,
  Bubble,
  Time,
  Send,
} from 'react-native-gifted-chat';

import {
  white,
  primaryColor,
  secondryColor,
  cardBackground,
  inputColor,
  sofiaFont,
} from '../../../style/variables';
import {_getUser} from '../../../api/auth';
import http from '../../../http';
import Moment from 'moment';
import Header from '../../../component/Header/Header';
import Echo from 'laravel-echo';
import socketio from 'socket.io-client';
import Pusher from 'pusher-js/react-native';

const {height, width} = Dimensions.get('window');

class Chat extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      form: {},
      errors: {},
      currentDate: null,
      user: {},
      threadId: '',
      normalText: [],
      messages: [],
      ChateId: '',
      userProfile: {},
    };
  }

  componentWillMount = () => {
    // BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  };

  componentWillUnmount = () => {
    this._unsubscribe();
    // BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  };

  handleBackButtonClick = () => {
    // console.log("Navigationofon Chat",RootNavigation.navigationRef.current)
    // if (RootNavigation && RootNavigation.navigationRef.current.getCurrentRoute().length > 1) {
    //     RootNavigation.push("App");
    //     return true;
    // }
    // return false;
    // Promise.resolve('Success').then((value)=> {
    //     console.log('Success',value); // "Success"
    if (this.props.route.params) {
      this.props.navigation.navigate('Home', {screen: 'Messaging'});
    } else {
      console.log('%%Calling');
      this.props.navigation.goBack(); //Change in  future
      BackHandler.removeListener('hardwareBackPress');
    }
    return true;
    // this.props.navigation.pop();
    //         return true
    //   }).catch(error=> {
    //     console.log("error",error);
    //   });
  };

  createSession() {
    console.log('calling component', this.props.route.params.item.id);
    this.setState({loading: true});
    http
      .post('session/create', {friend_id: this.props.route.params.item.id})
      .then(res => {
        console.log('response create SessiononChate', res);
        this.setState(
          {
            loading: false,
            refreshing: false,
            text: '',
            threadId: res.data.id,
            userProfile: res.data.respective_user,
          },
          () => this.messListener(),
        );
      })
      .catch(err => {
        console.log('errorrr', err);
        let errors = {};
        if (err && err.status == 422) {
          errors = err.errors;
        }
        this.setState({loading: false, errors, refreshing: false});
      });
  }

  async componentDidMount() {
    this.createSession();
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      console.log('hello');
      this.createSession();
    });
    // this.LoadMessages();
    let today = Moment().format('DD/MM/YYYY');
    this.setState({currentDate: today});
    const userdata = await _getUser();
    this.setState({userData: userdata.data});
    if (!isEmpty(userdata)) {
      const currentUser = {
        _id: userdata.data.user.id,
        // name: this.props.user.data.user.name,
        // avatar: this.props.user.data.user.profile,
      };
      this.setState({user: currentUser}, () =>
        console.log('okuserrr', this.state.user),
      );
    }
  }

  // messListener = token => {
  //     let PusherClient = new Pusher('myKey', {
  //     cluster: 'mt1',
  //     wsHost: 'astrouttar.servepratham.com',
  //     wsPort: '6002',
  //     wssHost: 'astrouttar.servepratham.com',
  //     wssPort: '6002',
  //     enabledTransports: ['ws', 'wss'],
  //     forceTLS: false,
  //     });

  //     const echo = new Echo({
  //     broadcaster: 'pusher',
  //     client: PusherClient,
  //     });

  messListener = token => {
    let PusherClient = new Pusher('myKey', {
      cluster: 'mt1',
      wsHost: 'admin.vinoted.servepratham.com',
      wsPort: '5001',
      wssHost: 'admin.vinoted.servepratham.com',
      wssPort: '5001',
      enabledTransports: ['ws', 'wss'],
      forceTLS: false,
    });

    const echo = new Echo({
      broadcaster: 'pusher',
      client: PusherClient,
    });

    // console.log('socket intial', socketio )
    console.log('echo0', echo);
    console.log('session Id', this.state.threadId);
    echo
      .channel(`Chat.${this.state.threadId}`)
      .listen('PrivateChatEvent', ev => {
        console.log('event fired : ', ev);
        this._addMessage(ev.data);
      });
    console.log('echo6', echo);
    this.LoadMessages();
  };

  _addMessage = mess => {
    console.log('working', mess);
    if (mess.user._id != this.state.user._id) {
      this.setState(previousState => {
        return {
          messages: GiftedChat.append(previousState.messages, mess),
        };
      });
    }
  };

  LoadMessages() {
    console.log('threadId11', this.state.threadId);
    let url = `session/${this.state.threadId}/chats`;
    http
      .post(url)
      .then(res => {
        console.log('Chates OLDD', res);
        this.setState({isLoading: false, messages: res.data.reverse()});
      })
      .catch(err => {
        console.log('errorrr', err);
        let errors = {};
        if (err && err.status == 422) {
          errors = err.errors;
        }
        this.setState({isLoading: false, errors});
      });
  }

  customtInputToolbar = props => {
    return (
      <InputToolbar
        {...props}
        containerStyle={{
          // backgroundColor: "red",
          justifyContent: 'center',
          alignSelf: 'center',
          borderTopColor: '#E8E8E8',
          borderTopWidth: 1,
          padding: 8,
          height: 70,
          backgroundColor: 'red',
        }}
      />
    );
  };

  renderTime = () => {
    return (
      <Time
        textStyle={{
          left: {
            color: 'red',
            fontSize: 9,
            fontFamily: sofiaFont,
          },
          right: {
            color: 'red',
            fontSize: 9,
            fontFamily: sofiaFont,
          },
        }}
      />
    );
  };

  renderSend = props => {
    return (
      <Send {...props}>
        {/* <View style={{ height:"100%",backgroundColor: primaryColor }}> */}
        <Icon
          //onPress={() => this.handleSend(this.state.normalText)}
          name="send"
          type="Ionicons"
          style={{
            color: white,
            fontSize: 30,
            backgroundColor: primaryColor,
            padding: 11,
            marginTop: -2,
            marginBottom: -0.5,
          }}
        />
        {/* </View> */}
      </Send>
    );
  };

  // render bubble

  // handleSend = (newMessage = []) => {
  //     this.setState({
  //         messages: GiftedChat.append(this.state.messages, newMessage),
  //     });
  // };

  handleSend = (newMessage = []) => {
    let convert = newMessage;

    let data = {
      content: newMessage[0].text,
      to_user: this.props.route.params.item.id,
    };
    //console.log('send data', data);

    // send chat to server

    let url = `send/${this.state.threadId}`;
    http
      .post(url, data)
      .then(res => {
        console.log('send result....', res);
        //this._addMessage(data);
        this.setState({ChateId: res});
      })
      .catch(err => {
        console.log('errorrr', err);
        let errors = {};
        if (err && err.status == 422) {
          errors = err.errors;
        }
        this.setState({isLoading: false, errors});
      });

    this.setState(previousState => {
      return {
        messages: GiftedChat.append(previousState.messages, newMessage),
      };
    });
  };

  renderComposer = props => {
    return (
      <Composer
        {...props}
        textInputStyle={{
          color: white,
          height: 40,
          backgroundColor: primaryColor,
          fontSize: 15,
          fontFamily: sofiaFont,
          marginLeft: -10,
          paddingHorizontal: 30,
          // alignItems:"center",
          // alignSelf:"center",
          // backgroundColor: primaryColor,
          // borderRadius: 30,
          // fontSize: 15,
          // fontFamily: sofiaFont,
          // color: white,
          // justifyContent: 'center',
        }}
        composerHeight={55}

        //onChange={this.handleChange.bind(this, 'name')}
      />
    );
  };

  renderBubble = props => {
    return (
      <Bubble
        textStyle={{
          left: {
            color: white,
            fontSize: 13,
            fontFamily: sofiaFont,
          },
          right: {
            color: white,
            fontSize: 13,
            fontFamily: sofiaFont,
          },
        }}
        wrapperStyle={{
          left: {
            backgroundColor: secondryColor,
            minHeight: 60,
            minWidth: 120,
            //   marginBottom: 5,
          },
          right: {
            minHeight: 60,
            margin: 5,
            minWidth: 120,
            backgroundColor: inputColor,
          },
        }}
        {...props}
      />
    );
  };

  //     return (
  //       <Bubble
  //         {...props}
  //         textStyle={{
  //           right: {
  //             color: 'yellow',
  //           },
  //         }}
  //         wrapperStyle={{
  //           right: {
  //             backgroundColor: 'red',
  //           },
  //         }}
  //       />
  //     );
  //   };
  AvtarStyle = props => {
    return (
      <View
        style={{
          height: 50,
          backgroundColor: 'red',
          width: 50,
          justifyContent: 'center',
        }}
      />
    );
  };

  renderMessageText = props => {
    const {currentMessage} = props;
    const {text: currText} = currentMessage;
    console.log('render text in message', currText);
    if (currText.indexOf('[x]') === -1) {
      return (
        <MessageText
          wrapperStyle={{backgroundColor: 'red', height: 200}}
          {...props}
        />
      );
    }
    return <CustomMessageText {...props} />;
  };

  render() {
    const {form, errors, loading, userData, userProfile} = this.state;
    console.log('UserProfiledata', userProfile);
    return (
      <View
        style={{
          flex: 1,
          // backgroundColor: this.props.theme ? this.props.theme.theme_color : 'white'
        }}>
        <View
          style={[styles.header, {paddingVertical: 5, backgroundColor: white}]}>
          <View style={styles.leftContainer}>
            <View style={{flex: 0.15}}>
              <Icon
                name="keyboard-arrow-left"
                type="MaterialIcons"
                onPress={() => {
                  // this.props.navigation.pop();
                  this.props.navigation.goBack();
                  // this.props.navigation.push("Home",{screen:"Messaging"});
                }}
                style={{color: primaryColor, padding: 10}}
              />
            </View>
            <View
              style={{
                flex: 0.85,
                width: '100%',
                alignItems: 'center',
                justifyContent: 'flex-start',
                alignSelf: 'center',
                flexDirection: 'row',
              }}>
              <View style={{flex: 0.2, marginRight: 20}}>
                {/* {!isEmpty(this.state.userProfile.profile.photo) ? */}
                <Image
                  source={{
                    uri:
                      !isEmpty(this.state.userProfile) &&
                      !isNull(this.state.userProfile.profile.photo)
                        ? this.state.userProfile.profile.photo
                        : 'https://www.freeiconspng.com/uploads/customers-icon-3.png',
                  }}
                  resizeMode="contain"
                  style={{
                    height: 40,
                    width: 40,
                    borderRadius: 20,
                  }}
                />
                {/* :
                                   <Image
                                    source={{ uri: !isEmpty(this.state.userProfile)&& this.state.userProfile.profile!=null ? this.state.userProfile.profile : "https://www.freeiconspng.com/uploads/customers-icon-3.png" }}
                                    resizeMode='contain'
                                    style={{
                                        height: 40, width: 40, borderRadius: 20,

                                    }} />
                               }  */}
              </View>
              <View>
                <Text
                  style={{
                    fontFamily: sofiaFont,
                    fontSize: 20,
                    fontWeight: 'bold',
                    textTransform: 'capitalize',
                    color: primaryColor,
                  }}>
                  {!isEmpty(this.state.userProfile.profile) &&
                    this.state.userProfile.profile.first_name}
                </Text>
                <Text
                  style={{
                    fontFamily: sofiaFont,
                    fontSize: 10,
                    fontWeight: 'bold',
                    textTransform: 'capitalize',
                    color: primaryColor,
                  }}>
                  {this.state.userProfile.status == 'Active'
                    ? 'Online'
                    : 'Offline'}
                </Text>
              </View>
            </View>

            {/* <View style={{flex:0.2,alignItems:"flex-end"}}>
                    <Icon name="dots-three-vertical" type="Entypo" style={{fontSize:20, color:iconColor, padding: 10 }} onPress={() =>{}}></Icon>
                </View> */}
          </View>
        </View>
        <View style={{flex: 1}}>
          <GiftedChat
            messages={this.state.messages}
            renderSend={this.renderSend}
            renderComposer={this.renderComposer}
            renderBubble={this.renderBubble}
            renderMessageText={this.renderMessageText}
            onSend={newMessage => this.handleSend(newMessage)}
            user={this.state.user}
            messagesContainerStyle={{
              paddingBottom: 7,
            }}
            containerStyle={{
              minHeight: 60,
              borderTopColor: 'transparent',
              // backgroundColor: this.props.theme ? this.props.theme.theme_color : 'white',
              justifyContent: 'center',
              alignItems: 'flex-start',
            }}
          />
        </View>
        {/*
          <GiftedChat
            renderComposer={this.renderComposer}
            renderSend={this.renderSend}
            messages={this.state.messages}
            showUserAvatar = {false}
            //renderTime = {this.renderTime}
            onSend={newMessage => this.handleSend(newMessage)}
            renderMessageText={this.renderMessageText}
            renderBubble={this.renderBubble}
            onInputTextChanged = {(text)=>this.setState({normalText : text}, ()=> console.log('text...', this.state.normalText))}
            //renderInputToolbar = {this.renderInputToolbar}
            containerStyle={{
              minHeight: 60,
              borderTopColor: 'transparent',
              backgroundColor: this.props.theme ? this.props.theme.theme_color : 'white',
              justifyContent: 'center',
              alignItems: 'flex-start',
            }}
            user={{
              _id: 2,
            }}
            scrollToBottom
            alwaysShowSend
            //renderInputToolbar = {this.customtInputToolbar}
            //user={{ _id: 1 }}
          />
        ) */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
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

const mapProps = state => ({
  user: state.root.user,
});

export default connect(mapProps, null)(Chat);
