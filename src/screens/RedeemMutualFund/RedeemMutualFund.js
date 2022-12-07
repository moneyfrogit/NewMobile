import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import WebView from 'react-native-webview'
import HeaderComponent from '../../components/HeaderComponent'
import AsyncStorage from '@react-native-async-storage/async-storage'

const RedeemMutualFund = ({navigation, route}) => {
  const {dataaa} = route.params;
  const [userID, setUserID] = useState('');
  console.log('dataa', dataaa);

  const readData = async () => {
    try {
        const userID = await AsyncStorage.getItem('userId');
      setUserID(userID);
    //   alert('Data successfully get')
    } catch (e) {
      alert('Failed to save the data to the storage')
    }
  }

//   const userID =  AsyncStorage.getItem('userId');
  console.log('user ID', userID);
  const amcName = encodeURI(dataaa.amc);
  const schemeName = encodeURI(dataaa.scheme_name);
  const camsCode = dataaa.nse_code;
  const hashEt = dataaa.hash_et;
  const folioNumber = encodeURI(dataaa.folio_no);
  //const folioNumber = replace((data.folio_no))
  const broughtThru = dataaa.brought_thru;
  const holderName = encodeURI(dataaa.holder_name);
  //const holderName = replace((data.holder_name))
  const link =
    'https://moneyfrog.in/nse-buynow/' +
    userID +
    '?purchase_type=Sell&amc_name=' +
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
  

  useEffect(() => {
    readData();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
        <HeaderComponent text="SELL" goBack={() => navigation.goBack()} />
      <WebView
        // ref={webViewRef}
        source={{
          uri: link,
        }}
        startInLoadingState
      />
    </SafeAreaView>
  )
}

export default RedeemMutualFund

const styles = StyleSheet.create({})


// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react';
// import styles from './Styles';

// const RedeemMutualFund = () => {
//   return (
//     <View>
//       <Text>RedeemMutualFund</Text>
//     </View>
//   )
// }

// export default RedeemMutualFund

// import React, { Component } from 'react';
// import {WebView} from 'react-native-webview';
// import {replace} from '../services/Replace'
// import AsyncStorage from '@react-native-community/async-storage';

// let userId=''
// export default class Redeem extends Component {
//   constructor(props) {
// 		super(props);
//     this.state = {
//       userId:''
//     }
//   }
//   async componentDidMount() {
//       const userId = await AsyncStorage.getItem('userId')   
//       this.setState({userId:userId})      
//   }

//   render() {
//     const id= this.state.userId
//     const amcName = encodeURI(this.props.navigation.getParam('amcName', ''))
//     const schemeName = encodeURI(this.props.navigation.getParam('schemeName', ''))
//     const camsCode = this.props.navigation.getParam('camsCode', '')
//     const hashEt = this.props.navigation.getParam('hashEt', '')
//     const folioNumber = replace(this.props.navigation.getParam('folioNumber', ''))
//     const broughtThru = this.props.navigation.getParam('broughtThru', '')
//     const holderName = replace(this.props.navigation.getParam('holderName', ''))
//     const link = 'https://moneyfrog.in/nse-buynow/'+id+'?purchase_type=Sell&amc_name='+amcName+'&scheme_name='+schemeName+'&cams_code='+camsCode+'&click_from=detailed&brought_thru='+broughtThru+'&folio_no='+folioNumber+'&holder_first_name='+holderName+'&hash_et='+hashEt
       
//     return (
//       <WebView
//         source={{uri: link}}
//         startInLoadingState={true}
//       />
//     );
//   }
// }
 