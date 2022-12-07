import { StyleSheet } from "react-native"
import { FONTS } from "../../constants/theme";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
         alignItems: 'center',
        backgroundColor: '#F5F7F9' 
    },
    item: {
      backgroundColor: '#f9c2ff',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    title: {
      fontSize: 32,
    },
    footer: {
        flex: 3,
        backgroundColor: '#a7ce51',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
        card:{
      backgroundColor:'white',
      margin:9,
      height:220,
      justifyContent: 'center',
      alignItems: 'center' ,
      paddingTop:40,
      elevation:5
    },
        image:{
      alignSelf:'center',
      height:50,
      width:50,
      resizeMode:'contain',
    },


    //FlatList Styles
    container1: {
      flex: 1,
      marginTop: 20,
      padding:5,

    },
    item: {
      padding: 10,
      marginVertical: 20,
      marginHorizontal: 3,
      borderRadius:18,
    },
    title: {
      fontSize:12,
      fontWeight:'bold'
    },


    //Shoadow Style for Cards 
    shadow: {
      shadowColor: '#000',
      shadowOffset: {
        width: 2,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.83,
      elevation: 3,
    },
});

export default styles