import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {FONTS, COLORS, SIZES} from '../../constants/theme';
import {amountToText, replaceNumberWithCommas} from '../../utils/Amounts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useState} from 'react';
import axios from 'axios';
import imagePath from '../../constants/imagePath';
import MFAAProgressBar from './ProgressBar';
import {ProgressBar} from 'react-native-paper';

const AssetAllocation = ({value, total, percentt}) => {
  // const [userID, setUserID] = useState('');
  // const [state, setState] = useState({data: [], loading: false}); // only one data source
  // const {data, loading} = state;
  // const [totalMF, setTotalMF] = useState('');
  // const [mFData, setMFData] = useState('');


  // const fetchAPI = async () => {
  //   try {
  //     const userID = await AsyncStorage.getItem('userId');

  //     setState({data: [], loading: true});
  //     axios
  //       .get('https://moneyfrog.in/mac/get_aa_mf/' + userID)
  //       .then(response => response.data)
  //       .then(data => {
  //         // console.log(data);
  //         setMFData(data);
  //         console.log('aa mf', mFData);
  //         setTotalMF(data.TotalMutualFundsValue);
  //         setState({loading: false});
  //       })
  //       .catch(function (error) {
  //         // handle error
  //         console.log('Error in fetching data', error);
  //         // console.log(error);
  //       })
  //       .then(function () {
  //         // always executed
  //       });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // {
  //   mFData &&
  //     mFData.map((value, index, array) => {
  //       buyValue += parseFloat(value.value);
  //     });

  // }

  const AssetAllocationItem = ({item, index}) => (
    <View>
      <View style={{flexDirection: 'row'}}>
        <Text>{item.subcategory} </Text>
        <Text>
          {'\u20B9'} {amountToText(item.value)}
        </Text>
      </View>
      <View style={{flexDirection: 'row'}}>
        <View>
          <MFAAProgressBar value={item.value} total={totalMF} />
          {/* <ProgressBar
            style={{
              height: 12,
              borderRadius: 10,
              width: '100%',
              flex: 0.90,
            }}
            color="rgba(251, 197, 49,0.7)"
            progress={percentt}
          /> */}
        </View>
        <View>
          <Text style={{flex: 0.1}}>
            {amountToText((item.value / totalMF) * 100)} %
          </Text>
        </View>
      </View>
    </View>
  );

  // useEffect(() => {
  //   fetchAPI();
  // }, []); // use `[]` to avoid multiple side effect

  return (
    <View>
      <Text style={{...FONTS.body3, color: COLORS.black}}>
        Total {'\u20B9'} {amountToText(totalMF)}
      </Text>
      <FlatList
        data={mFData.data}
        renderItem={AssetAllocationItem}
        keyExtractor={item => item.id}
        // numColumns={2}
      />
      if(loading)
      {
        // Show loader or actvityIndicator
        <View/>
      }
      else
      {
        // Your flat list code.
        <FlatList
        data={mFData.data}
        renderItem={AssetAllocationItem}
        keyExtractor={item => item.id}
        // numColumns={2}
      />
      }

    </View>
  );
};

export default AssetAllocation;

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
