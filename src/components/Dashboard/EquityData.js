import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {Card} from 'react-native-paper';
import {FONTS, COLORS, SIZES} from '../../constants/theme';
import {amountToText} from '../../utils/Amounts';
import imagePath from '../../constants/imagePath';

const EquityData = ({navigation, route}) => {
  const [userID, setUserID] = useState('');
  const [userToken, setUserToken] = useState('');
  const [text, setText] = useState('');
  const [state, setState] = useState({data: [], loading: false}); // only one data source
  const {data, loading} = state;

  const fetchAPI = async () => {
    try {
      const userID = await AsyncStorage.getItem('userId');
      // setUserID(userID);
      // console.log(userID);
      const userToken = await AsyncStorage.getItem('userToken');
      //setUserToken(userToken);
      // console.log(userToken);
      setState({data: [], loading: true});
      axios
        .get(
          'https://moneyfrog.in/financial-page-api/' +
            userID +
            '/equity?login_token=' +
            userToken,
        )
        .then(response => response.data.equity)
        .then(data => {
          //console.log(data);
          setState({data, loading: false}); // set only data
         // console.log('the Equity data', data)
        })
        .catch(function (error) {
          // handle error
          if (error.response === '1') {
            console.log('Error in fetching Equities', response.error);
          }
          // console.log(error);
        })
        .then(function () {
          // always executed
          //setMutualFundsData(mf);
          //setIsLoading(false);
        });
    } catch (err) {
      console.log(err);
    }
  };

  //console.log('print data', data);
  let assets = '';
  let totalbuyValue = 0;
  let totalcurrentValue = 0;
  let gainLoss = 0;
  let absoluteReturns = 0;
  {
    data &&
      data.map((value, index, array) => {
        totalbuyValue += parseFloat(value.purchase_price);
        totalcurrentValue += parseFloat(value.current_value);
        // console.log(value.asset_type);
        // assets = value.asset_type;
        // console.log(assets);
      });
    gainLoss = totalcurrentValue - totalbuyValue;
  }
  absoluteReturns = parseFloat((gainLoss / totalbuyValue) * 100).toFixed(2);

  // console.log('totalbuyValue', totalbuyValue);
  // console.log('gainLoss', gainLoss);
  // console.log('totalcurrentValue', totalcurrentValue);
  // console.log('absolute Returns', absoluteReturns);

  useEffect(() => {
    fetchAPI();
  }, []); // use `[]` to avoid multiple side effect
  return (
    // <View>
    //   <Card
    //     style={{
    //       width: 300,
    //       height: 180,
    //       borderRadius: 5,
    //       backgroundColor: COLORS.white,
    //       padding: 10,
    //       ...styles.shadow,
    //     }}>
    //     <View
    //       style={{
    //         flexDirection: 'row',
    //         marginTop: SIZES.padding,
    //         alignItems: 'center',
    //         marginTop: 10,
    //         marginLeft: 5,
    //       }}>
    //       <View
    //         style={{
    //           backgroundColor: COLORS.lightGray2,
    //           height: 40,
    //           width: 40,
    //           borderRadius: 10,
    //           justifyContent: 'center',
    //           alignItems: 'center',
    //         }}>
    //         <Image
    //           source={require('../../assets/Images/Networth/ic_equity.png')}
    //           style={{
    //             width: 25,
    //             height: 25,
    //           }}
    //         />
    //       </View>
    //       <View style={{marginLeft: SIZES.padding, flexDirection: 'row'}}>
    //         <Text
    //           style={{
    //             color: COLORS.black,
    //             ...FONTS.h3,
    //             fontWeight: 'bold',
    //           }}>
    //           Equity
    //         </Text>
    //       </View>
    //     </View>
    //     <View style={{margin: 1}}>
    //       <View
    //         style={{
    //           flexDirection: 'row',
    //           justifyContent: 'space-between',
    //         }}>
    //         <View>
    //           <Text style={{...FONTS.body4, color: COLORS.darkgray}}>
    //             Invested Value
    //           </Text>
    //           <Text style={{...FONTS.body3}}>
    //             {'\u20B9'} {amountToText(totalbuyValue)}
    //           </Text>
    //         </View>
    //         <View>
    //           <Text
    //             style={{
    //               ...FONTS.body4,
    //               color: COLORS.darkGray,
    //               marginRight: 15,
    //             }}>
    //             Current Value
    //           </Text>
    //           <Text style={{...FONTS.body3}}>
    //             {'\u20B9'} {amountToText(totalcurrentValue)}
    //           </Text>
    //         </View>
    //       </View>
    //       <View
    //         style={{
    //           flexDirection: 'row',
    //           justifyContent: 'space-between',
    //         }}>
    //         <View>
    //           <Text
    //             style={{
    //               ...FONTS.body4,
    //               color: COLORS.red,
    //               marginTop: 10,
    //             }}>
    //             Loss
    //           </Text>
    //           <Text style={{...FONTS.body3}}>
    //             {'\u20B9'} {amountToText(gainLoss)}
    //           </Text>
    //         </View>
    //         <View style={{justifyContent: 'center'}}>
    //           <Text
    //             style={{
    //               ...FONTS.body4,
    //               color: COLORS.darkGray,
    //               marginTop: 10,
    //             }}>
    //             Annual Returns
    //           </Text>
    //           <Text style={{...FONTS.body3, color: COLORS.black}}>
    //             {' '}
    //             {absoluteReturns} %
    //           </Text>
    //         </View>
    //       </View>
    //     </View>
    //   </Card>
    // </View>

    <View
      style={{
        width: '95%',
        height: 180,
        // margin: 5,
        marginLeft: 10,
        // paddingHorizontal: 5,
        // paddingVertical: SIZES.padding - 12,
        borderRadius: 5,
        // backgroundColor: COLORS.white,
      }}>
      {/* <TouchableOpacity
  style={{
    flex: 1,
    // flexDirection: 'row',
    margin: 5,
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.padding - 12,
    borderRadius: 5,
    backgroundColor: COLORS.white,
    ...styles.shadow,
  }}
  onPress={() => console.log('hey')}> */}
      <View
        style={{
          flex: 1,
          // flexDirection: 'row',
          margin: 5,
          paddingHorizontal: SIZES.padding,
          paddingVertical: SIZES.padding - 12,
          borderRadius: 5,
          backgroundColor: COLORS.white,
          ...styles.shadow,
        }}>
        <View
          style={{
            flexDirection: 'row',
            marginBottom: 5,
          }}>
          <View
            style={{
              backgroundColor: COLORS.lightGrey2,
              height: 35,
              width: 35,
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={require('../../assets/Images/Networth/ic_equity.png')}
              style={{
                width: 25,
                height: 25,
                tintColor:COLORS.peach
              }}
            />
          </View>
          <Text
            style={{
              marginLeft: SIZES.base,
              color: COLORS.peach,
              ...FONTS.h3,
              marginLeft: 20,
              fontWeight: 'bold',
              marginLeft: SIZES.padding,
              marginTop: 5,
            }}>
            EQUITY
          </Text>
        </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems:'center',
              marginHorizontal:20
            }}>

            <View  style={{justifyContent: 'center', alignItems:'center'}}>
              <Text style={{...FONTS.body4, color: COLORS.black}}>
               INVESTED VALUE
              </Text>
              <Text style={{...FONTS.body3, fontWeight:'bold', color: COLORS.black}}>
                {'\u20B9'} {amountToText(totalbuyValue)}
              </Text>
            </View>

            <View  style={{justifyContent: 'center', alignItems:'center'}}>
              <Text
                style={{
                  ...FONTS.body4,
                  color: COLORS.black,
                  marginRight: 15,
                }}>
                CURRENT VALUE
              </Text>
              <Text style={{...FONTS.body3, fontWeight:'bold', color: COLORS.black}}>
                {'\u20B9'} {amountToText(totalcurrentValue)}
              </Text>
            </View>
            
          </View>
          
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems:'center',
               marginHorizontal:10
            }}>
            <View  style={{justifyContent: 'center', alignItems:'center'}}>
              <Text
                style={{
                  ...FONTS.body4,
                  color: COLORS.black,
                  marginTop: 10,
                }}>
                GAIN
              </Text>
              <Text style={{...FONTS.body3, fontWeight:'bold', color: COLORS.black}}>
                {'\u20B9'} {amountToText(gainLoss)}
              </Text>
            </View>
            <View style={{justifyContent: 'center', alignItems:'center'}}>
              <Text
                style={{
                  ...FONTS.body4,
                  color: COLORS.black,
                  marginTop: 10,
                }}>
               ABS %
              </Text>
              <Text style={{...FONTS.body3, color: COLORS.black, fontWeight:'bold',}}>
                {absoluteReturns} %
              </Text>
            </View>
          </View>

      </View>
      {/* </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
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

export default EquityData;
