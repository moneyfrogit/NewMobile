import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Animated,
  Text,
  View,
  Linking,
} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import styles from './Styles';
import HeaderComponent from '../../components/HeaderComponent';
import {COLORS, FONTS} from '../../constants/theme';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Button} from 'react-native-paper';
import imagePath from '../../constants/imagePath';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Modal from 'react-native-modal';
import DynamicHeader from '../../components/DynamicHeader';
import {DATA} from '../../modal/dataa';
import RenderTitle from '../../components/RenderTitle';
import * as Progress from 'react-native-progress';
import {amountToText, replaceNumberWithCommas} from '../../utils/Amounts';
import {WebView} from 'react-native-webview';
import {replace} from '../../utils/Replace';
import BuyMutualFunds from '../BuyMutualFund/BuyMutualFunds';
import navigationStrings from '../../constants/navigationStrings';

const MutualFunds = ({navigation, route}) => {
  const {data} = route.params;
  const [mfdata, setMfdata] = useState('');
  const [userID, setUserID] = useState('');
  const [state, setState] = useState({data: [], loading: false}); // only one data source
  const {dataa, loading} = state;
  const regex = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/g;
  const [str, setStr] = useState('(in)[fi]ni`tb*il#it%y');
  const [per, setPer] = useState('');
  const [showWebView, setShowWebView] = useState(false);
  let percentage = data.percentage / 100;
  // console.log('params', data);

  const fetchAPI = async () => {
    try {
      const userID = await AsyncStorage.getItem('userId');
      setUserID(userID);
      setState({dataa: [], loading: true});
      let mfId = data.mf_id;
      axios
        .get(
          'https://moneyfrog.in/app_api_controller/get_transactions?user_id=' +
            userID +
            '&mf_id=' +
            mfId,
        )
        .then(response => response.data.data)
        .then(dataa => {
          //console.log(dataa);
          setState({dataa, loading: false}); // set only data
          setPer(percentage);
          setMfdata(data);
        })
        .catch(function (error) {
          // handle error
          if (error.response === '1') {
            console.log('MF Transaction summary error 1', response.error);
          } else if (error.response === '0') {
            console.log('MF Transaction summary error 0');
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

  const scrollOffsetY = useRef(new Animated.Value(0)).current;

  const BuyMF = () => {
    // const uri = data.holder_name;
    // const encoded = encodeURI(uri);

    const id = userID;
    const amcName = encodeURI(data.amc);
    const schemeName = encodeURI(data.scheme_name);
    const camsCode = data.nse_code;
    const hashEt = data.hash_et;
    const folioNumber = encodeURI(data.folio_no);
    //const folioNumber = replace((data.folio_no))
    const broughtThru = data.brought_thru;
    const holderName = encodeURI(data.holder_name);
    //const holderName = replace((data.holder_name))
    const link =
      'https://moneyfrog.in/nse-buynow/' +
      userID +
      '?purchase_type=Buy&amc_name=' +
      amcName +
      '&scheme_name=' +
      schemeName +
      '&cams_code=' +
      camsCode +
      '&click_from=detailed&brought_thru=' +
      broughtThru +
      '&folio_no=' +
      folioNumber +
      '&holder_first_name=' +
      holderName +
      '&hash_et=' +
      hashEt;
    console.log(link);
    return <WebView source={{uri: link}} startInLoadingState />;
  };

  useEffect(() => {
    fetchAPI();
  }, []); // use `[]` to avoid multiple side effect

  const renderTransactions = ({item, index}) => (
    <View style={styles.listIteemContainer}>
      <View style={styles.itemtext}>
        <Text style={styles.itemVal}>{item.purchase_date}</Text>
      </View>
      <View style={styles.itemtext}>
        <Text style={styles.itemVal}>{item.purchase_type}</Text>
      </View>
      <View style={styles.itemtext}>
        <Text style={styles.itemVal}>{item.purchase_nav}</Text>
      </View>
      <View style={styles.itemtext}>
        <Text style={styles.itemVal}>
          {'\u20B9 ' + replaceNumberWithCommas(item.purchase_amount)}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <HeaderComponent
        text="BuySell"
        bgcolor="#194868"
        goBack={() => navigation.goBack()}
      />
      <DynamicHeader
        animHeaderValue={scrollOffsetY}
        name={JSON.stringify(data.scheme_name)}
        unit={data.current_unit}
        buyvalue={data.buy_value}
        plan={data.plan_type}
        xirr={data.xirr}
        nav={data.nav}
        currentvalue={data.current_value}
      />

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          marginBottom: 10,
        }}>
        {/* <Text>brought_thru :- {data.brought_thru}</Text> */}
        <View style={{marginTop: 10}}>
          <Text style={{color: COLORS.darkGray, fontWeight:'bold'}}>
            MF Type : {data.mf_type} {'-'} {data.asset_type}{' '}
          </Text>
          <Text style={{color: COLORS.darkGray, fontWeight:'bold'}}>SIP start Date : {data.SIP_start_Date}</Text>
          <Text style={{color: COLORS.darkGray, fontWeight:'bold'}}>Plan : {data.plan}</Text>
        </View>
        <View style={{}}>
          <Progress.Circle
            style={{
              marginTop: 10,
            }}
            thickness={6}
            showsText={true}
            size={60}
            color="blue"
            textStyle={{fontSize: 20}}
            progress={per}
            width={70}
            // unfilledColor={'#a7ce51'}
          />
        </View>
      </View>

      <ScrollView
        nestedScrollEnabled
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollOffsetY}}}],
          {useNativeDriver: false},
        )}>
        <RenderTitle title="TRANSACTION DETAILS" />
        <View style={styles.listItemContainer}>
          <View style={styles.itemtext}>
            <Text style={styles.fixedHeader}>Date</Text>
          </View>
          <View style={styles.itemtext}>
            <Text style={styles.fixedHeader}>Type</Text>
          </View>
          <View style={styles.itemtext}>
            <Text style={styles.fixedHeader}>NAV</Text>
          </View>
          <View style={styles.itemtext}>
            <Text style={styles.fixedHeader}>Amount</Text>
          </View>
        </View>

        <FlatList
          data={dataa}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderTransactions}
          nestedScrollEnabled
        />
      </ScrollView>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          paddingBottom: 55,
          paddingTop: 5,
          backgroundColor: COLORS.lightGrey,
        }}>
        <Button
          icon={({size, color}) => (
            <Image
              source={imagePath.ic_redeem}
              style={{
                width: 30,
                height: 30,
                tintColor: COLORS.black,
                borderRadius: 10,
              }}
            />
          )}
          color={COLORS.red}
          contentStyle={{
            borderRadius: 20,
          }}
          style={{
            borderRadius: 10,
            width: '45%',
            height: 40,
          }}
          mode="contained"
          labelStyle={{
            color: COLORS.white,
            fontSize: 16,
            alignItems: 'center',
          }}
          dark
          compact
          //disabled
          onPress={() =>
            navigation.navigate(navigationStrings.REDEEMMUTUALFUNDS, {
              dataaa: mfdata,
            })
          }>
          Redeem
        </Button>

        <Button
          icon={({size, color}) => (
            <Image
              source={imagePath.ic_investmore}
              style={{
                width: 30,
                height: 30,
                tintColor: COLORS.black,
              }}
            />
          )}
          color={COLORS.main}
          style={{
            borderRadius: 10,
            width: '45%',
            height: 40,
          }}
          mode="contained"
          compact
          dark
          labelStyle={{
            color: COLORS.white,
            fontSize: 16,
          }}
          onPress={() =>
            navigation.navigate(navigationStrings.BUYMUTUALFUNDS, {
              dataaa: mfdata,
            })
          }>
          <Text>Invest More</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default MutualFunds;
