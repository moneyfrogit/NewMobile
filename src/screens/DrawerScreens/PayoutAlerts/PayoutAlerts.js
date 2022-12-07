import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './Styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import HeaderComponent from '../../../components/HeaderComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {replaceNumberWithCommas} from '../../../utils/Amounts';

const PayoutAlerts = ({navigation}) => {
  const [payoutAlertsData, setPayoutAlertsData] = useState('');

  const Payout = async () => {
    // setGoalsLoading(true);
    try {
      const userID = await AsyncStorage.getItem('userId');
      // setUserID(userID);
      const result = await axios
        .get('https://moneyfrog.in/api_controller/payout_alerts/' + userID)
        .then(result => result.data.payout)
        .then(result => {
          console.log('payout Alerts', result);
          setPayoutAlertsData(result);
        });
    } catch (err) {
      console.log(err);
      // setGoalsError(err.message || 'Unexpected Error!');
    } finally {
      //setGoalsLoading(false);
    }
  };

  useEffect(() => {
    Payout();
  }, []);

  const renderItem = ({item, index}) => (
    <ScrollView>
      <View
        style={{
          flex: 1,
          width: '100%',
          height: 100,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            width: '15%',
            height: 60,
            justifyContent: 'center',
            padding: 10,
            borderRightColor: 'grey',
            borderRightWidth: 1,
          }}>
          <Text
            style={{
              fontSize: 22,
              color: '#333',
            }}>{item.date_of_deduction}</Text>
          <Text
            style={{
              fontSize: 14,
              color: 'grey',
            }}>
            Oct
          </Text>
        </View>

        <View
          style={{
            width: '85%',
            justifyContent: 'center',
            paddingHorizontal: 17,
          }}>
          <Text style={{fontSize: 15, color: '#333'}}>
            {item.institution_name}
          </Text>
          <Text style={{fontSize: 14, color: 'grey'}}>{item.scheme_name}</Text>

          <View style={{flexDirection: 'row'}}>
            <Text style={{fontSize: 15, color: '#333'}}>
              {'\u20B9'} {replaceNumberWithCommas(item.amount)} -{' '}
            </Text>
            <Text>{item.instrument}</Text>
          </View>
        </View>
      </View>
      <View style={{height: 1, opacity: 0.1, backgroundColor: '#000000'}} />
    </ScrollView>
  );

  return (
    <SafeAreaView>
      <HeaderComponent goBack={() => navigation.goBack()} text="Payout" />
      <FlatList
        data={payoutAlertsData}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => {
          return item.scheme_name;
        }}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
};

export default PayoutAlerts;
