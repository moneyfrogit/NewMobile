import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#a7ce51',
  },
  header: {
      flex: 1,
      justifyContent: 'flex-end',
      paddingHorizontal: 20,
      paddingBottom: 50
  },
  footer: {
      flex: 3,
      backgroundColor: '#fff',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingHorizontal: 20,
      paddingVertical: 30
  },
  text_header: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 30
  },
  text_footer: {
      color: '#05375a',
      fontSize: 18
  },
//   logo: {
//     width: height_logo,
//     height: height_logo
// },
  action: {
      flexDirection: 'row',
      marginTop: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#f2f2f2',
      paddingBottom: 5
  },
  actionError: {
      flexDirection: 'row',
      marginTop: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#FF0000',
      paddingBottom: 5
  },
  textInput: {
      flex: 1,
      marginTop: Platform.OS === 'ios' ? 0 : -12,
      paddingLeft: 10,
      color: '#05375a',
  },
  errorMsg: {
      color: '#FF0000',
      fontSize: 14,
  },
  button: {
      alignItems: 'center',
      marginTop: 50
  },
  signIn: {
      width: '100%',
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10
  },
  textSign: {
      fontSize: 18,
      fontWeight: 'bold'
  }
});





// const styles = StyleSheet.create({
//   Pcontainer: {
//     paddingHorizontal: 12
//   },
//   eyeContainer:{
//     backgroundColor: 'white',
//     width: '100%',
//     borderRadius: 8,
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderWidth: 4,
//     borderColor: '#d7d7d7'
//   },
//   container: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//     paddingTop: 0,
//     marginTop: -110,
//   },
//   logo: {
//     height: 150,
//     width: 150,
//     resizeMode: 'cover',
//   },
//   text: {
//     fontFamily: 'Kufam-SemiBoldItalic',
//     fontSize: 28,
//     marginBottom: 10,
//     color: '#051d5f',
//   },
//   navButton: {
//     marginTop: 15,
//   },
//   forgotButton: {
//     marginVertical: 35,
//   },
//   navButtonText: {
//     fontSize: 18,
//     fontWeight: '500',
//     color: '#2e64e5',
//     fontFamily: 'Lato-Regular',
//   },
// });

export default styles;



{
  /* <SafeAreaView> */
}
{
  /* <View style={styles.container}>
  <Image
    source={require('../../../assets/Images/Login/bg_login.png')}
    style={{transform: [{rotate: '10deg'}]}}
  />
  <Image
    source={require('../../../assets/Images/Login/android_app_logo.png')}
    style={{marginTop: 30, width: 300, height: 40}}
  />
</View> */
}

{
  /* <View>
  <FormInput
    placeholderText="Username"
    keyboardType="email-address"
    autoCapitalize="none"
    autoCorrect={false}
    iconType="user"
  />
  <FormInput 
    placeholderText="Password"
    secureTextEntry={passwordVisibility} 
    iconType="lock"
    // right={<TextInput.Icon name={passwordVisibility ? "eye" : "eye-off"} onPress={() => setPasswordVisibility(!passwordVisibility)} />}
    />
</View>

<View>
  <ButtonComponent
    btnText="Login"
    onPress={() => alert('Login Clicked')}
  />
</View> 
<View>
  <ButtonComponent
    btnText="Create Account"
    onPress={() => {
      navigation.navigate(navigationStrings.SIGNUP);
    }}
  />
</View>
<View style={{paddingTop:10}}>
<TouchableOpacity style={{justifyContent:'center'}}
  onPress={() => {
    navigation.navigate(navigationStrings.CHANGEPASSWORD);
  }}>
  <Text style={{color:'#a7ce51', fontWeight:'bold'}}>Forget Password</Text>
</TouchableOpacity>
</View> */
}

{
  /* </SafeAreaView> */
}
