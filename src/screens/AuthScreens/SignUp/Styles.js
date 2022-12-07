import { StyleSheet, Dimensions } from "react-native"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#a7ce51'
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
      paddingVertical: 30,
  },
  text_header: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 30
  },
  text_footer: {
      color: '#05375a',
      fontSize: 14,
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
      fontSize:12
  },
  errorMsg: {
      color: '#FF0000',
      fontSize: 14,
  },
  button: {
      alignItems: 'center',
      marginTop: 20
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
//     container: {
//         justifyContent: 'center',
//         alignItems: 'center',
//         padding: 20,
//         paddingTop: 0,
//         marginTop: -110
//       },
//       logo: {
//         height: 150,
//         width: 150,
//         resizeMode: 'cover',
//       },
//       text: {
//         fontFamily: 'Kufam-SemiBoldItalic',
//         fontSize: 28,
//         marginBottom: 10,
//         color: '#051d5f',
//       },
//       navButton: {
//         marginTop: 15,
//       },
//       forgotButton: {
//         marginVertical: 35,
//       },
//       navButtonText: {
//         fontSize: 18,
//         fontWeight: '500',
//         color: '#2e64e5',
//         fontFamily: 'Lato-Regular',
//       },
// });

export default styles