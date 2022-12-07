import {View, Text, SafeAreaView, FlatList, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import HeaderComponent from '../../../components/HeaderComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {COLORS, FONTS, SIZES} from '../../../constants/theme';
import styles from './Styles';
import imagePath from '../../../constants/imagePath';
import {amountToText} from '../../../utils/Amounts';
import MutualFundComponent from '../../../components/BuySell/MutualFundComponent';
import RenderTitle from '../../../components/RenderTitle';
import { Button } from 'react-native-paper';

const Equity = ({navigation, route}) => {
  const [userID, setUserID] = useState('');
  const [userToken, setUserToken] = useState('');
  const [text, setText] = useState('');
  const [state, setState] = useState({data: [], loading: false}); // only one data source
  const {data, loading} = state;
  const [edata, setEdata] = React.useState([]);
  const [sampleData, setSampleData] = useState('');

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
            '/equity?login_token=' +
            userToken,
        )
        .then(response => response.data.equity)
        .then(data => {
           //console.log(data);
          setState({data, loading: false}); // set only data
          // console.log('the equity data', data);
          setSampleData(data);
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

  function handleSort() {
    const sortedData = [...sampleData].sort((a, b) => {
      return a.holder_name > b.holder_name ? 1 : -1;
    });
    setSampleData(sortedData);
  }
  //console.log('sample Data', sampleData);
// const result = data.sort(holder_name);
// console.log('sorted result', result);
// const sortComparator = (a, b) => a.platform.localeCompare(b.platform);
// const inverseSortComparator = (a, b) => sortComparator(b, a);

// const onSortByPlatformAsc = () => {
//   setEdata(data => data.slice().sort(sortComparator));
// };
// console.log('sorted onSortByPlatformAsc', onSortByPlatformAsc);

// const onSortByPlatformDesc = () => {
//   setEdata(data => data.slice().sort(inverseSortComparator));
// };
// console.log('sorted onSortByPlatformDesc', onSortByPlatformDesc);
  // console.log('print data', data);
  let assets = '';
  let totalbuyValue = 0;
  let totalcurrentValue = 0;
  let gainLoss = 0;
  let absoluteReturns = 0;
  {
    data &&
      data.map((value, index, array) => {
        totalbuyValue += parseFloat(value.purchase_price);
        totalcurrentValue += parseFloat(value.current_value);
        // console.log(value.asset_type);
        // assets = value.asset_type;
        // console.log(assets);
      });
    gainLoss = totalcurrentValue - totalbuyValue;
  }
  absoluteReturns = parseFloat((gainLoss / totalbuyValue) * 100).toFixed(2);


  // console.log('totalbuyValue', totalbuyValue);
  // console.log('gainLoss', gainLoss);
  // console.log('totalcurrentValue', totalcurrentValue);
  // console.log('absolute Returns', absoluteReturns);

  const renderEquities = ({item, index}) => (
    <View
      style={{
        width: '95%',
        height: 160,
        // marginRight: SIZES.padding1,
        // marginLeft: SIZES.padding1,
        margin: 10,
        marginVertical: 8,
        borderRadius: 10,
        backgroundColor: COLORS.white,
        ...styles.shadow,
      }}>
      <View
        style={{
          flexDirection: 'row',
          padding: 3,
          margin: 10,
          // marginLeft: 30,
          justifyContent: 'space-around',
          alignItems: 'center',
          marginTop: 10,
        }}>
        <View
          style={{
            height: 30,
            width: 40,
            borderRadius: 25,
            backgroundColor: COLORS.lightGrey,
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: SIZES.base,
          }}>
          <Image
            source={require('../../../assets/Images/Networth/ic_equity.png')}
            style={{
              width: 25,
              height: 25,
              tintColor: COLORS.peach,
            }}
          />
        </View>

        <Text
          style={{
           fontSize:16,
           fontWeight:'bold',
           marginLeft:10,
            width: '80%',
            color: COLORS.black,
          }}>
          {item.name}
        </Text>

        <View
          style={{
            height: 30,
            width: 30,
            borderRadius: 15,
            backgroundColor: COLORS.grey2,
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 10,
          }}>
          <Image
            source={{uri: item.image_name}}
            style={{width: 25, height: 25, resizeMode: 'stretch'}}
          />
        </View>
      </View>
      {/* Expense Description */}
      <View
        style={{
          flexDirection: 'row',
          marginBottom: 10,
          justifyContent: 'space-evenly',
        }}>
        {/* Title and description */}
        {/* <Text style={{...FONTS.h3}}>{item.purchase_date}</Text> */}
        <View
          style={{
            alignItems: 'center',
          }}>
          <Text style={{color: COLORS.darkGray, fontWeight:'bold'}}>Buy Value</Text>
          <Text style={{color: COLORS.black, marginTop:5,fontWeight:'bold'}}>
            {(item.purchase_price)}
          </Text>
        </View>

        <View
          style={{
            alignItems: 'center',
          }}>
          <Text style={{color: COLORS.darkGray, fontWeight:'bold'}}>Qty.</Text>
          <Text style={{color: COLORS.black, marginTop:5,fontWeight:'bold'}}>{item.quantity_unit}</Text>
        </View>
        <View
          style={{
            alignItems: 'center',
          }}>
          <Text style={{color: COLORS.darkGray, fontWeight:'bold'}}>Curr. Price</Text>
          <Text style={{color: COLORS.black, marginTop:5, fontWeight:'bold'}}>{item.nav}</Text>
        </View>
        <View
          style={{
            alignItems: 'center',
          }}>
          <Text style={{color: COLORS.darkGray, fontWeight:'bold'}}>Curr. Value</Text>
          <Text style={{color: COLORS.black, marginTop:5,fontWeight:'bold'}}>
            {amountToText(item.current_value)}
          </Text>
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginTop:5
        }}>
        <View
          style={{
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 12, color: COLORS.darkGray, fontWeight:'bold'}}>Percent %</Text>
          <Text style={{...FONTS.h3, color: item.percentage < 0 ? COLORS.red : COLORS.main, fontWeight:'bold'}}>{item.percentage} %</Text>
        </View>
        {/* Location */}
        <View
          style={{
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 12, color: COLORS.darkGray, fontWeight:'bold'}}>Holder Name</Text>
          <View
            style={{flexDirection: 'row', marginTop: 1, alignItems: 'center'}}>
            <Image
              source={imagePath.ic_profile}
              style={{
                width: 20,
                height: 20,
                tintColor: COLORS.main,
                marginRight: 5,
              }}
            />
            <Text
              style={{
                color: COLORS.black,
                ...FONTS.body4,
               fontWeight:'bold'
              }}>
              {item.holder_name}
            </Text>
          </View>
        </View>
      </View>
    </View>
    // <View>
    //   <Text>Name : - {item.name}</Text>
    //   <Text>Current Value : - {item.current_value}</Text>
    //   <Text>Holder Name : - {item.holder_name}</Text>
    //   <Image source={{uri: item.image_name}}
    //   style={{width:20, height: 20, resizeMode : 'stretch'}}
    //   />
    //   {/* <Text>Current Value : -{item.image_name}</Text> */}
    //   <Text>Nav : -{item.nav}</Text>
    //   <Text>percentage : -{item.percentage}</Text>
    //   <Text>Purchase Date : -{item.purchase_date}</Text>
    //   <Text>Purchase Price : -{item.purchase_price}</Text>
    //   <Text>Quantity : -{item.quantity_unit}</Text>
    //   <View
    //   style={{height:1, width:'100%', backgroundColor:COLORS.black}}
    // />
    // </View>
  );

  useEffect(() => {
    fetchAPI();
  }, []); // use `[]` to avoid multiple side effect
  return (
    <View style={{marginBottom:450}}>
      <SafeAreaView style={{}}>
        <HeaderComponent goBack={() => navigation.goBack()} text="Equity" />
        {/* <Text style={{...FONTS.h2, margin: 20,}}>Equity</Text> */}

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            height:80,
            width:'100%',
            backgroundColor:COLORS.main,
            padding:10,
            alignItems:'center',
            marginBottom:10
          }}>
          <View style={{alignItems:'center', margin:8}}>
            <Text style={{color:COLORS.white}}>Buy Value</Text>
            <Text  style={{color:COLORS.white, marginTop:5}}>{amountToText(totalbuyValue)}</Text>
          </View>
          <View style={{alignItems:'center', margin:8}}>
            <Text style={{color:COLORS.white}}>Curr. Value</Text>
            <Text style={{color:COLORS.white, marginTop:5}}>{amountToText(totalcurrentValue)}</Text>
          </View>
          <View style={{alignItems:'center', margin:8}}>
            <Text style={{color:COLORS.white}}>GainLoss</Text>
            <Text style={{color:COLORS.white, marginTop:5}}>{amountToText(gainLoss)}</Text>
          </View>
          <View style={{alignItems:'center', margin:8}}>
            <Text style={{color:COLORS.white}}>Abs. Ret.</Text>
            <Text style={{color:COLORS.white, marginTop:5}}>{amountToText(absoluteReturns)}</Text>
          </View>
        </View>


      <View style={{flexDirection:'row', justifyContent:'space-between'}}>
              <View>
              <RenderTitle title="EQUITY SECTION"/>
              </View>
              <View style={{marginTop:3}}>
                <Button 
                color='#a7ce51'
                onPress={handleSort}>Sort A-Z</Button>
              </View>
            </View>

        <FlatList
          data={sampleData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderEquities}
          contentContainerStyle={{}}
        />
      </SafeAreaView>
    </View>
  );
};

export default Equity;

{
  /* <>
{isLoading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <SkypeIndicator color="#a7ce51" count={5} size={80} />
        </View>
      ) : (

      )
</> */
}
