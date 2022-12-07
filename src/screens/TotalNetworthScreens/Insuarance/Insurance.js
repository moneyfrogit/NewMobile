import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import HeaderComponent from '../../../components/HeaderComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {COLORS, FONTS} from '../../../constants/theme';
import imagePath from '../../../constants/imagePath';
import {amountToText} from '../../../utils/Amounts';

const Insurance = ({navigation, route}) => {
  const [userID, setUserID] = useState('');
  const [userToken, setUserToken] = useState('');
  const [text, setText] = useState('');
  const [state, setState] = useState({data: [], loading: false}); // only one data source
  const {data, loading} = state;
  const {insuranceCategory, SetInsuranceCategory} = useState('');
  const [viewMode, setViewMode] = React.useState('Life');

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
            '/insurance?login_token=' +
            userToken,
        )
        .then(response => response.data.insurance)
        .then(data => {
          console.log(data);
          setState({data, loading: false}); // set only data
          //console.log('the data', data.equity)
        })
        .catch(function (error) {
          // handle error
          if (error.response === '1') {
            console.log('Error in fetching Equities', response.error);
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

  const uniqueInsurance = [
    ...(data &&
      data
        .reduce((map, obj) => map.set(obj.mediclaim_type, obj), new Map())
        .values()),
  ];

  let medicalInsurance = [],
    generalInsurance = [],
    lifeInsurance = [];

  const insuranceType = [
    ...(data &&
      data.map(value => {
        const insuranceType = value.type_i;
        const premiumAmount = parseFloat(value.annual_premium);
        const sumAssured = parseFloat(value.sum_assured);
        if (
          insuranceType == 'Mediclaim' ||
          insuranceType == 'Personal' ||
          insuranceType == 'Corporate'
        ) {
          medicalInsurance.push(value);
        } else if (
          insuranceType == 'Term' ||
          insuranceType == 'Pension' ||
          insuranceType == 'Endowment' ||
          insuranceType == 'ULIP' ||
          insuranceType == 'Money Back'
        ) {
          lifeInsurance.push(value);
        } else if (
          insuranceType == 'Vehicle' ||
          insuranceType == 'Personal Accident' ||
          insuranceType == 'Critical Illness' ||
          insuranceType == 'Home' ||
          insuranceType == 'Others'
        ) {
          generalInsurance.push(value);
        }
      })),
  ];

  let totalLifeSumAssured = 0;
  let totalLifePremiumAmount = 0;
  lifeInsurance.map(value => {
    totalLifeSumAssured += parseFloat(value.sum_assured);
    totalLifePremiumAmount += parseFloat(value.annual_premium);
  });

  let totalMedicalSumAssured = 0;
  let totalMedicalPremiumAmount = 0;
  medicalInsurance.map(value => {
    totalMedicalSumAssured += parseFloat(value.sum_assured);
    totalMedicalPremiumAmount += parseFloat(value.annual_premium);
  });

  let totalGeneralSumAssured = 0;
  let totalGeneralPremiumAmount = 0;
  generalInsurance.map(value => {
    totalGeneralSumAssured += parseFloat(value.sum_assured);
    totalGeneralPremiumAmount += parseFloat(value.annual_premium);
  });

  // console.log('life I', lifeInsurance);
  // console.log('premium amount',totalLifePremiumAmount);
  // console.log('totalSumAssured',totalLifeSumAssured);
  // console.log('med I', medicalInsurance);

  const renderItem = ({item, index}) => (
    <View>
      <TouchableOpacity onPress={() => Categorydata(item.mediclaim_type)}>
        <View
          style={{
            backgroundColor: COLORS.white,
            padding: 15,
            borderRadius: 10,
            marginVertical: 5,
            marginHorizontal: 10,
            height: 70,
            width: '100%',
          }}>
          <Text
            style={{
              ...FONTS.h3,
              marginTop: 10,
              color: COLORS.main,
              justifyContent: 'center',
            }}>
            {item.mediclaim_type}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
  const renderLifeInsurance = ({item, index}) => (
    <View
      style={{
        backgroundColor: COLORS.white,
        padding: 10,
        borderRadius: 10,
        margin: 10,
      }}>
      <View style={{flexDirection: 'row', flexWrap: 'wrap', margin: 5}}>
        <Text style={{...FONTS.h4, color: COLORS.darkGray}}>
          {item.type_i} - {item.insurance_firm} -{' '}
        </Text>
        <Text style={{...FONTS.h4, color: COLORS.black}}>
          {item.scheme_name}
        </Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 20,
          marginBottom: 5,
        }}>
        <View style={{alignItems: 'center'}}>
          <Text>Premium Amt.</Text>
          <Text>{amountToText(item.premium_amount)}</Text>
        </View>
        <View style={{alignItems: 'center'}}>
          <Text>Sum Assured</Text>
          <Text>{amountToText(item.sum_assured)}</Text>
        </View>
        <View style={{alignItems: 'center'}}>
          <Text>Start Date</Text>
          <Text>{item.start_date}</Text>
        </View>
        <View style={{alignItems: 'center'}}>
          <Text>Maturity Date</Text>
          <Text>{item.maturity_date}</Text>
        </View>
      </View>
    </View>
  );

  const renderMedicalInsurance = ({item, index}) => (
    <View
    style={{
      backgroundColor: COLORS.white,
      padding: 10,
      borderRadius: 10,
      margin: 10,
    }}>
    <View style={{flexDirection: 'row', flexWrap: 'wrap', margin: 5}}>
      <Text style={{...FONTS.h4, color: COLORS.darkGray}}>
        {item.type_i} - {item.insurance_firm} -{' '}
      </Text>
      <Text style={{...FONTS.h4, color: COLORS.black}}>
        {item.scheme_name}
      </Text>
    </View>

    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        marginBottom: 5,
      }}>
      <View style={{alignItems: 'center'}}>
        <Text>Premium Amt.</Text>
        <Text>{amountToText(item.premium_amount)}</Text>
      </View>
      <View style={{alignItems: 'center'}}>
        <Text>Sum Assured</Text>
        <Text>{amountToText(item.sum_assured)}</Text>
      </View>
      <View style={{alignItems: 'center'}}>
        <Text>Start Date</Text>
        <Text>{item.start_date}</Text>
      </View>
      <View style={{alignItems: 'center'}}>
        <Text>Maturity Date</Text>
        <Text>{item.maturity_date}</Text>
      </View>
    </View>
  </View>
  );

  const renderGeneralInsurance = ({item, index}) => (
    <View
    style={{
      backgroundColor: COLORS.white,
      padding: 10,
      borderRadius: 10,
      margin: 10,
    }}>
    <View style={{flexDirection: 'row', flexWrap: 'wrap', margin: 5}}>
      <Text style={{...FONTS.h4, color: COLORS.darkGray}}>
        {item.type_i} - {item.insurance_firm} -{' '}
      </Text>
      <Text style={{...FONTS.h4, color: COLORS.black}}>
        {item.scheme_name}
      </Text>
    </View>

    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        marginBottom: 5,
      }}>
      <View style={{alignItems: 'center'}}>
        <Text>Premium Amt.</Text>
        <Text>{'\u20B9'}{amountToText(item.premium_amount)}</Text>
      </View>
      <View style={{alignItems: 'center'}}>
        <Text>Sum Assured</Text>
        <Text>{'\u20B9'}{amountToText(item.sum_assured)}</Text>
      </View>
      <View style={{alignItems: 'center'}}>
        <Text>Start Date</Text>
        <Text>{item.start_date}</Text>
      </View>
      <View style={{alignItems: 'center'}}>
        <Text>Maturity Date</Text>
        <Text>{item.maturity_date}</Text>
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
        <HeaderComponent goBack={() => navigation.goBack()} text="Insurance" />

        {/* Customized Radio Button */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            backgroundColor: COLORS.white,
            borderRadius: 1,
            margin: 1,
            width:'100%'
          }}>
          <TouchableOpacity
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              height: 50,
              width: '33%',
              backgroundColor: viewMode == 'Life' ? COLORS.main : null,
              borderRadius: 5,
              color: COLORS.main,
            }}
            onPress={() => setViewMode('Life')}>
            <Text>Life</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              height: 50,
              width: '33%',
              backgroundColor: viewMode == 'Medical' ? COLORS.main : null,
              borderRadius: 5,
            }}
            onPress={() => setViewMode('Medical')}>
            <Text>Medical</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              height: 50,
              width: '33%',
              backgroundColor: viewMode == 'General' ? COLORS.main : null,
              borderRadius: 5,
            }}
            onPress={() => setViewMode('General')}>
            <Text>General</Text>
          </TouchableOpacity>
        </View>

        {viewMode == 'Life' && (
          <View style={{paddingBottom: 10}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                backgroundColor: COLORS.main,
                 borderRadius: 5,
                padding: 5,
                marginTop: 15,
                marginBottom: 15,
                borderWidth:0.3
              }}>
              <View style={{alignItems: 'center'}}>
                <Text>Sum Assured</Text>
                <Text>{amountToText(totalLifeSumAssured)}</Text>
              </View>
              <View style={{alignItems: 'center'}}>
                <Text>Premium Amount</Text>
                <Text>{amountToText(totalLifePremiumAmount)}</Text>
              </View>
            </View>

            <FlatList
              data={lifeInsurance}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderLifeInsurance}
            />
          </View>
        )}
        {viewMode == 'Medical' && (
          <View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                backgroundColor: COLORS.main,
                borderRadius: 10,
                padding: 10,
                margin: 20,
              }}>
              <View style={{alignItems: 'center'}}>
                <Text>Sum Assured</Text>
                <Text>{amountToText(totalMedicalSumAssured)}</Text>
              </View>
              <View style={{alignItems: 'center'}}>
                <Text>Premium Amount</Text>
                <Text>{amountToText(totalMedicalPremiumAmount)}</Text>
              </View>
            </View>

            <FlatList
              data={medicalInsurance}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderMedicalInsurance}
            />
          </View>
        )}
        {viewMode == 'General' && (
          <View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                backgroundColor: COLORS.main,
                borderRadius: 10,
                padding: 10,
                margin: 20,
              }}>
              <View style={{alignItems: 'center'}}>
                <Text>Sum Assured</Text>
                <Text>{amountToText(totalGeneralSumAssured)}</Text>
              </View>
              <View style={{alignItems: 'center'}}>
                <Text>Premium Amount</Text>
                <Text>{amountToText(totalGeneralPremiumAmount)}</Text>
              </View>
            </View>

            <FlatList
              data={generalInsurance}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderGeneralInsurance}
            />
          </View>
        )}
      </SafeAreaView>
    </View>
  );
};

export default Insurance;
