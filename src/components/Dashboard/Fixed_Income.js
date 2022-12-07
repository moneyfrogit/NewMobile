import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {FONTS, COLORS, SIZES} from '../../constants/theme';
import {amountToText} from '../../utils/Amounts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useState} from 'react';
import axios from 'axios';
import imagePath from '../../constants/imagePath';

const Fixed_Income = () => {
  const [userID, setUserID] = useState('');
  const [userToken, setUserToken] = useState('');
  const [text, setText] = useState('');
  const [state, setState] = useState({data: [], loading: false}); // only one data source
  const {data, loading} = state;

  const fetchAPI = async () => {
//     let link ='https://moneyfrog.in/financial-page-api/' +
// userID +'/fixed_income?login_token=' +userToken;
// console.log(link);
    try {
      const userID = await AsyncStorage.getItem('userId');
      setUserID(userID);
      // console.log(userID);
      const userToken = await AsyncStorage.getItem('userToken');
      setUserToken(userToken);
      // console.log(userToken);
      setState({data: [], loading: true});
      axios
        .get(
          'https://moneyfrog.in/financial-page-api/' +
            userID +
            '/fixed_income?login_token=' +
            userToken,
        )
        .then(response => response.data.fixed_income)
        .then(data => {
         // console.log('the Fixed Income data',data);
          setState({data, loading: false}); // set only data
          //console.log('the data', data.equity)
        })
        .catch(function (error) {
          // handle error
          if (error.response === '1') {
            console.log('Error in fetching Fixed Income', response.error);
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
  let current_value = 0;
  let maturity_amount = 0;
  let roi = 0;
  let holder_name = null;
  {
    data &&
      data.map((value, index, array) => {
        current_value += parseFloat(value.current_value);
        maturity_amount += parseFloat(value.maturity_amount);
        roi = parseFloat(value.roi);
        holder_name = value.holder_name;
        // console.log(value.asset_type);
        // assets = value.asset_type;
        // console.log(assets);
      });
    // gainLoss = totalcurrentValue - totalbuyValue;
  }
  // absoluteReturns = parseFloat((gainLoss / totalbuyValue) * 100).toFixed(2);

  useEffect(() => {
    fetchAPI();
  }, []); // use `[]` to avoid multiple side effect

  return (
    <View
      style={{
        width: '95%',
        height: 180,
        margin: 10,
        borderRadius: 10,
      }}>
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
              source={imagePath.icGoals}
              style={{
                width: 25,
                height: 25,
                tintColor: COLORS.darkGreen,
              }}
            />
          </View>
          <Text
            style={{
              marginLeft: SIZES.base,
              color: COLORS.darkGreen,
              alignItems:'center',
              ...FONTS.h3,
              marginLeft: 20,
              marginTop:8
            }}>
            FIXED INCOME
          </Text>
        </View>
        {/* 
        <View>
          <Text>CURRENT VALUE</Text>
          <Text>MATURITY AMOUNT</Text>
          <Text>ROI</Text>
        </View> */}

        <View style={{marginTop: 20}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal:20,
              alignItems: 'center',
            }}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{...FONTS.body4, color: COLORS.black}}>
                CURRENT VALUE
              </Text>
              <Text style={{...FONTS.body3, fontWeight:'bold', color: COLORS.black}}>
                {'\u20B9'} {amountToText(current_value)}
              </Text>
            </View>

            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text
                style={{
                  ...FONTS.body4,
                  color: COLORS.black,
                  marginRight: 15,
                }}>
                MATURITY VALUE
              </Text>
              <Text style={{...FONTS.body3, fontWeight:'bold', color: COLORS.black}}>
                {'\u20B9'} {amountToText(maturity_amount)}
              </Text>
            </View>
          </View>

          {/* <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginHorizontal: 25,
            }}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text
                style={{
                  ...FONTS.body4,
                  color: COLORS.darkGray,
                  marginTop: 10,
                }}>
                ROI
              </Text>
              <Text style={{...FONTS.body3, color: COLORS.black}}>
                {'\u20B9'} {amountToText(roi)}
              </Text>
            </View> */}
            {/* <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <View style={{flexDirection: 'row'}}>
                <Image
                  source={imagePath.ic_profile}
                  style={{
                    width: 20,
                    height: 20,
                    tintColor: COLORS.darkGreen,
                    marginRight: 10,
                  }}
                />
                <Text
                  style={{
                    ...FONTS.body4,
                    color: COLORS.darkGreen,
                  }}>
                  HOLDER NAME
                </Text>
              </View>
              <Text
                style={{
                  ...FONTS.body3,
                  color: COLORS.black,
                  alignItems: 'baseline',
                }}>
                {holder_name}
              </Text>
            </View> */}
          {/* </View> */}
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
              tintColor: COLORS.darkGreen,
              marginRight: 10,
            }}
          />
          <Text>HOLDER NAME</Text>
        </View> */}
      </View>
      {/* </TouchableOpacity> */}
    </View>
  );
};

export default Fixed_Income;

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
