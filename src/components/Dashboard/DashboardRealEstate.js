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
  
  const DashboardRealEstate = ({navigation, route}) => {
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
              '/real_estate?login_token=' +
              userToken,
          )
          .then(response => response.data.real_estate)
          .then(data => {
            //console.log(data);
            setState({data, loading: false}); // set only data
            //console.log('the real estate data', data);
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
          });
      } catch (err) {
        console.log(err);
      }
    };
  
    //console.log('print data', data);
    let assets = '';
    let worth = 0;
    let cagr = 0;
    let sum_assured = 0;
    let remaining_allocation = 0;
    
    {
      data &&
        data.map((value, index, array) => {
            worth += parseFloat(value.worth);
            cagr += parseFloat(value.cagr);
            sum_assured += parseFloat(value.sum_assured);
            remaining_allocation += parseFloat(value.remaining_allocation);
        });
    }
  
    useEffect(() => {
      fetchAPI();
    }, []); // use `[]` to avoid multiple side effect
    return (
      <View
        style={{
          width: '95%',
          height: 180,
          // margin: 5,
          margin: 10,
          // paddingHorizontal: 5,
          // paddingVertical: SIZES.padding - 12,
          borderRadius: 5,
          // backgroundColor: COLORS.white,
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
                source={require('../../assets/Images/Networth/ic_real_estate.png')}
                style={{
                  width: 25,
                  height: 25,
                  tintColor: COLORS.brown,
                }}
              />
            </View>
            <Text
              style={{
                marginLeft: SIZES.base,
                color: COLORS.brown,
                ...FONTS.h3,
                marginLeft: 20,
                fontWeight: 'bold',
                marginLeft: SIZES.padding,
                marginTop: 5,
              }}>
              REAL ESTATE
            </Text>
          </View>
  
          <View style={{marginTop: 20}}>
            <View
              style={{
                alignItems: 'center',
              }}>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{...FONTS.body4, color: COLORS.black}}>
                CURRENT VALUE
                </Text>
                <Text style={{...FONTS.body3, fontWeight:'bold', color: COLORS.black}}>
                  {'\u20B9'} {amountToText(worth)}
                </Text>
              </View>
  
              {/* <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Text
                  style={{
                    ...FONTS.body4,
                    color: COLORS.darkGray,
                    marginRight: 15,
                  }}>
                  CAGR
                </Text>
                <Text style={{...FONTS.body3, color: COLORS.black}}>
                  {amountToText(sum_assured)}
                </Text>
              </View> */}
            </View>
  
            <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems:'center',
                  marginHorizontal:20
                }}>
                {/* <View  style={{justifyContent: 'center', alignItems:'center'}}>
                  <Text
                    style={{
                      ...FONTS.body4,
                      color: COLORS.brown,
                      marginTop: 10,
                    }}>
                    sum_assured
                  </Text>
                  <Text style={{...FONTS.body3, color: COLORS.black}}>
                    {'\u20B9'} {amountToText(sum_assured)}
                  </Text>
                </View> */}
                {/* <View style={{justifyContent: 'center', alignItems:'center'}}>
                  <Text
                    style={{
                      ...FONTS.body4,
                      color: COLORS.brown,
                      marginTop: 10,
                    }}>
                   remaining_allocation
                  </Text>
                  <Text style={{...FONTS.body3, color: COLORS.black, alignItems:'baseline'}}>
                    {remaining_allocation}
                  </Text>
                </View> */}
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
  
  export default DashboardRealEstate;
  