import {View, Text, SafeAreaView, FlatList, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import HeaderComponent from '../../../components/HeaderComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {COLORS, FONTS} from '../../../constants/theme';
import {amountToText} from '../../../utils/Amounts';

const Bullions = ({navigation, route}) => {
  const [userID, setUserID] = useState('');
  const [userToken, setUserToken] = useState('');
  const [text, setText] = useState('');
  const [state, setState] = useState({data: [], loading: false}); // only one data source
  const {data, loading} = state;

  const fetchAPI = async () => {
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
            '/others?login_token=' +
            userToken,
        )
        .then(response => response.data.others)
        .then(data => {
          console.log(data);
          setState({data, loading: false}); // set only data
          //console.log('the data', data.equity)
        })
        .catch(function (error) {
          // handle error
          if (error.response === '1') {
            console.log('Error in fetching Bullions', response.error);
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

 let dataa = JSON.parse(JSON.stringify(data).replace(/\:null/gi, "\:\"\"")); 
console.log('dataa', dataa);

dataa && dataa.map(x => console.log('X',x));

  let totalValue = 0;
  dataa.map((val) => {
    let assetValue = val.value;


    if (assetValue == null) assetValue = 0;
    totalValue += parseFloat(assetValue);
  });
  console.log('total value', totalValue);


  const renderBullions = ({item, index}) => (
    <View>
      {/* <Text style={{...FONTS.h3}}>Total value {'\u20B9 '}</Text>
      <Text>current_value : - {'\u20B9 '}{item.current_value}</Text>
      <Text>id : - {item.id}</Text>
      <Text>karat : -{item.karat}</Text>
      <Text>quantity : -{item.quantity}</Text>
      <Text>type : -{item.type}</Text>
      <View 
      style={{height:1, width:'100%', backgroundColor:COLORS.black}}
    /> */}
      {/* <View style={{
      backgroundColor:COLORS.white,
      margin:20,
      borderRadius:10
    }}> */}

      <View
        style={{
          backgroundColor: COLORS.white,
          margin: 10,
          borderRadius: 10,
          padding:10
        }}>
        <Text>Bank account balance</Text>
        <Text>
          {'\u20B9 '}
          {amountToText(item.bank_account_balance)}
        </Text>
      </View>

      <View
        style={{
          backgroundColor: COLORS.white,
          margin: 10,
          borderRadius: 10,
          padding:10
        }}>
        <Text>Artwork</Text>
        <Text>
          {'\u20B9 '}
          {amountToText(item.artwork)}
        </Text>
      </View>

      <View
        style={{
          backgroundColor: COLORS.white,
          margin: 10,
          borderRadius: 10,
          padding:10
        }}>
        <Text>Bullions</Text>
        <Text>
          {'\u20B9 '}
          {amountToText(item.bullions)}
        </Text>
      </View>

      <View
        style={{
          backgroundColor: COLORS.white,
          margin: 10,
          borderRadius: 10,
          padding:10
        }}>
        <Text>Cash in hand</Text>
        <Text>
          {'\u20B9 '}
          {amountToText(item.cash_in_hand)}
        </Text>
      </View>

      <View
        style={{
          backgroundColor: COLORS.white,
          margin: 10,
          borderRadius: 10,
          padding:10
        }}>
        <Text>Other assets</Text>
        <Text>
          {'\u20B9 '}
          {amountToText(item.other_assets)}
        </Text>
      </View>
      <View
        style={{
          backgroundColor: COLORS.white,
          margin: 10,
          borderRadius: 10,
          padding:10
        }}>
        <Text>vehicle</Text>
        <Text>
          {'\u20B9 '}
          {amountToText(item.vehicle)}
        </Text>
      </View>
    </View>

    // </View>
  );

  useEffect(() => {
    fetchAPI();
  }, []); // use `[]` to avoid multiple side effect
  return (
    <View>
      <SafeAreaView>
        <HeaderComponent goBack={() => navigation.goBack()} text="Bullions" />
        {/* <Text  style={{...FONTS.h2}}>Bullions/Others</Text> */}
        <View
          style={{
            justifyContent: 'center',
            alignItems:'center',
            backgroundColor: COLORS.main,
            borderRadius: 10,
            padding: 20,
            margin: 20,
          }}>
          <Text style={{alignItems: 'center', color:COLORS.white}}>Total Value {''}</Text>
          <Text style={{alignItems: 'center', color:COLORS.white, ...FONTS.h3}}>{'\u20B9 ' + amountToText(229820)}</Text>
        </View>
        <FlatList
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderBullions}
        />
      </SafeAreaView>
    </View>
  );
};

export default Bullions;
