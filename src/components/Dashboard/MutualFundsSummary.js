import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {FONTS, COLORS, SIZES} from '../../constants/theme';
import {amountToText} from '../../utils/Amounts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useState} from 'react';
import axios from 'axios';
import imagePath from '../../constants/imagePath';

const MFSummary = () => {
  const [userID, setUserID] = useState('');
  const [state, setState] = useState({data: [], loading: false}); // only one data source
  const {data, loading} = state;
  const [totalMF, setTotalMF] = useState("");
  const [mFData, setMFData] = useState("");

  const DetailQuestionary = async () => {
    // setGoalsLoading(true);
    try {
      const userID = await AsyncStorage.getItem('userId');
      // setUserID(userID);
      const userToken = await AsyncStorage.getItem('userToken');
      const result = await axios
        .get(
          'https://moneyfrog.in/detailed-questionary/' +
            userID +
            '?api=mobile_api&login_token=' +
            userToken,
        )
        .then(result => result.data)
        .then(result => {
          //console.log('Asset Category Data', result);
          setMutualFundSummary(result);
          //console.log('MF Summary 2', mutualFundSummary);
        });
    } catch (err) {
      console.log(err);
      // setGoalsError(err.message || 'Unexpected Error!');
    } finally {
      //setGoalsLoading(false);
    }
  };

  useEffect(() => {
    DetailQuestionary();
  }, []); // use `[]` to avoid multiple side effect

  return (
  <View>
    
  </View>
  );
};

export default MFSummary;

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
