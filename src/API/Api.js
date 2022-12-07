import AsyncStorage from '@react-native-async-storage/async-storage';
import {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import React from 'react';


// let NetWorthapi =
//   'https://moneyfrog.in/api_controller/networth_daily_change/' +
//   userID +
//   '/?login_token=' +
//   userToken;

export function getData(Url) {
  return fetch(Url).then(response => response.json());
}

// const firstLoad = async () => {
//     try {
//       const userID = await AsyncStorage.getItem('userId');
//       setUserID(userID);
//       const userToken = await AsyncStorage.getItem('userToken');
//       setUserToken(userToken);

//       setIsLoading(true);
//       axios
//         .get(
//           'https://moneyfrog.in/financial-page-api/' +
//             userID +
//             '/mutual_funds?login_token=' +
//             userToken,
//         )
//         .then(function (response) {
//           setMutualFundsData(response.data.mutual_funds);
//           setIsLoading(false);
//         })
//         .catch(function (error) {
//           // handle error
//           if (error.response === '1') {
//             console.log('mutual fund summary error 1', response.error);
//           } else if (error.response === '0') {
//             console.log('mutual fund summary error 0');
//           }
//           // console.log(error);
//         })
//         .then(function () {
//           // always executed
//           //setMutualFundsData(mf);
//           //setIsLoading(false);
//         });
//     } catch (err) {
//       console.log(err);
//     }
//   };
