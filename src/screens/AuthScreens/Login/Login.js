import React, {useState, useContext} from 'react';
import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  View,
  Dimensions,
  SafeAreaView,
  Platform,
  TextInput,
  StatusBar,
  useWindowDimensions,
  Alert,
  ToastAndroid,
} from 'react-native';
import navigationStrings from '../../../constants/navigationStrings';
import FormInput from '../../../components/FormInput';
import styles from './Styles';
import ButtonComponent from '../../../components/ButtonComponent';
import {MaterialCommunityIcons} from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import {AuthContext} from '../Context';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DeviceInfo from 'react-native-device-info';

const {height, width} = Dimensions.get('window');

const Login = ({navigation}) => {
  const {width, height} = useWindowDimensions();
  // const [email, setEmail] = useState(null);
  // const [password, setPassword] = useState(null);
  const login = useContext(AuthContext);
  // const {isLoading, login} = useContext(AuthContext);
  const [data, setData] = React.useState({
    username: '',
    password: '',
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
  });

  const {signIn} = React.useContext(AuthContext);

  const textInputChange = val => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        username: val,
        check_textInputChange: true,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        username: val,
        check_textInputChange: false,
        isValidUser: false,
      });
    }
  };

  const handlePasswordChange = val => {
    if (val.trim().length >= 8) {
      setData({
        ...data,
        password: val,
        isValidPassword: true,
      });
    } else {
      setData({
        ...data,
        password: val,
        isValidPassword: false,
      });
    }
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const loginHandle = (userName, password) => {
    // console.log(userName);
    // console.log(password);
    let login = 'https://moneyfrog.in/api_controller/validation_login';
    // 'Content-Type': 'multipart/form-data'
    let formdata = new FormData();
    formdata.append('email', userName);
    formdata.append('pwd', password);

    const config = {
      headers: {
          'content-type': 'multipart/form-data'
      }
  }
    // Axios({
    //   method: Platform.OS=== 'ios' ? uriEndPoint.method.toLowerCase() : uriEndPoint.method,
    //   url: makeUrl({ ...uriEndPoint, pathParams, query }, hostUrl),
    //   headers: {
    //     ...hed,
    //     ...uriEndPoint.headerProps,
    //   },
    //   data: body || new FormData(),
    // })

     axios
      .post(login, formdata, config)
      .then(response => {
        let resp = response.data;
        let userId = response.data.id;
        let email = response.data.email_id;
        let userToken = response.data.login_token;
        let showMessage = response.data.show_message;
        //console.log('data 1 :', showMessage);
        let birth_date = response.data.birth_date;
        //console.log('data 2 :', birth_date);
        let password = response.data.password;
        // let user_image = resp.image_name;
        //console.log('data 3 :', user_image);
        let user_name = resp.name;
        //console.log('data 4 :', user_name);
        let phoneNumber = resp.phone_number;
        //console.log('data 5 :', phoneNumber);
        let showDashboard = resp.show_dashboard;
        //console.log('data 6 :', showDashboard);
        let subcriptionType = response.data.subscription_type;
        //console.log('data 7 :', subcriptionType);
       // console.log('data response :', resp);

        if (
          resp === 'Incorrect Email or Password' ||
          resp === 'You need to sign up first'
        ) {
          Alert.alert(
            'There is problem!',
            'Username or password is incorrect.',
            [{text: 'Okay'}],
          );
          return;
        }
        try {
           AsyncStorage.multiSet([
            ["birth_date", birth_date],
            ["userId", userId],
            ["email", email],
            // ["user_image", user_image] ,
            ["user_name", user_name] ,
            ["phoneNumber", phoneNumber] ,
            ["showDashboard", showDashboard] ,
            ["subcriptionType", subcriptionType] ,
            ["showMessage",showMessage]
          ])
          Alert.alert(
            'Attempting Successful Login'
          );
        } catch(e) {
          console.log(e);
        }
        // AsyncStorage.multiSet([
        //   ["userId", userId],
        //   ["email", email],
        //   ["user_image", user_image] ,
        //   ["user_name", user_name] ,
        //   ["phoneNumber", phoneNumber] ,
        //   ["showDashboard", showDashboard] ,
        //   ["subcriptionType", subcriptionType] ,
        //   ["showMessage",showMessage]
        // ])
        // Alert.alert(
        //   'Attempting Successful Login',ToastAndroid.SHORT,ToastAndroid.BOTTOM,
        // );
        update_user_id(userId, userToken);
        addDeviceDetails(userId);
        signIn(resp);
      })
      .catch(error => {
        console.log(error);
      });

    const update_user_id = (userId, userToken) => {
      //console.log('LoginToken', userToken);
      //        const fcmToken = await firebase.messaging().getToken();
      //             console.log('LoginScreeen FCM',fcmToken);
      // let device_api_level = apiLevel;
      let device_api_level = DeviceInfo.getApiLevel();
      //console.log('device_api_level',device_api_level);
      let brand = DeviceInfo.getBrand();
      let OSVersion = DeviceInfo.getSystemVersion();
      let model = DeviceInfo.getModel();
      let uuid = DeviceInfo.getUniqueId();
      let token_api =
        'https://moneyfrog.in/push_notification_controller/update_user_id?user_id=' +
        userId +
        '&uuid=' +
        uuid +
        '&login_token=' +
        userToken;
      //let token_api = 'https://moneyfrog.in/push_notification_controller/update_user_id?user_id='+userId+'&uuid='+uuid+'&login_token='+loginToken+'&token_no='+fcmToken+'&device_product='+brand+'&device_os_version='+OSVersion+'&device_name='+model+'&device_model='+model+'&device_api_level='+device_api_level+'&device_type='+"android";
     // console.log('Device Details token_api', token_api);
      axios.get(token_api)
        .then(response => {
          let resp = response.data;
          //console.warn('login token updated 1', resp);
          //console.warn('login token updated', resp.msg);
        })
        .catch(error =>
          console.error(
            'push notification update token error: ' + error.message,
          ),
        );
    };

    const addDeviceDetails = (user_id) => {
      //const fcmToken = await firebase.messaging().getToken();
       //console.log('AddDeviceDetails FCM Token:',fcmToken);
       let fcmToken;
      fcmToken = null;
       DeviceInfo.getApiLevel().then((a) => {
      let brand=DeviceInfo.getBrand();
      // console.warn("Device Brand", DeviceInfo.getBrand());  // e.g. Xiaomi

      let type=DeviceInfo.getSystemName();
      // console.warn("Device Name", DeviceInfo.getSystemName());  // e.g. iPhone ,Android

      let model=DeviceInfo.getModel();
       //console.warn("Device Model", DeviceInfo.getModel());  // e.g. Redmi Note 5 Pro

      let os_version=DeviceInfo.getSystemVersion();
     //  console.warn("Device Version", DeviceInfo.getSystemVersion());  // e.g. 9.0

      let uuid=DeviceInfo.getUniqueId();
      // console.warn("Device Unique ID", DeviceInfo.getUniqueId());  // e.g. FCDBD8EF-62FC-4ECB-B2F5-92C9E79AC7F9
      // console.warn('api lvl is:'+a);

      var formdata=new FormData();
      formdata.append("os_version",os_version);
      formdata.append("type",type);
      formdata.append("model",model);
      formdata.append("brand",brand);
      formdata.append("uuid",uuid);
      formdata.append("user_id",user_id);
      formdata.append("api_level",a);
      formdata.append("token_no",fcmToken);

      const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }

      let deviceDetails = 'https://moneyfrog.in/push_notification_controller/device_details';
      axios.post(deviceDetails,formdata, config)
      .then((response) => {
          let resp = response.data;
         // console.warn(resp.msg);
          // console.warn('Device Details Added Successfully',resp);
      })
      .catch((error) => console.error('device details api error: ' + error.message));

    });
}
    // if (data.username.length == 0 || data.password.length == 0) {
    //   Alert.alert(
    //     'Wrong Input!',
    //     'Username or password field cannot be empty.',
    //     [{text: 'Okay'}],
    //   );
    //   return;
    // }

    // if (data.length == 0) {
    //   Alert.alert('Invalid User!', 'Username or password is incorrect.', [
    //     {text: 'Okay'},
    //   ]);
    //   return;
    // }
    // signIn(foundUser);
    //signIn(username, password);
  };

  const handleValidUser = val => {
    if (val.trim().length > 4) {
      setData({
        ...data,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        isValidUser: false,
      });
    }
  };

  return (
    <View style={styles.container}>
      {/* <Spinner visible={isLoading} /> */}
      <StatusBar backgroundColor="#a7ce51" barStyle="light-content" />
      <View style={styles.header}>
        <Animatable.Image
          animation="bounceIn"
          source={require('../../../assets/Images/Login/moneyfrog_face.png')}
          style={{width: width - 40, height: height / 9.5}}
        />
      </View>
      <Animatable.View style={styles.footer} animation="fadeInUpBig">
        {/* <Text>{login}</Text> */}
        <Text style={[styles.text_footer, {marginTop: 5}]}>Email</Text>
        <View style={styles.action}>
          <FontAwesome name="user" color="#05375a" size={20} />
          <TextInput
            placeholder="Email"
            style={styles.textInput}
            // value={email}
            autoCapitalize="none"
            onChangeText={val => textInputChange(val)}
            // onChangeText={text => setEmail(text)}
            onEndEditing={e => handleValidUser(e.nativeEvent.text)}
          />
          {data.check_textInputChange ? (
            <Animatable.View animation="bounceIn">
              <Feather name="check-circle" color="green" size={20} />
            </Animatable.View>
          ) : null}
        </View>
        {data.isValidUser ? null : (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>
              Username must be 4 characters long
            </Text>
          </Animatable.View>
        )}

        <Text
          style={[
            styles.text_footer,
            {
              marginTop: 10,
            },
          ]}>
          Password
        </Text>
        <View style={styles.action}>
          <FontAwesome name="lock" color="#05375a" size={20} />
          <TextInput
            placeholder="Password"
            secureTextEntry={data.secureTextEntry ? true : false}
            style={styles.textInput}
            // value={password}
            autoCapitalize="none"
            onChangeText={val => handlePasswordChange(val)}
          />
          <TouchableOpacity onPress={updateSecureTextEntry}>
            {data.secureTextEntry ? (
              <Feather name="eye-off" color="grey" size={20} />
            ) : (
              <Feather name="eye" color="grey" size={20} />
            )}
          </TouchableOpacity>
        </View>
        {data.isValidPassword ? null : (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>
              Password must be atleast 8 characters long
            </Text>
          </Animatable.View>
        )}

        <TouchableOpacity
          onPress={() => {
            loginHandle(data.username, data.password);
          }}>
          <View style={styles.button}>
            <LinearGradient
              colors={['#74b72e', '#a7ce51']}
              style={styles.signIn}>
              <Text style={[styles.textSign, {color: '#fff'}]}>Sign In</Text>
            </LinearGradient>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(navigationStrings.SIGNUP);
          }}
          style={[
            styles.signIn,
            {
              borderColor: '#74b72e',
              borderWidth: 1,
              marginTop: 10,
            },
          ]}>
          <Text
            style={[
              styles.textSign,
              {
                color: '#74b72e',
              },
            ]}>
            Register
          </Text>
        </TouchableOpacity>
        <View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(navigationStrings.CHANGEPASSWORD);
            }}
            style={[
              styles.signIn,
              {
                borderWidth: 0,
                marginTop: 10,
              },
            ]}>
            <Text
              style={[
                styles.textSign,
                {
                  color: '#74b72e',
                },
              ]}>
              {' '}
              Forget Password ?
            </Text>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
};

export default Login;

//  /validation_login
