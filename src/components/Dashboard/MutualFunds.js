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
import qs from 'qs';
import imagePath from '../../constants/imagePath';

const MUtualFundsData = ({navigation, route}) => {
  const [userID, setUserID] = useState('');
  const [userToken, setUserToken] = useState('');
  const [text, setText] = useState('');
  const [state, setState] = useState({data: [], loading: false}); // only one data source
  const [mutualFunds, setMutualFunds] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [annualReturns, setAnnualReturns] = useState('');

  
  const MFData = async () => {
    try {
      const userID = await AsyncStorage.getItem('userId');
      setUserID(userID);
      const userToken = await AsyncStorage.getItem('userToken');
      setUserToken(userToken);

      setIsLoading(true);
      axios
        .get(
          'https://moneyfrog.in/financial-page-api/' +
            userID +
            '/mutual_funds?login_token=' +
            userToken,
        )
        .then(function (response) {
          // setMutualFunds(response);
          // setMutualFundsData(response.data.mutual_funds);
          // console.log('mf',mutualFunds);
          setMutualFunds(response.data.mutual_funds);
          // console.log('mut fund', response.data.mutual_funds);
          setIsLoading(false);
        })
        .catch(function (error) {
          // handle error
          if (error.response === '1') {
            console.log('mutual fund summary error 1', response.error);
          } else if (error.response === '0') {
            console.log('mutual fund summary error 0');
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

  const AnnualRet = async () => {
    try {
      const userID = await AsyncStorage.getItem('userId');
      setUserID(userID);
      const userToken = await AsyncStorage.getItem('userToken');
      setUserToken(userToken);
      const anuualReturnsUrl = 'https://moneyfrog.in/get-xirr';
      setIsLoading(true);
      // API body
      let apiBody = {
        user_id: userID,
        json: 'json',
        device: 'android',
      };
      if (mfIds.length !== 0) {
        apiBody.mf_id = mfIds;
      }

      const data = qs.stringify(apiBody);

      // API headers
      const header = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      };

      let annualReturns = '';
      // make axios call
      await axios
        .post(anuualReturnsUrl, data, header)
        .then(response => {
          annualReturns = response.data.mf_total_xirr;
          //console.log('Annual Ret.', annualReturns);
          setAnnualReturns(annualReturns);
        })
        .catch(error => console.error(error));
    } catch (err) {
      console.log(err);
    }
  };

  // console.log('mf',mutualFunds);
  let buyValue = 0;
  let currentValue = 0;
  let gainLoss = 0;
  let mfIds = [];
  let absret = 0;
  {
    mutualFunds &&
      mutualFunds.map((value, index, array) => {
        buyValue += parseFloat(value.buy_value);
        currentValue += parseFloat(value.current_value);
        // console.log(value.asset_type);
        // assets = value.asset_type;
        // console.log(assets);
        mfIds.push(value.mf_id);
      });
    gainLoss = currentValue - buyValue;
    absret = (currentValue/buyValue -1) * 100;
    // mfIds.push(value.mf_id);
  }
     //console.log('absret value', absret);
  //   console.log('mfIds', mfIds);

  useEffect(() => {
    MFData();
    AnnualRet();
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
    //         marginTop: 5,
    //         marginLeft: 5,
    //       }}>
    //       <View
    //         style={{
    //           backgroundColor: COLORS.lightGrey2,
    //           height: 38,
    //           width: 40,
    //           borderRadius: 10,
    //           justifyContent: 'center',
    //           alignItems: 'center',
    //         }}>
    //         <Image
    //           source={require('../../assets/Images/Networth/ic_mutual_funds.png')}
    //           style={{
    //             width: 25,
    //             height: 25,
    //           }}
    //         />
    //       </View>
    //       <View style={{marginLeft: SIZES.padding, flexDirection: 'row'}}>
    //         <Text
    //           style={{
    //             color: COLORS.main,
    //             ...FONTS.h3,
    //             fontWeight: 'bold',
    //           }}>
    //           Mutual Funds
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
    //           <Text style={{...FONTS.body4, color: COLORS.main}}>
    //             Invested Value
    //           </Text>
    //           <Text style={{...FONTS.body3, color: COLORS.black}}>
    //             {'\u20B9'} {amountToText(buyValue)}
    //           </Text>
    //         </View>
    //         <View>
    //           <Text
    //             style={{
    //               ...FONTS.body4,
    //               color: COLORS.main,
    //               marginRight: 15,
    //             }}>
    //             Current Value
    //           </Text>
    //           <Text style={{...FONTS.body3, color: COLORS.black}}>
    //             {'\u20B9'} {amountToText(currentValue)}
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
    //               color: COLORS.main,
    //               marginTop: 10,
    //             }}>
    //             Gain
    //           </Text>
    //           <Text style={{...FONTS.body3, color: COLORS.black}}>
    //             {'\u20B9'} {amountToText(gainLoss)}
    //           </Text>
    //         </View>
    //         <View style={{justifyContent: 'center'}}>
    //           <Text
    //             style={{
    //               ...FONTS.body4,
    //               color: COLORS.main,
    //               marginTop: 10,
    //               marginRight:40
    //             }}>
    //             CAGR
    //           </Text>
    //           <Text style={{...FONTS.body3, color: COLORS.black}}>
    //             {annualReturns} %
    //           </Text>
    //         </View>
    //       </View>
    //     </View>
    //   </Card>

    //   <View style={{height: 5, width: 15}}></View>
    // </View>

    <View
      style={{
        width: '95%',
        height: 180,
        margin: 10,
        borderRadius: 10,
        // marginLeft: 10,
        // paddingHorizontal: 5,
        // paddingVertical: SIZES.padding - 12,

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
              backgroundColor: COLORS.lightGrey,
              height: 35,
              width: 35,
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={require('../../assets/Images/Networth/ic_mutual_funds.png')}
              style={{
                width: 25,
                height: 25,
                tintColor:COLORS.dBlue
              }}
            />
          </View>
          <Text
            style={{
              marginLeft: SIZES.base,
              color: COLORS.dBlue,
              ...FONTS.h3,
              marginLeft: 20,
              fontWeight: 'bold',
              marginLeft: SIZES.padding,
              marginTop: 5,
            }}>
            MUTUAL FUNDS
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            marginTop: SIZES.padding,
            alignItems: 'center',
            marginTop: 5,
            marginLeft: 5,
          }}>
          {/* <View
            style={{
              backgroundColor: COLORS.lightGrey2,
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
          </View> */}
          {/* <View style={{marginLeft: SIZES.padding, flexDirection: 'row'}}>
            <Text
              style={{
                color: COLORS.main,
                ...FONTS.h3,
                fontWeight: 'bold',
              }}>
              Mutual Funds
            </Text>
          </View> */}
        </View>
        <View style={{margin: 1}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal:20
            }}>
            <View style={{justifyContent: 'center', alignItems:'center'}}>
              <Text style={{...FONTS.body4, color: COLORS.black}}>
                INVESTED VALUE
              </Text>
              <Text style={{...FONTS.body3, fontWeight:'bold', color: COLORS.black}}>
                {'\u20B9'} {amountToText(buyValue)}
              </Text>
            </View>
            <View style={{justifyContent: 'center', alignItems:'center'}}>
              <Text
                style={{
                  ...FONTS.body4,
                  color: COLORS.black,
                }}>
                CURRENT VALUE
              </Text>
              <Text style={{...FONTS.body3, fontWeight:'bold', color: COLORS.black}}>
                {'\u20B9'} {amountToText(currentValue)}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems:'center',
            }}>
            <View style={{justifyContent: 'center', alignItems:'center'}}>
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
              <Text style={{...FONTS.body3, fontWeight:'bold', color: COLORS.black}}>
                {(absret).toFixed(2)} %
              </Text>
            </View>
            {/* <View style={{justifyContent: 'center', alignItems:'center'}}>
              <Text
                style={{
                  ...FONTS.body4,
                  color: COLORS.darkGray,
                  marginTop: 10,
                }}>
                CAGR
              </Text>
              <Text style={{...FONTS.body3, color: COLORS.black}}>
                {annualReturns} %
              </Text>
            </View> */}
            <View style={{justifyContent: 'center', alignItems:'center'}}>
              <Text
                style={{
                  ...FONTS.body4,
                  color: COLORS.black,
                  marginTop: 10,
                }}>
                XIRR
              </Text>
              <Text style={{...FONTS.body3, fontWeight:'bold', color: COLORS.black}}>
                {annualReturns} %
              </Text>
            </View>
          </View>
        </View>
        {/* <View
          style={{
            flexDirection: 'row',
            marginTop: 10,
            alignItems: 'center',
          }}>
          <Image
            source={imagePath.ic_profile}
            style={{
              width: 20,
              height: 20,
              tintColor: COLORS.main,
              marginRight: 10,
            }}
          />
          <Text>holder_name</Text>
        </View> */}
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

export default MUtualFundsData;

// import Axios from 'axios';
// import qs from 'qs';

// const getMutualFunds = async (userId, loginToken) => {
// 	let mutualFunds = null ;

//     // construct mutual funds url
//     const mutualFundsUrl =  'https://moneyfrog.in/financial-page-api/'+userId+'/mutual_funds?login_token='+loginToken
// 	// const mutualFundsUrl = `https://moneyfrog.in/financial-page-api/${userId}/mutual_funds?login_token=${loginToken}`;

// 	// make axios call
// 	await Axios.get(mutualFundsUrl)
// 		.then((response) => {
// 			mutualFunds = response.data;
// 			// console.warn("mutualFundsResp"+mutualFunds)
// 		})
// 		.catch((error) => console.error(error));

// 	// return mutual funds response json
// 	return mutualFunds;
// };

// const getAnnualReturns = async (userId, mfIds: Array) => {
// 		// XIRR API Url
// 		const anuualReturnsUrl = 'https://moneyfrog.in/get-xirr';

// 		// API body
// 		let apiBody = {
// 			user_id: userId,
// 			json: 'json',
// 			device: 'android'
// 		};
// 		if (mfIds.length !== 0) {
// 			apiBody.mf_id = mfIds;
// 		}

// 		const data = qs.stringify(apiBody);

// 		// API headers
// 		const header = {
// 			headers: {
// 				'Content-Type': 'application/x-www-form-urlencoded'
// 			}
// 		};

// 		let annualReturns=''
// 		// make axios call
// 		await Axios.post(anuualReturnsUrl, data, header)
// 			.then((response) => {
// 				annualReturns = response.data.mf_total_xirr;
// 				// console.log(annualReturns)
// 			})
// 			.catch((error) => console.error(error));

// 		return annualReturns;
// };

// export { getMutualFunds, getAnnualReturns };
