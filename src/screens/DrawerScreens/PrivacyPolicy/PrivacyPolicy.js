import React, {Component} from 'react';
import {StyleSheet, ScrollView, Text, View, SafeAreaView, ActivityIndicator} from 'react-native';
import {WebView} from 'react-native-webview';
import HeaderComponent from '../../../components/HeaderComponent';
import NavigationService from '../../../navigation/NavigationService';

 function LoadingIndicatorView() {
    return <ActivityIndicator color='#009b88' size='large' />
  }

export default function PrivacyPolicy({navigation, route}) {
  return (
    <SafeAreaView
      style={{flex: 1}}>
      <HeaderComponent text="Privacy Policy" goBack = {()=>navigation.goBack()}/>
      {/* <WebView
        source={{uri: 'https://moneyfrog.in/privacy'}}
        startInLoadingState={true}
      /> */}

      <WebView
        originWhitelist={['*']}
        source={{uri: 'https://moneyfrog.in/privacy'}}
        // source={{ uri: 'https://instamobile.io/blog' }}
         renderLoading={LoadingIndicatorView}
        startInLoadingState={true}
      />
    </SafeAreaView>
  );
}
