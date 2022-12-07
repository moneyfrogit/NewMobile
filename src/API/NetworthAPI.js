import {
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    Alert,
    ScrollView,
  } from 'react-native';
  import axios from 'axios';
  import React, {useEffect, useRef, useState} from 'react';
  
  export const NetworthAPI = (userID, userToken) => {
  //  const [networthData, setNetworthData] = useState('');

      try {
        axios
          .get(
            'https://moneyfrog.in/api_controller/networth_daily_change/' +
              userID +
              '/?login_token=' +
              userToken,
          )
          .then(response => response.data)
          .then(data => {
            console.log(data);
            // setNetworthData(data);
            return data;
          })
          .catch(function (error) {
            // handle error
            if (error.response) {
              console.log('networth change api error: ', response.error);
            }
          })
          .then(function () {
          });
      } catch (err) {
        console.log(err);
      }
    };
  
  