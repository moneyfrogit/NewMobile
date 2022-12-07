import {View, Text, SafeAreaView, FlatList, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import HeaderComponent from '../../../components/HeaderComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { COLORS, FONTS } from '../../../constants/theme';
import {amountToText} from '../../../utils/Amounts';
import imagePath from '../../../constants/imagePath';

const Loans = ({navigation, route}) => {
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
            '/liabilities?login_token=' +
            userToken,
        )
        .then(response => response.data.liabilities)
        .then(data => {
          console.log(data);
          setState({data, loading: false}); // set only data
          //console.log('the data', data.equity)
        })
        .catch(function (error) {
          // handle error
          if (error.response === '1') {
            console.log('Error in fetching Loans', response.error);
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

  const renderLoans = ({item, index}) => (
    <View style={{}}>
    <View
      style={{
        flexDirection: 'row',
        width: '95%',
        margin: 10,
        padding: 10,
        alignItems: 'center',
        backgroundColor: COLORS.main,
        borderRadius: 10,
      }}>
      <Image
        source={require('../../../assets/Images/Networth/ic_loans.png')}
        style={{
          width: 35,
          height: 35,
          tintColor: COLORS.blue,
          backgroundColor:COLORS.lightGrey,
          borderRadius:10,
          marginHorizontal: 15,
        }}
      />
      <Text style={{...FONTS.h4, alignItems: 'center'}}>
        {item.institution_name} - {item.loan_name}
      </Text>
      {/* <Text style={{...FONTS.h3, alignItems: 'center'}}>

      </Text> */}
    </View>

    <View
      style={{backgroundColor: COLORS.white, margin: 10, borderRadius: 10}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          margin: 10,
          marginHorizontal: 20,
          // backgroundColor:COLORS.white
        }}>
        <View
          style={{
            alignItems: 'center',
          }}>
          <Text style={{color: COLORS.grey, margin: 5}}>Loan Amount</Text>
          <Text>{item.loan_amount}</Text>
        </View>

        <View
          style={{
            alignItems: 'center',
          }}>
          <Text style={{color: COLORS.grey, margin: 5}}>Curr. Outstanding</Text>
          <Text>{amountToText(item.current_outstanding)}</Text>
        </View>

        <View
          style={{
            alignItems: 'center',
          }}>
          <Text style={{color: COLORS.grey, margin: 5}}>EMI</Text>
          <Text>{amountToText(item.emi)}</Text>
        </View>

        <View
          style={{
            alignItems: 'center',
          }}>
          <Text style={{color: COLORS.grey, margin: 5}}>Interest Rate</Text>
          <Text>{item.interest_rate}%</Text>
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          marginVertical: 10,
        }}>
        <View
          style={{
            alignItems: 'center',
          }}>
          <Text style={{color: COLORS.grey, margin: 5}}>Start date</Text>
          <Text>{item.starting_date}</Text>
        </View>

        <View
          style={{
            alignItems: 'center',
          }}>
          <Text style={{color: COLORS.grey, margin: 5}}>Close date</Text>
          <Text>{item.closing_date}</Text>
        </View>

        <View
          style={{
            alignItems: 'center',
          }}>
          <Text style={{color: COLORS.grey, margin: 5}}>Holder Name</Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              source={imagePath.ic_profile}
              style={{
                width: 20,
                height: 20,
                tintColor: COLORS.main,
                marginRight: 5,
              }}
            />
            <Text>{item.owner_name}</Text>
          </View>
        </View>
      </View>
    </View>
  </View>

    // <View>


    //   <Text>closing_date : - {item.closing_date}</Text>
    //   <Text>current_outstanding : - {item.current_outstanding}</Text>
    //   <Text>emi : -{item.emi}</Text>
    //   <Text>institution_name : -{item.institution_name}</Text>
    //   <Text>interest_rate : -{item.interest_rate}</Text>
    //   <Text>loan_amount : -{item.loan_amount}</Text>
    //   <Text>loan_name : -{item.loan_name}</Text>
    //   <Text>move_asset : -{item.move_asset}</Text>
    //   <Text>owner_name : -{item.owner_name}</Text>
    //   <Text>starting_date: -{item.starting_date}</Text>
    //   <View 
    //   style={{height:1, width:'100%', backgroundColor:COLORS.black}}
    // />
      
    // </View>
  );

  useEffect(() => {
    fetchAPI();
  }, []); // use `[]` to avoid multiple side effect
  return (
    <View>
      <SafeAreaView>
      <HeaderComponent goBack = {()=>navigation.goBack()} text="Loans"/>
      {/* <Text  style={{...FONTS.h2}}>Loans</Text> */}
        <FlatList
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderLoans}
        />
      </SafeAreaView>
    </View>
  )
}

export default Loans