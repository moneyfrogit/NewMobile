import {View, Text, SafeAreaView, FlatList, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import HeaderComponent from '../../../components/HeaderComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {COLORS, FONTS} from '../../../constants/theme';
import {amountToText} from '../../../utils/Amounts';
import { DataTable } from 'react-native-paper';

const RealEstate = ({navigation, route}) => {
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
            '/real_estate?login_token=' +
            userToken,
        )
        .then(response => response.data.real_estate)
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
        });
    } catch (err) {
      console.log(err);
    }
  };

  const renderRealEstate = ({item, index}) => (
    <View
      style={{
        backgroundColor: COLORS.white,
        margin: 10,
        borderRadius: 10,
        padding: 10,
      }}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', marginHorizontal:10}}>
        <Text  style={{color:COLORS.black, ...FONTS.h3}}>{item.details}</Text>
        <Image
          source={{uri: item.image_name}}
          style={{width: 20, height: 20, resizeMode: 'stretch'}}
        />
      </View>

      <View style={{flexDirection: 'row', justifyContent: 'space-evenly', margin:10}}>
        <Text style={{color:COLORS.darkGray}}>Type : {item.type}</Text>
        <Text style={{color:COLORS.darkGray}}>Location : {item.location}</Text>
      </View>

      <View style={{flexDirection: 'row', justifyContent: 'center', margin:5,}}>
      <Text style={{color:COLORS.black, margin:5}}>{'\u20B9 ' + amountToText(item.worth)}</Text>
      <Text style={{color:COLORS.main, margin:5}}>{item.cagr} %</Text>
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
          text="Real Estate"
        />
        <FlatList
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderRealEstate}
        />
      </SafeAreaView>

      {/* <View>
        <DataTable>
        <DataTable.Header style={{ backgroundColor: '#DCDCDC',}}>
        <DataTable.Title>Name</DataTable.Title>
        <DataTable.Title>Favourite Food</DataTable.Title>
        <DataTable.Title>Age</DataTable.Title>
      </DataTable.Header>
      <DataTable.Row>
        <DataTable.Cell>Radhika</DataTable.Cell>
        <DataTable.Cell>Dosa</DataTable.Cell>
        <DataTable.Cell>23</DataTable.Cell>
      </DataTable.Row>
  
      <DataTable.Row>
        <DataTable.Cell>Krishna</DataTable.Cell>
        <DataTable.Cell>Uttapam</DataTable.Cell>
        <DataTable.Cell>26</DataTable.Cell>
      </DataTable.Row>
      <DataTable.Row>
        <DataTable.Cell>Vanshika</DataTable.Cell>
        <DataTable.Cell>Brownie</DataTable.Cell>
        <DataTable.Cell>20</DataTable.Cell>
      </DataTable.Row>
      <DataTable.Row>
        <DataTable.Cell>Teena</DataTable.Cell>
        <DataTable.Cell>Pizza</DataTable.Cell>
        <DataTable.Cell>24</DataTable.Cell>
      </DataTable.Row>
        </DataTable>
      </View> */}
    </View>
  );
};

export default RealEstate;
