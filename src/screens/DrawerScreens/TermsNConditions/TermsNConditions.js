import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import styles from './Styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import HeaderComponent from '../../../components/HeaderComponent';
import HeaderSimple from '../../../components/HeaderSimple';
import {WebView} from 'react-native-webview';

function LoadingIndicatorView() {
  return <ActivityIndicator color='#009b88' size='large' />
}

export default function TermsNConditions({ navigation }){
  return (
      <SafeAreaView style={{flex: 1, backgroundColor:'white'}}>
      <HeaderComponent goBack={() => navigation.goBack()} text="Terms And Conditions" />
      
      <WebView
        originWhitelist={['*']}
        source={{uri: 'https://moneyfrog.in/home/mob_terms_n_condition'}}
        // source={{ uri: 'https://instamobile.io/blog' }}
         renderLoading={LoadingIndicatorView}
        startInLoadingState={true}
      />
      </SafeAreaView>
  )
}