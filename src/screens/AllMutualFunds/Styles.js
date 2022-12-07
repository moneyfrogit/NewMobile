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
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
        width: 2,
        height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
}
});


// import React, {useState, useEffect} from "react"
// import { ActivityIndicator, Alert, FlatList, Text, StyleSheet, View, TextInput } from 'react-native';

// export default function ABCDEE(){


//   const [arrayholder,setArrayholder] =useState([])
//   const[text, setText] = useState('')
//   const[data, setData] = useState([])
//   const [loading , setLoading] = useState(true)

//   const fetchAPI = ()=> {
//     return fetch('https://api.covid19api.com/countries')
//     .then((response) => response.json())
//     .then((responseJson) => {
//         setData(responseJson)
//         setLoading(false)
//         setArrayholder(responseJson)
//     }

//     )
//     .catch((error) => {
//         console.error(error);
//       });
// }

//   useEffect(() => {
//     fetchAPI();
//   },[])


//   const searchData= (text)=>  {
//     const newData = arrayholder.filter(item => {
//       const itemData = item.Country.toUpperCase();
//       const textData = text.toUpperCase();
//       return itemData.indexOf(textData) > -1
//     });

//       setData(newData)
//       setText(text)
//     }

//    const itemSeparator = () => {
//       return (
//         <View
//           style={{
//             height: .5,
//             width: "100%",
//             backgroundColor: "#000",
//           }}
//         />
//       );
//     }

//       return (
//           <View style={{flex:1}} >
//     {loading === false ?  
//         <View style={styles.MainContainer}>

//         <TextInput 
//          style={styles.textInput}
//          onChangeText={(text) => searchData(text)}
//          value={text}
//          underlineColorAndroid='transparent'
//          placeholder="Search Here" />

//         <FlatList
//           data={data}
//           keyExtractor={ (item, index) => index.toString() }
//           ItemSeparatorComponent={itemSeparator}
//           renderItem={( {item}  ) => <Text style={styles.row}
//            >{item.Country}</Text>}
//           style={{ marginTop: 10 }} />

//       </View>
//       : <Text>loading</Text>}

//       </View>
//     );
//   }


// const styles = StyleSheet.create({

//   MainContainer: {
//     paddingTop: 50,
//     justifyContent: 'center',
//     flex: 1,
//     margin: 5,

//   },

//   row: {
//     fontSize: 18,
//     padding: 12
//   },

//   textInput: {

//     textAlign: 'center',
//     height: 42,
//     borderWidth: 1,
//     borderColor: '#009688',
//     borderRadius: 8,
//     backgroundColor: "#FFFF"

//   }
// });