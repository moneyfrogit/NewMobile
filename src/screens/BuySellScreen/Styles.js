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



        {/* <Card
          style={{
            width: 350,
            height: 200,
            borderRadius: 10,
            marginLeft: 20,
            marginTop: 20,
            backgroundColor: COLORS.white,
            padding: 20,
            ...styles.shadow,
          }}>
          <View
            style={{
              flexDirection: 'row',
              marginTop: SIZES.padding,
              alignItems: 'center',
              marginTop: 5,
              marginLeft: 5,
            }}>
            <View
              style={{
                backgroundColor: COLORS.lightGray2,
                height: 38,
                width: 40,
                borderRadius: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={require('../../assets/Images/Networth/ic_mutual_funds.png')}
                style={{
                  width: 25,
                  height: 25,
                }}
              />
            </View>
            <View style={{marginLeft: SIZES.padding, flexDirection: 'row'}}>
              <Text
                style={{
                  color: COLORS.main,
                  ...FONTS.h3,
                  fontWeight: 'bold',
                }}>
                Mutual Funds
              </Text>
            </View>
          </View>
          <View style={{margin: 1}}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View>
                <Text style={{...FONTS.body4, color: COLORS.darkgray}}>
                  Invested Value
                </Text>
                <Text style={{...FONTS.body3, color: COLORS.main}}>
                  {'\u20B9'} 54.81L
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    ...FONTS.body4,
                    color: COLORS.main,
                    marginRight: 15,
                  }}>
                  Current Value
                </Text>
                <Text style={{...FONTS.body3}}>{'\u20B9'} 56.41L</Text>
              </View>
            </View>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View>
                <Text
                  style={{
                    ...FONTS.body4,
                    color: COLORS.darkgray,
                    marginTop: 10,
                  }}>
                  Gain
                </Text>
                <Text style={{...FONTS.body3}}>{'\u20B9'} 1.6L</Text>
              </View>
              <View style={{justifyContent: 'center'}}>
                <Text
                  style={{
                    ...FONTS.body4,
                    color: COLORS.darkgray,
                    marginTop: 10,
                  }}>
                  Annual Returns
                </Text>
                <Text style={{...FONTS.body3}}> 10.13 %</Text>
              </View>
            </View>
          </View>
        </Card> */}