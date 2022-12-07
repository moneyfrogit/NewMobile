import React, {useState, useContext} from 'react';
import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  View,
  Linking,
  Dimensions,
  SafeAreaView,
  Platform,
  TextInput,
  StatusBar,
  ScrollView,
  SectionList,
} from 'react-native';
import navigationStrings from '../../../constants/navigationStrings';
import FormInput from '../../../components/FormInput';
import styles from './Styles';
import ButtonComponent from '../../../components/ButtonComponent';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Zocial from 'react-native-vector-icons/Zocial';
import {AuthContext} from '../Context';
import {Colors, RadioButton} from 'react-native-paper';
import appTheme, {FONTS} from '../../../constants/theme';

const {height, width} = Dimensions.get('window');

const SignUp = ({navigation}) => {
  const Terms = 'https://moneyfrog.in/home/mob_terms_n_condition';
  const Policy = 'https://moneyfrog.in/privacy';

  const [data, setData] = React.useState({
    email: '',
    password: '',
    check_textInputChange: false,
    check_emailInputChange: false,
    check_mobileInputChange: false,
    check_cityInputChange: false,
    secureTextEntry: true,
  });
  const val = useContext(AuthContext);
  const [checked, setChecked] = React.useState('first');

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

  const emailInputChange = val => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        username: val,
        check_emailInputChange: true,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        username: val,
        check_emailInputChange: false,
        isValidUser: false,
      });
    }
  };

  const mobileInputChange = val => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        username: val,
        check_mobileInputChange: true,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        username: val,
        check_mobileInputChange: false,
        isValidUser: false,
      });
    }
  };

  const cityInputChange = val => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        username: val,
        check_cityInputChange: true,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        username: val,
        check_cityInputChange: false,
        isValidUser: false,
      });
    }
  };

  const handlePasswordChange = val => {
    setData({
      ...data,
      password: val,
    });
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#a7ce51" barStyle="light-content" />
      <View
        style={[
          styles.header,
          // {
          //   height:height
          // }
        ]}>
        <Animatable.Image
          animation="bounceIn"
          source={require('../../../assets/Images/Login/moneyfrog_face.png')}
          style={{width: width - 40, height: height / 9.5}}
        />
      </View>
     
        <Animatable.View
          style={[
            styles.footer,
            {
              width: width,
              height: height,
            },
          ]}
          animation="fadeInUpBig"
          backgroundColor="#a7ce51">
          {/* <View style={{flexDirection:'row'}}>
        <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
        <Text style={{...FONTS.h3, marginRight:10}}>Indian</Text>
        <View style={{backgroundColor:'lightgrey', margin:1, borderRadius:15, marginRight:10}}>
      <RadioButton
         color='black'
        uncheckedColor="black"
        value="first"
        status={ checked === 'first' ? 'checked' : 'unchecked' }
        onPress={() => setChecked('first')}
      /></View></View>
       <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
              <Text>NRI</Text>
      <RadioButton
               color='#a7ce51'
               uncheckedColor="black"
        value="second"
        status={ checked === 'second' ? 'checked' : 'unchecked' }
        onPress={() => setChecked('second')}
      /></View>
    </View> */}
           <ScrollView>
          <Text style={styles.text_footer}>Name</Text>
          {/* <Text>{val}</Text> */}
          <View style={styles.action}>
            <FontAwesome name="user" color="#05375a" size={20} />
            <TextInput
              placeholder="Your Name"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={val => textInputChange(val)}
            />
            {data.check_textInputChange ? (
              <Animatable.View animation="bounceIn">
                <Feather name="check-circle" color="green" size={20} />
              </Animatable.View>
            ) : null}
          </View>

          <Text
            style={[
              styles.text_footer,
              {
                marginTop: 5,
              },
            ]}>
            Email
          </Text>
          <View style={styles.action}>
            <Zocial name="email" color="#05375a" size={20} />
            <TextInput
              placeholder="Your Email"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={val => emailInputChange(val)}
            />
            {data.check_emailInputChange ? (
              <Animatable.View animation="bounceIn">
                <Feather name="check-circle" color="green" size={20} />
              </Animatable.View>
            ) : null}
          </View>

          <Text
            style={[
              styles.text_footer,
              {
                marginTop: 5,
              },
            ]}>
            Mobile Number
          </Text>
          <View style={styles.action}>
            <FontAwesome5 name="mobile-alt" color="#05375a" size={24} />
            <TextInput
              placeholder="Mobile Number"
              style={styles.textInput}
              keyboardType="number-pad"
              onChangeText={val => mobileInputChange(val)}
            />
            {data.check_mobileInputChange ? (
              <Animatable.View animation="bounceIn">
                <Feather name="check-circle" color="green" size={20} />
              </Animatable.View>
            ) : null}
          </View>

          <Text
            style={[
              styles.text_footer,
              {
                marginTop: 5,
              },
            ]}>
            City
          </Text>
          <View style={styles.action}>
            <FontAwesome5 name="city" color="#05375a" size={17} />
            <TextInput
              placeholder="City"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={val => cityInputChange(val)}
            />
            {data.check_cityInputChange ? (
              <Animatable.View animation="bounceIn">
                <Feather name="check-circle" color="green" size={20} />
              </Animatable.View>
            ) : null}
          </View>

          <Text
            style={[
              styles.text_footer,
              {
                marginTop: 5,
              },
            ]}>
            Password
          </Text>
          <View style={styles.action}>
            <FontAwesome name="lock" color="#05375a" size={24} />
            <TextInput
              placeholder="Password"
              secureTextEntry={data.secureTextEntry ? true : false}
              style={styles.textInput}
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
          <TouchableOpacity 
          onPress={() => {
            register(   
              username,
              email,
              contact_number,
              city,
              password,
              captcha,
              registered_thru,);
          }}
          >
          <View style={styles.button}>
            <LinearGradient
              colors={['#74b72e', '#a7ce51']}
              style={styles.signIn}>
              <Text style={[styles.textSign, {color: '#fff'}]}>Register</Text>
            </LinearGradient>
          </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(navigationStrings.LOGIN);
            }}
            style={[
              styles.signIn,
              {
                borderColor: '#74b72e',
                borderWidth: 2,
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
              Sign In
            </Text>
          </TouchableOpacity>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              paddingTop: 10,
            }}>
            <Text>I agree to</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(navigationStrings.TERMSNCONDITIONS);
              }}>
              <Text
                style={{color: '#028a0f', fontWeight: 'bold', marginLeft: 10}}>
                Terms & Conditions{' '}
              </Text>
            </TouchableOpacity>
            <Text style={{marginLeft: 5}}>and</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(navigationStrings.PRIVACYPOLICY);
              }}>
              <Text
                style={{color: '#03c04a', fontWeight: 'bold', marginLeft: 10}}>
                Privacy Policy
              </Text>
            </TouchableOpacity>
          </View>
          </ScrollView>
        </Animatable.View>
     
    </View>
  );
};

export default SignUp;

// <!-- sample html for this button-->
// <link rel="stylesheet" type="text/css" href="//loading.io/css/loading.css"/>
// <link rel="stylesheet" type="text/css" href="//loading.io/css/loading-btn.css"/>
// <!-- sample html for this button-->
// <div class="button running ld ld-ext-right">
//   <div class="ld ld-ring ld-spin"></div>
//   SIGN UP
//   <div></div>
// </div>
// <!-- stylesheet for this button -->
// <style type="text/css">
//   .button {
//     backface-visibility: hidden;
//   position: relative;
//   cursor: pointer;
//   display: inline-block;
//   white-space: nowrap;
//   background: linear-gradient(180deg,#d1fb83 0%,#c8f574 100%,#000000 100%,#000000 100%,#addc65 100%,#000000 100%,#000000 100%,#000000 100%,#8cc 100%);
//   border-radius: 5px;
//   border: 1px solid #9ee175;
//   border-width: 1px 1px 1px 1px;
//   padding: 10px 20px 10px 20px;
//   box-shadow: inset 0px 1px 0px rgba(255,255,255,1),0px 1px 3px rgba(0,0,0,0.3);
//     color: #fff;
//   font-size: 20px;
//   font-family: arial;
//   font-weight: 900;
//   font-style: normal;
//   text-shadow: 0px -1px 0px rgba(0,0,0,0.4)
//   }
//   .button > div {
//     color: #999;
//   font-size: 10px;
//   font-family: Helvetica Neue;
//   font-weight: initial;
//   font-style: normal;
//   text-align: center;
//   margin: 0px 0px 0px 0px
//   }
//   .button > i {
//     font-size: 1em;
//   border-radius: 0px;
//   border: 0px solid transparent;
//   border-width: 0px 0px 0px 0px;
//   padding: 0px 0px 0px 0px;
//   margin: 0px 0px 0px 0px;
//   position: static
//   }
//   .button > .ld {
//     color: #ffffff;
//   font-size: 20px
//   }
// </style>