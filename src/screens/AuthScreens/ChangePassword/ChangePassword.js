import React, {useState} from 'react';
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
} from 'react-native';
import navigationStrings from '../../../constants/navigationStrings';
import FormInput from '../../../components/FormInput';
import styles from './Styles';
import ButtonComponent from '../../../components/ButtonComponent';
import {MaterialCommunityIcons} from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';

const {height, width} = Dimensions.get('window');

const Login = ({navigation}) => {
      const [data, setData] = React.useState({
        email: '',
        password: '',
        check_textInputChange: false,
        check_mobileInputChange: false,
        secureTextEntry: true
      });

      const textInputChange = (val) => {
        if (val.trim().length >= 4) {
          setData({
            ...data,
            username: val,
            check_textInputChange: true,
            isValidUser: true
        });
      } else {
        setData({
          ...data,
          username: val,
          check_textInputChange: false,
          isValidUser: false
      });

      }}


      const mobileInputChange = (val) => {
        if (val.trim().length >= 4) {
          setData({
            ...data,
            username: val,
            check_mobileInputChange: true,
            isValidUser: true
        });
      } else {
        setData({
          ...data,
          username: val,
          check_mobileInputChange: false,
          isValidUser: false
      });

      }}



  return (
    <View style={styles.container}>
      <StatusBar backgroundColor='#009387' barStyle="light-content"/>
      <View style={styles.header}>
        <Animatable.Image
          animation="bounceIn"
          source={require('../../../assets/Images/Login/moneyfrog_face.png')}
          style={{width: width-40, height: height/9.5}}
        />
      </View>
      <Animatable.View style={[styles.footer,            {
              width: width,
              height: height,
            },]} animation="fadeInUpBig">

      <View style={[styles.signIn, {
                    borderWidth: 0,
                    marginTop: 10,
                  }]}
          >
            <Text style={[styles.textSign,{
            color:'#74b72e'
          }]}> Forget your password ?</Text>


                      <Text style={{
            color:"grey",
            flexDirection:'row',
            marginTop: 10
          }}>Enter your Registered email and mobile number below to reset password</Text>
        </View>


        <Text style={[
            styles.text_footer,
            {
              marginTop: 25,
            },
          ]}>Email</Text>
        <View style={styles.action}>
          <FontAwesome name="user" color="#05375a" size={20} />
          <TextInput
            placeholder="Email"
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(val)=>textInputChange(val)}
          />
                    {data.check_textInputChange ?
          <Animatable.View 
          animation="bounceIn"
          >
          <Feather name="check-circle" color="green" size={20} 
          />
          </Animatable.View>
           : null}
          </View>


        <Text style={[
            styles.text_footer,
            {
              marginTop: 5,
            },
          ]}>Mobile Number</Text>
        <View style={styles.action}>
          <FontAwesome5 name="mobile-alt" color="#05375a" size={20} />
          <TextInput
            placeholder="Email"
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(val)=>mobileInputChange(val)}
          />
                    {data.check_mobileInputChange ?
          <Animatable.View 
          animation="bounceIn"
          >
          <Feather name="check-circle" color="green" size={20} 
          />
          </Animatable.View>
           : null}
        </View>
 
        
        <View style={styles.button}> 
              <LinearGradient
                colors={['#74b72e', '#a7ce51']}
                style={styles.signIn}
              >
                <Text style={[styles.textSign,{color:'#fff'}]}>Next</Text>
              </LinearGradient>
        </View>

        <TouchableOpacity
        onPress={() => {
          navigation.navigate(navigationStrings.LOGIN);
        }}
        style={[styles.signIn, {
          borderColor:'#74b72e',
          borderWidth: 1,
          marginTop: 15,
        }]}
        >
          <Text style={[styles.textSign,{
            color:'#74b72e'
          }]}>Sign In</Text>
        </TouchableOpacity>

      </Animatable.View>
    </View>
  );
};

export default Login;





// import {
//   Button,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   Image,
//   View,
//   SafeAreaView,
//   TextInput,
// } from 'react-native';
// import React from 'react';
// import navigationStrings from '../../../constants/navigationStrings';
// import FormInput from '../../../components/FormInput';
// import imagePath from '../../../constants/imagePath';
// import styles from './Styles';
// import {windowWidth, windowHeight} from '../../../utils/Dimentions';
// import ButtonComponent from '../../../components/ButtonComponent';
// import FormButton from '../../../components/FormButton';

// const ChangePassword = ({navigation}) => {
//   return (
//     <SafeAreaView>
//       <View style={styles.container}>
//         <Image
//           source={require('../../../assets/Images/Login/bg_login.png')}
//           style={{transform: [{rotate: '10deg'}]}}
//         />
//         <Image
//           source={require('../../../assets/Images/Login/android_app_logo.png')}
//           style={{marginTop: 30, width: 300, height: 40}}
//         />
//       </View>
//       <View>
//         <Text style={{fontWeight:'bold', justifyContent:'center'}}>Forget your password?</Text>
//         <Text>Enter your registered email and mobile number below to reset your password</Text>
//         <FormInput
//           placeholderText="Email ID"
//           keyboardType="email-address"
//           autoCapitalize="none"
//           autoCorrect={false}
//           iconType="mail"
//         />
//         <FormInput placeholderText="Mobile Number" iconType="mobile1"/>
//       </View>

//       <View>
//         <ButtonComponent
//           btnText="Next"
//           onPress={() => alert('Next Clicked')}
//         />
//       </View>
//     </SafeAreaView>
//   );
// };

// export default ChangePassword;



