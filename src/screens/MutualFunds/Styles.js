import { StyleSheet } from "react-native"
import { COLORS } from "../../constants/theme";

const styles = StyleSheet.create({
    container: {
      flex: 1,  
      paddingTop: 10, 
      margin: 0,
      backgroundColor:COLORS.lightGrey  
    },
    scrollText: {            
      fontSize: 19,
      textAlign: 'center',
      padding: 20,
      color: '#000'
    },
      title: {
        fontSize: 20,
        fontWeight: "bold",
      },
      text: {
        fontSize: 16,
        fontWeight: "400",
        textAlign: "center",
      },
      separator: {
        marginVertical: 30,
        height: 1,
        width: "80%",
      },
      listItemContainer:{
        flexDirection : 'row', 
        paddingTop: 10, 
        paddingBottom: 10,
        paddingLeft: 5,
        paddingRight: 5,
        justifyContent: 'space-between',
        alignItems:'center',
        borderBottomColor:'lightgrey',
        borderBottomWidth:1
      },      itemtext: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
      itemVal :{
        fontSize: 14,
        color: 'black',
        fontFamily : 'Lato-Regular'
      },
     listIteemContainer:{
      flexDirection : 'row', 
      paddingTop: 12, 
      paddingBottom: 12,
      paddingLeft: 3,
      paddingRight: 3,
      justifyContent: 'space-between',
      alignItems:'center',
      borderBottomColor:'lightgrey',
      borderBottomWidth:1,
    },
      itemtext: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
      itemVal :{
        fontSize: 16,
        color: 'black',
        // fontFamily : 'Lato-Regular'
      },
      fixedHeader:{
        fontSize: 13,
        color: '#777',
        // fontFamily : 'Lato-Regular'
      }
});

export default styles