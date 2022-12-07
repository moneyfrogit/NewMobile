import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  ScrollView,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {Card} from 'react-native-paper';
// import {COLORS, FONTS} from '../../constants/theme';
// import navigationStrings from '../../constants/navigationStrings';
// import HeaderComponent from '../HeaderComponent';
// import NetworthItem from '../NetworthItem';
// import AppHeader from '../HeaderSimple';
import {Col, Grid, Row} from 'react-native-easy-grid';
import {COLORS, FONTS} from '../../constants/theme';
import navigationStrings from '../../constants/navigationStrings';
import HeaderComponent from '../HeaderComponent';
import AppHeader from '../HeaderSimple';
import {amountToText} from '../../utils/Amounts';
import imagePath from '../../constants/imagePath';
import qs from 'qs';

const MutualFundComponent = ({icon, BuyV, CurrV, Gain, Abso}) => {
  const [userID, setUserID] = useState('');
  const [userToken, setUserToken] = useState('');
  const [text, setText] = useState('');
  const [state, setState] = useState({data: [], loading: false}); // only one data source
  const [mutualFunds, setMutualFunds] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [annualReturns, setAnnualReturns] = useState('');
  // various asset icons
  // const mutualFundIcon = require('../../assets/Images/Networth/ic_mutual_funds.png');
  // const equityIcon = require('../../assets/Images/Networth/ic_equity.png');
  // const fixedIncomeIcon = require('../../assets/Images/Networth/ic_fixed_income.png');
  // const insuranceIcon = require('../../assets/Images/Networth/ic_insurance.png');
  // const bullionsIcon = require('../../assets/Images/Networth/ic_bullions.png');
  // const realEstateIcon = require('../../assets/Images/Networth/ic_real_estate.png');
  // const loansIcon = require('../../assets/Images/Networth/ic_loans.png');

  // const [userID, setUserID] = useState('');
  // const [userToken, setUserToken] = useState('');

  // const [state, setState] = useState({data: [], loading: false}); // only one data source
  // const {data, loading} = state;

  // const [totalNetworth, setTotalNetworth] = useState('');
  // const [fixedIncome, setFixedIncome] = useState('');
  // const [fixedIncomeChangePer, setFixedIncomeChangePer] = useState('');
  // const [mutualFunds, setMutualFunds] = useState('');
  // const [mutualFundsChangePer, setMutualFundsChangePer] = useState('');
  // const [equity, setEquity] = useState('');
  // const [equityChangePer, setEquityChangePer] = useState('');
  // const [bullions, setBullions] = useState('');
  // const [bullionsChangePer, setBullionsChangePer] = useState('');
  // const [insurance, setInsurance] = useState('');
  // const [insuranceChangeper, setInsuranceChangePer] = useState('');
  // const [realEstate, setRealEstate] = useState('');
  // const [realEstateChangePer, setRealEstateChangePer] = useState('');
  // const [loans, setLoans] = useState('');
  // const [loansChangePer, setLoansChangePer] = useState('');

  // const fetchAPI = async () => {
  //   try {
  //     const userID = await AsyncStorage.getItem('userId');
  //     setUserID(userID);
  //     const userToken = await AsyncStorage.getItem('userToken');
  //     setUserID(userToken);
  //     // console.log(userID);
  //     setState({data: [], loading: true});
  //     axios
  //       .get(
  //         'https://moneyfrog.in/api_controller/networth_daily_change/' +
  //           userID +
  //           '/?login_token=' +
  //           userToken,
  //       )
  //       .then(response => response.data)
  //       .then(data => {
  //         console.log(data);
  //         setState({data, loading: false}); // set only data
  //         setTotalNetworth(data.total_networth);
  //         // setRealEstate(data.real_estate_cur_value);
  //         // setRealEstateChangePer(data.real_estate_change_per);
  //         // setMutualFunds(data.mutual_fund_cur_value);
  //         // setMutualFundsChangePer(data.mutual_fund_change_per);
  //         // setEquity(data.equity_cur_value);
  //         // setEquityChangePer(data.equity_change_per);
  //         // setFixedIncome(data.fixed_income_low_cur_value);
  //         // setFixedIncomeChangePer(data.fixed_income_low_change_per);
  //         // setInsurance(data.ulip_endowment_cur_value);
  //         // setInsuranceChangePer(data.ulip_endowment_change_per);
  //         // setBullions(data.bullion_others_cur_value);
  //         // setBullionsChangePer(data.bullion_others_change_per);
  //         // setLoans(data.liability_cur_value);
  //         // setLoansChangePer(data.liability_change_per);
  //       })
  //       .catch(function (error) {
  //         // handle error
  //         if (error.response) {
  //           console.log('networth change api error: ', response.error);
  //         }
  //         // console.log(error);
  //       })
  //       .then(function () {});
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  const AnnualRet = async () => {
    try {
      const userID = await AsyncStorage.getItem('userId');
      setUserID(userID);
      const userToken = await AsyncStorage.getItem('userToken');
      setUserToken(userToken);
      const anuualReturnsUrl = 'https://moneyfrog.in/get-xirr';
      setIsLoading(true);
      // API body
      let apiBody = {
        user_id: userID,
        json: 'json',
        device: 'android',
      };
      // if (mfIds.length !== 0) {
      //   apiBody.mf_id = mfIds;
      // }

      const data = qs.stringify(apiBody);

      // API headers
      const header = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      };

      let annualReturns = '';
      // make axios call
      await axios
        .post(anuualReturnsUrl, data, header)
        .then(response => {
          annualReturns = response.data.mf_total_xirr;
          //console.log('Annual Ret.', annualReturns);
          setAnnualReturns(annualReturns);
        })
        .catch(error => console.error(error));
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    AnnualRet();
  }, []); // use `[]` to avoid multiple side effect

  return (
    <View
      style={{
        height: 80,
        width: '100%',
        backgroundColor: COLORS.main,
        marginVertical: 10,
        flexDirection: 'row',
        alignItems:'center',
        justifyContent:'space-evenly'
      }}>
      {/* <View style={{flexDirection:'row', justifyContent:''}}> */}
      <View style={{
        margin:5,
        alignItems:'center'
      }}>
        <Text
          style={{
            margin: 10,
            fontSize: 12,
            color: COLORS.white,
            alignItems:'center'
          }}>
          Buy Value
        </Text>
        <Text
          style={{
            fontSize: 18,
            marginLeft: 10,
            color: COLORS.white,
          }}>
          {'\u20B9'} {BuyV}
        </Text>
      </View>

      <View style={{
        margin:5,
        alignItems:'center'
      }}>
        <Text
          style={{
            margin: 10,
            fontSize: 12,
            color: COLORS.white,
          }}>
          Curr. Value
        </Text>
        <Text
          style={{
            fontSize: 18,
            marginLeft: 10,
            color: COLORS.white,
          }}>
          {'\u20B9'} {CurrV}
        </Text>
      </View>
      <View style={{
        margin:5,
        alignItems:'center'
      }}>
        <Text
          style={{
            margin: 10,
            fontSize: 12,
            color: COLORS.white,
          }}>
          Gain
        </Text>
        <Text
          style={{
            fontSize: 18,
            marginLeft: 10,
            color: COLORS.white,
          }}>
          {'\u20B9'} {Gain}
        </Text>
      </View>
      <View style={{
        margin:5,
        alignItems:'center'
      }}>
        <Text
          style={{
            margin: 10,
            fontSize: 12,
            color: COLORS.white,
          }}>
          CAGR
        </Text>
        <Text
          style={{
            fontSize: 18,
            marginLeft: 10,
            color: COLORS.white,
          }}>
          {annualReturns}%
        </Text>
      </View>
      {/* </View> */}

      {/* <TouchableOpacity
        onPress={() => {
          navigation.navigate(navigationStrings.ALLMUTUALFUNDS);
        }}>
        <View style={{marginLeft: '5%', padding: 25}}>
          <Image
            source={icon}
            style={{
              width: 25,
              height: 25,
              tintColor: COLORS.white,
            }}
          />
        </View>
      </TouchableOpacity> */}
    </View>
  );
};

export default MutualFundComponent;
