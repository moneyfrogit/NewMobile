import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Styles from './Styles'
import { SafeAreaView } from 'react-native-safe-area-context'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import HeaderComponent from '../../../components/HeaderComponent'

const WhatWeOffer = ({navigation}) => {
  const [whatweData, setWhatWeData] = useState('');

  const WhatMFOffer = async () => {
    // setGoalsLoading(true);
    try {
      const userID = await AsyncStorage.getItem('userId');
      const userToken = await AsyncStorage.getItem('userToken');
      // setUserID(userID);
      const result = await axios
        .get('https://moneyfrog.in/api_controller/packages/'+userID+'?login_token='+userToken)
        .then(result => result.data.Response)
        .then(result => {
          console.log('What we offer', result);
          setWhatWeData(result);
        });
    } catch (err) {
      console.log(err);
      // setGoalsError(err.message || 'Unexpected Error!');
    } finally {
      //setGoalsLoading(false);
    }
  };

  useEffect(() => {
    WhatMFOffer();
  }, []);

  return (
    <View>
      <SafeAreaView>
      <HeaderComponent goBack={() => navigation.goBack()} text="What We Offer" />
      <Text>WhatWeOffer</Text>
      </SafeAreaView>
    </View>
  )
}

export default WhatWeOffer