import React, { Component } from 'react';
import { View,StyleSheet,YellowBox,Text,Image,Platform,ActivityIndicator,Keyboard,Switch,TouchableOpacity,ToastAndroid,TextInput,StatusBar,Alert,FlatList} from 'react-native';
import {Button,Card} from 'react-native-paper';
import { showAlert, showPositiveAlert } from '../components/common/alert';
import NetInfo from "@react-native-community/netinfo";
import Axios from 'axios';
import DeviceInfo from 'react-native-device-info';
import firebase from 'react-native-firebase';
import Icon from "react-native-vector-icons/Ionicons";
import { CheckBox } from 'react-native-elements'
import AsyncStorage from '@react-native-community/async-storage';


export default class LoginScreen extends Component {
  constructor(props){
    super(props);
    this.doSignup = this.doSignup.bind(this);
    this.state={
      deviceInfo:[],
      email:'',
      password:'',
      loginToken:'',
      hidePassword: true,
      check:false,
      switchValue:false,
      showLoader:false
    }
  }

  _hideKeyboard = () => {
    Keyboard.dismiss()
  }

  async componentWillMount() {
    userId = await AsyncStorage.getItem('userId');
    loginToken = await AsyncStorage.getItem('loginToken');
   const fcmToken = await firebase.messaging().getToken();
   console.log('AddDeviceDetails FCM Token:',fcmToken)
  }



  showLoader = () => { this.setState({ showLoader:true }); };
  hideLoader = () => { this.setState({ showLoader:false }); };


  doSignup = () => {
    this.showLoader();
  }

  _onSubmit = () => {
    Keyboard.dismiss();
    // let emailregex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    // console.warn('email'+this.state.email);
    // console.warn('passwrd'+this.state.password);
    if ((this.state.email == '') || (this.state.email == null)) {
      ToastAndroid.showWithGravity(
        "Please enter Email Id",ToastAndroid.SHORT,ToastAndroid.CENTER,
      );
    } else if ((this.state.password == '') || (this.state.password == null)){
      ToastAndroid.showWithGravity(
        "Please enter the Password",ToastAndroid.SHORT,ToastAndroid.CENTER,
      );
    }
    // else if (this.state.email === '') {
    //   ToastAndroid.showWithGravity(
    //     "Enter a valid Email Address",ToastAndroid.SHORT,ToastAndroid.CENTER,
    //   );
    // }
    else {
        NetInfo.fetch().then(state => {
          if (state.isConnected === true) {
              this.login(this.state.email, this.state.password)
            } else {
              showAlert('Error', 'Internet seems to be offline.', true, this._onSubmit);
          }
      });
    }
  }




  login =  async (email,password) => {

    const emailid=this.state.email;
    const pwd= this.state.password;

  //fetch logintoken value from api
    let login = 'https://moneyfrog.in/api_controller/validation_login';

    var formdata=new FormData();
    formdata.append("email",emailid);
    formdata.append("pwd",pwd);

    await Axios.post(login,formdata)
        .then((response) => {
            let token = response.data;
            // console.warn(token);
            let userId= response.data.id;
            let loginToken = response.data.login_token;
            let email = response.data.email_id;
            let showMessage = response.data.show_message;
            let password = response.data.password;


        if ( token === 'Incorrect Email or Password' || token === 'You need to sign up first') {
            ToastAndroid.showWithGravity(
              'Incorrect email or password',ToastAndroid.SHORT,ToastAndroid.CENTER,
            );
        }
        else if ( token.login_token !== '' ){
            AsyncStorage.multiSet([
              ["userId", userId],
              ["loginToken", loginToken],
              ["email", email],
              ["password", password] ,
              ["showMessage",showMessage]
            ])
            ToastAndroid.showWithGravity(
              'Attempting Successful Login',ToastAndroid.SHORT,ToastAndroid.BOTTOM,
            );
            this.update_user_id(userId,loginToken);
            this.addDeviceDetails(userId);
            this.props.navigation.navigate('MainApp')
        }
        })
        .catch((error) => console.error('login api error: ' + error.message));
    }
//            DeviceInfo.getApiLevel().then((apiLevel) => {
//            console.log('device_api_level function',apiLevel);
//            });

    async update_user_id (userId,loginToken) {
    console.log('LoginToken',loginToken);
//        const fcmToken = await firebase.messaging().getToken();
//             console.log('LoginScreeen FCM',fcmToken);
       // let device_api_level = apiLevel;
        let device_api_level = DeviceInfo.getApiLevel();
         //console.log('device_api_level',device_api_level);
        let brand = DeviceInfo.getBrand();
        let OSVersion = DeviceInfo.getSystemVersion();
        let model = DeviceInfo.getModel();
        let uuid=DeviceInfo.getUniqueId();
        let token_api = 'https://moneyfrog.in/push_notification_controller/update_user_id?user_id='+userId+'&uuid='+uuid+'&login_token='+loginToken;
        //let token_api = 'https://moneyfrog.in/push_notification_controller/update_user_id?user_id='+userId+'&uuid='+uuid+'&login_token='+loginToken+'&token_no='+fcmToken+'&device_product='+brand+'&device_os_version='+OSVersion+'&device_name='+model+'&device_model='+model+'&device_api_level='+device_api_level+'&device_type='+"android";
        console.log('Device Details token_api',token_api);
        Axios.get(token_api)
            .then((response) => {
                let resp = response.data;
                console.warn('login token updated 1',resp);
                console.warn('login token updated',resp.msg);
        })
        .catch((error) => console.error('push notification update token error: ' + error.message));
    }

            async addDeviceDetails (user_id) {
            const fcmToken = await firebase.messaging().getToken();
             console.log('AddDeviceDetails FCM Token:',fcmToken);

             DeviceInfo.getApiLevel().then((a) => {
            let brand=DeviceInfo.getBrand();
             console.warn("Device Brand", DeviceInfo.getBrand());  // e.g. Xiaomi

            let type=DeviceInfo.getSystemName();
             console.warn("Device Name", DeviceInfo.getSystemName());  // e.g. iPhone ,Android

            let model=DeviceInfo.getModel();
             console.warn("Device Model", DeviceInfo.getModel());  // e.g. Redmi Note 5 Pro

            let os_version=DeviceInfo.getSystemVersion();
             console.warn("Device Version", DeviceInfo.getSystemVersion());  // e.g. 9.0

            let uuid=DeviceInfo.getUniqueId();
             console.warn("Device Unique ID", DeviceInfo.getUniqueId());  // e.g. FCDBD8EF-62FC-4ECB-B2F5-92C9E79AC7F9
             console.warn('api lvl is:'+a);

            var formdata=new FormData();
            formdata.append("os_version",os_version);
            formdata.append("type",type);
            formdata.append("model",model);
            formdata.append("brand",brand);
            formdata.append("uuid",uuid);
            formdata.append("user_id",user_id);
            formdata.append("api_level",a);
            formdata.append("token_no",fcmToken);
            let deviceDetails = 'https://moneyfrog.in/push_notification_controller/device_details';
            Axios.post(deviceDetails,formdata)
            .then((response) => {
                let resp = response.data;
                console.warn(resp.msg);
                 console.warn('Device Details Added Successfully',resp);
            })
            .catch((error) => console.error('device details api error: ' + error.message));

          });
    }

    managePasswordVisibility = () => {
      this.setState({ hidePassword: !this.state.hidePassword });
    }

    checkBoxTest(){
      this.setState({
        check: !this.state.check
      })
    }

    toggleSwitch = value => {
      this.setState({ switchValue: value });
    };


  render() {
    return (
      <View >
        <View style={{ position: 'absolute', top:"70%",right: 0, left: 0 }}>
          <ActivityIndicator animating={this.state.showLoader} size="large" color="red" />
        </View>
      <StatusBar barStyle='light-content' backgroundColor='black' />



        <View>
        <Image style={styles.image}
        source={require('../../assets/images/Login/login_signup_curtain.png')}/>

        <Image style={styles.image1}
        source={require('../../assets/images/Login/moneyfrog_face.png')}/>
        </View>

        <View style={styles.inputContainer}>

          <View style={{marginVertical:10}}>
            <TextInput
            selectionColor={'#9fd23a'}
            style={styles.input}
            value={this.state.email}
            onChangeText={value => this.setState({ email: value })}
            focus={true}
            placeholder="Email Id"
            autoCorrect={true}
            keyboardType="default"
            returnKeyType="next"
            autoCapitalize="none"
            onSubmitEditing={() => this.passowrodInput.focus()}
            blurOnSubmit={false}
            />
          </View>

          <View style = { styles.textBoxBtnHolder }>
            <TextInput
            ref={(i) => this.passowrodInput = i}
            autoCorrect={false}
            onChangeText={value => this.setState({ password: value })}
            returnKeyType="send"
            blurOnSubmit={true}
            autoCapitalize="none"
            placeholder="Password"
            underlineColorAndroid = "transparent"
            secureTextEntry = { this.state.hidePassword }
            selectionColor={'#9fd23a'}
            style={styles.input}
            />
            <TouchableOpacity activeOpacity = { 0.8 } style={styles.visibilityBtn} onPress = {this.managePasswordVisibility }>
              <Icon name={(this.state.hidePassword) ? ('md-eye-off') : ('md-eye') } size={25} color="grey"  />
            </TouchableOpacity>
          </View>

          <View style={styles.rememberForgotContainer}>

            <View style={{flexDirection:'row',alignItems:'center'}}>
                <Switch
                  trackColor={{ true: "#dedad3", false: "lightgrey" }}
                  onValueChange={this.toggleSwitch}
                  value={this.state.switchValue}
                  thumbColor={this.state.switchValue ?'#a5ca52':'#ffffff'}

                />
                <Text style={{fontFamily:'Lato-Regular',color:'grey',marginHorizontal:3,fontSize:16}}>Remember Me</Text>
              </View>

            <TouchableOpacity
              onPress ={() => this.props.navigation.navigate('ForgotPassword')}>
              <Text style={styles.forgotPassword}>Forgot Password ?</Text>
            </TouchableOpacity>
          </View>

        </View>

        <View style={styles.buttonContainer}>
          <View  style={{width:'90%'}}>
          <TouchableOpacity
            onPress={() => this._onSubmit()}>
            <Text style = {styles.button}>LOG IN</Text>
          </TouchableOpacity>
          </View>

          <Button
            onPress={() => this.props.navigation.navigate('CreateAccount')}
            mode="outlined" color="#a5ca52" uppercase={false}
            style={styles.outlineButton}>
            CREATE ACCOUNT
          </Button>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
     flex:1,
      backgroundColor: 'white',
    },
    inputContainer:{
      marginHorizontal:10,
    },
    curtain: {
      width: '100%',
      height: 70
    },
    moneyfrogFace: {
      margin: 20,
      width: '100%',
      height: 70
    },
    image:{
      width:'100%',
      resizeMode:'contain',
      height:90,
      marginTop:-37
    },
    image1:{
      width:'100%',
      height:130,
      resizeMode: 'contain'
    },
    forgotPassword:{
      color: '#a5ca52',
      marginVertical: 2,
      fontSize:16,
      marginHorizontal:15,
      fontFamily:'Lato-Regular'
    },
    rememberMe:{
      color: '#a5ca52',
      fontSize:16,
      marginHorizontal:20,
    },
    buttonContainer:{
      width:'100%',
      flexDirection:'column',
      justifyContent:'center',
      alignItems:'center'
    },
    input: {
      height: 40,
      paddingHorizontal: 10,
      borderBottomColor: '#9fd23a',
      borderBottomWidth: 1,
      fontSize: 16,
      fontFamily:'Lato-Regular',
    },
    button: {
      padding: 9,
      fontSize:15,
      fontFamily:'Lato-Regular',
      color:'white',
      backgroundColor: '#9fd23a',
      borderRadius:2,
      elevation:2,
      textAlign:'center'
    },
    outlineButton:{
      borderColor:'#9fd23a',
      backgroundColor:'white',
      borderWidth:1.5,
      fontFamily:'Lato-Regular',
      width:'90%'  ,
      marginTop:10,
    },
    textBoxBtnHolder:{
      position: 'relative',
      alignSelf: 'stretch',
      justifyContent: 'center'
    },
    visibilityBtn:{
      position: 'absolute',
      right: 3,
      height: 40,
      width: 35,
      padding: 5
    },
    rememberForgotContainer:{
      flexDirection:'row',
      marginVertical:13,
      alignItems:'center',
      justifyContent:'space-between'
    }
  });




// import React, { Component } from 'react';
// import { View,StyleSheet,YellowBox,Text,Image,Platform,ActivityIndicator,Keyboard,Switch,TouchableOpacity,ToastAndroid,TextInput,StatusBar,Alert,FlatList} from 'react-native';
// import {Button,Card} from 'react-native-paper';
// import { showAlert, showPositiveAlert } from '../components/common/alert';
// import NetInfo from "@react-native-community/netinfo";
// import Axios from 'axios';
// import DeviceInfo from 'react-native-device-info';
// import firebase from 'react-native-firebase';
// import Icon from "react-native-vector-icons/Ionicons";
// import { CheckBox } from 'react-native-elements'
// import AsyncStorage from '@react-native-community/async-storage';


// export default class LoginScreen extends Component { 
//   constructor(props){
//     super(props);
//     this.doSignup = this.doSignup.bind(this);
//     this.state={
//       deviceInfo:[],
//       email:'',
//       password:'',
//       loginToken:'',
//       hidePassword: true,
//       check:false,
//       switchValue:false,
//       showLoader:false
//     }
//   }

//   _hideKeyboard = () => {
//     Keyboard.dismiss()
//   }

//   async componentWillMount() {
//     userId = await AsyncStorage.getItem('userId');
//     loginToken = await AsyncStorage.getItem('loginToken');
//     console.log('Device Login Token', loginToken);
//   }

  

//   showLoader = () => { this.setState({ showLoader:true }); };
//   hideLoader = () => { this.setState({ showLoader:false }); };

  
//   doSignup = () => {
//     this.showLoader();
//   }

//   _onSubmit = () => {
//     Keyboard.dismiss();
//     // let emailregex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
//     // console.warn('email'+this.state.email);
//     // console.warn('passwrd'+this.state.password);
//     if ((this.state.email == '') || (this.state.email == null)) {
//       ToastAndroid.showWithGravity(
//         "Please enter Email Id",ToastAndroid.SHORT,ToastAndroid.CENTER,
//       );    
//     } else if ((this.state.password == '') || (this.state.password == null)){
//       ToastAndroid.showWithGravity(
//         "Please enter the Password",ToastAndroid.SHORT,ToastAndroid.CENTER,
//       );
//     } 
//     // else if (this.state.email === '') {
//     //   ToastAndroid.showWithGravity(
//     //     "Enter a valid Email Address",ToastAndroid.SHORT,ToastAndroid.CENTER,
//     //   );
//     // } 
//     else {
//         NetInfo.fetch().then(state => {
//           if (state.isConnected === true) {
//               this.login(this.state.email, this.state.password)
//             } else {
//               showAlert('Error', 'Internet seems to be offline.', true, this._onSubmit);
//           }
//       });
//     }
//   }  

//   login =  async (email,password) => {

//     const emailid=this.state.email;
//     const pwd= this.state.password;

//   //fetch logintoken value from api
//     let login = 'https://moneyfrog.in/api_controller/validation_login';

//     var formdata=new FormData();
//     formdata.append("email",emailid);
//     formdata.append("pwd",pwd);

//     await Axios.post(login,formdata)
//         .then((response) => {
//             let token = response.data;
//             // console.warn(token);
//             let userId= response.data.id;
//             let loginToken = response.data.login_token;
//             console.log('Device Login Token', loginToken);
//             let email = response.data.email_id;
//             let showMessage = response.data.show_message;
//             let password = response.data.password;

 
//         if ( token === 'Incorrect Email or Password' || token === 'You need to sign up first') {
//             ToastAndroid.showWithGravity(
//               'Incorrect email or password',ToastAndroid.SHORT,ToastAndroid.CENTER,
//             );  
//         }
//         else if ( token.login_token !== '' ){
//             AsyncStorage.multiSet([
//               ["userId", userId],
//               ["loginToken", loginToken],
//               ["email", email],
//               ["password", password] ,
//               ["showMessage",showMessage] 
//             ])
//             ToastAndroid.showWithGravity(
//               'Attempting Successful Login',ToastAndroid.SHORT,ToastAndroid.BOTTOM,
//             );
//             this.props.navigation.navigate('MainApp')
//             // this.hideLoader()
//             // this.addDeviceDetails(userId,loginToken)
//         }
//     })
//     .catch((error) => console.error('login api error: ' + error.message));  
//     }

//     addDeviceDetails = async(userId,loginToken) => {
//       const fcmToken = await firebase.messaging().getToken();
//       console.log(fcmToken)
//       let deviceDetails = 'https://moneyfrog.in/register-token'
//       let brand = DeviceInfo.getBrand();
//       let OSVersion = DeviceInfo.getSystemVersion();
//       let model = DeviceInfo.getModel();

//       var formdata=new FormData();
//       formdata.append("user_id",userId);
//       formdata.append("device_type","android");
//       formdata.append("token_no",fcmToken);
//       formdata.append("device_os_version",OSVersion);
//       formdata.append("device_api_level","");
//       formdata.append("device_name",model);
//       formdata.append("device_model",model);
//       formdata.append("device_product",brand);
//       formdata.append("login_token",loginToken);

//       await Axios.post(deviceDetails,formdata)
//         .then((response) => {
//           let resp = response.data;
//            console.log(resp)
//       })
//     }

//     managePasswordVisibility = () => {
//       this.setState({ hidePassword: !this.state.hidePassword });
//     }

//     checkBoxTest(){
//       this.setState({
//         check: !this.state.check
//       })
//     }

//     toggleSwitch = value => {
//       this.setState({ switchValue: value });
//     };
       
       
//   render() {
//     return (
//       <View >
//         <View style={{ position: 'absolute', top:"70%",right: 0, left: 0 }}>
//           <ActivityIndicator animating={this.state.showLoader} size="large" color="red" />
//         </View>
//       <StatusBar barStyle='light-content' backgroundColor='black' />

      
        
//         <View>
//         <Image style={styles.image} 
//         source={require('../../assets/images/Login/login_signup_curtain.png')}/>
        
//         <Image style={styles.image1} 
//         source={require('../../assets/images/Login/moneyfrog_face.png')}/>
//         </View>

//         <View style={styles.inputContainer}>

//           <View style={{marginVertical:10}}>
//             <TextInput
//             selectionColor={'#9fd23a'}
//             style={styles.input}
//             value={this.state.email}
//             onChangeText={value => this.setState({ email: value })}
//             focus={true}
//             placeholder="Email Id"
//             autoCorrect={true}
//             keyboardType="default"
//             returnKeyType="next"
//             autoCapitalize="none"
//             onSubmitEditing={() => this.passowrodInput.focus()}
//             blurOnSubmit={false}
//             />
//           </View>

//           <View style = { styles.textBoxBtnHolder }>
//             <TextInput 
//             ref={(i) => this.passowrodInput = i}
//             autoCorrect={false}
//             onChangeText={value => this.setState({ password: value })}
//             returnKeyType="send"
//             blurOnSubmit={true}
//             autoCapitalize="none"
//             placeholder="Password"
//             underlineColorAndroid = "transparent" 
//             secureTextEntry = { this.state.hidePassword } 
//             selectionColor={'#9fd23a'}
//             style={styles.input}
//             />
//             <TouchableOpacity activeOpacity = { 0.8 } style={styles.visibilityBtn} onPress = {this.managePasswordVisibility }>
//               <Icon name={(this.state.hidePassword) ? ('md-eye-off') : ('md-eye') } size={25} color="grey"  />
//             </TouchableOpacity>
//           </View>

//           <View style={styles.rememberForgotContainer}>
          
//             <View style={{flexDirection:'row',alignItems:'center'}}>
//                 <Switch
//                   trackColor={{ true: "#dedad3", false: "lightgrey" }}
//                   onValueChange={this.toggleSwitch}
//                   value={this.state.switchValue}
//                   thumbColor={this.state.switchValue ?'#a5ca52':'#ffffff'}

//                 />
//                 <Text style={{fontFamily:'Lato-Regular',color:'grey',marginHorizontal:3,fontSize:16}}>Remember Me</Text>
//               </View>

//             <TouchableOpacity 
//               onPress ={() => this.props.navigation.navigate('ForgotPassword')}>
//               <Text style={styles.forgotPassword}>Forgot Password ?</Text>
//             </TouchableOpacity>
//           </View>

//         </View>

//         <View style={styles.buttonContainer}>
//           <View  style={{width:'90%'}}>          
//           <TouchableOpacity 
//             onPress={() => this._onSubmit()}>
//             <Text style = {styles.button}>LOG IN</Text>
//           </TouchableOpacity>
//           </View>

//           <Button  
//             onPress={() => this.props.navigation.navigate('CreateAccount')}
//             mode="outlined" color="#a5ca52" uppercase={false}
//             style={styles.outlineButton}>
//             CREATE ACCOUNT
//           </Button>
//         </View>

//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container:{
//      flex:1,
//       backgroundColor: 'white',
//     },
//     inputContainer:{
//       marginHorizontal:10, 
//     },
//     curtain: {
//       width: '100%',
//       height: 70
//     },
//     moneyfrogFace: {
//       margin: 20,
//       width: '100%',
//       height: 70
//     },
//     image:{
//       width:'100%',
//       resizeMode:'contain',
//       height:90,
//       marginTop:-37
//     },
//     image1:{
//       width:'100%',
//       height:130,
//       resizeMode: 'contain'
//     },
//     forgotPassword:{
//       color: '#a5ca52',
//       marginVertical: 2,
//       fontSize:16,
//       marginHorizontal:15,
//       fontFamily:'Lato-Regular'
//     },
//     rememberMe:{
//       color: '#a5ca52',
//       fontSize:16,
//       marginHorizontal:20,
//     },
//     buttonContainer:{
//       width:'100%',
//       flexDirection:'column',
//       justifyContent:'center',
//       alignItems:'center'
//     },
//     input: {
//       height: 40,
//       paddingHorizontal: 10,
//       borderBottomColor: '#9fd23a',
//       borderBottomWidth: 1,
//       fontSize: 16,
//       fontFamily:'Lato-Regular',
//     },
//     button: {
//       padding: 9,
//       fontSize:15,
//       fontFamily:'Lato-Regular',
//       color:'white',
//       backgroundColor: '#9fd23a',
//       borderRadius:2,
//       elevation:2,
//       textAlign:'center'
//     },
//     outlineButton:{
//       borderColor:'#9fd23a',
//       backgroundColor:'white',
//       borderWidth:1.5,
//       fontFamily:'Lato-Regular',
//       width:'90%'  ,
//       marginTop:10,
//     },
//     textBoxBtnHolder:{
//       position: 'relative',
//       alignSelf: 'stretch',
//       justifyContent: 'center'
//     },
//     visibilityBtn:{
//       position: 'absolute',
//       right: 3,
//       height: 40,
//       width: 35,
//       padding: 5
//     },
//     rememberForgotContainer:{
//       flexDirection:'row',
//       marginVertical:13,
//       alignItems:'center',
//       justifyContent:'space-between'
//     }
//   });