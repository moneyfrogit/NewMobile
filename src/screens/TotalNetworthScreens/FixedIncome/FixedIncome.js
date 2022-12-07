import {View, Text, SafeAreaView, FlatList, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import HeaderComponent from '../../../components/HeaderComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {COLORS, FONTS} from '../../../constants/theme';
import {amountToText} from '../../../utils/Amounts';
import imagePath from '../../../constants/imagePath';

const FixedIncome = ({navigation, route}) => {
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
            '/fixed_income?login_token=' +
            userToken,
        )
        .then(response => response.data.fixed_income)
        .then(data => {
          console.log(data);
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

  const renderFixedIncome = ({item, index}) => (
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
          source={require('../../../assets/Images/Networth/ic_fixed_income.png')}
          style={{
            width: 30,
            height: 30,
            tintColor: COLORS.darkGreen,
            marginHorizontal: 15,
          }}
        />
        <Text style={{...FONTS.h4, alignItems: 'center'}}>
          INSTITUTION NAME -{' '}
        </Text>
        <Text style={{...FONTS.h3, alignItems: 'center'}}>
          {item.institution_name}
        </Text>
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
            <Text style={{color: COLORS.grey, margin: 5}}>Instru. Name</Text>
            <Text>{item.instrument_name}</Text>
          </View>

          <View
            style={{
              alignItems: 'center',
            }}>
            <Text style={{color: COLORS.grey, margin: 5}}>Curr. Value</Text>
            <Text>{amountToText(item.current_value)}</Text>
          </View>

          <View
            style={{
              alignItems: 'center',
            }}>
            <Text style={{color: COLORS.grey, margin: 5}}>Maturity Amount</Text>
            <Text>{amountToText(item.maturity_amount)}</Text>
          </View>

          <View
            style={{
              alignItems: 'center',
            }}>
            <Text style={{color: COLORS.grey, margin: 5}}>ROI</Text>
            <Text>{item.roi}%</Text>
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
            <Text style={{color: COLORS.grey, margin: 5}}>Risk type</Text>
            <Text>{item.risk_type}</Text>
          </View>

          <View
            style={{
              alignItems: 'center',
            }}>
            <Text style={{color: COLORS.grey, margin: 5}}>Maturity date</Text>
            <Text>{item.maturity_date}</Text>
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
              <Text>{item.holder_name}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );

  useEffect(() => {
    fetchAPI();
  }, []); // use `[]` to avoid multiple side effect
  return (
    <View>
      <SafeAreaView>
        <HeaderComponent
          goBack={() => navigation.goBack()}
          text="Fixed Income"
        />
        {/* <Text style={{...FONTS.h2}}>Fixed Income</Text> */}
        <FlatList
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderFixedIncome}
        />
      </SafeAreaView>
    </View>
  );
};

export default FixedIncome;
