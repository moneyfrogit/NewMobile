import {StyleSheet, Text, View, Linking, Alert} from 'react-native';
import React,{useEffect } from 'react';
import Routes from './src/navigation/Routes';
import { isMountedRef, navigate, navigationRef } from './src/navigation/RootNavigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import NavigationService from './src/navigation/NavigationService';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import navigationStrings from './src/constants/navigationStrings';
import linking from './src/services/Linking';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BuySellScreen, DashboardDetails, DashboardScreen, GoalsScreen, NetworthScreen, ReadingsScreen, SubGoals } from './src/screens';
import DashboardStack from './src/navigation/DashboardStack';
import { AuthContext, AuthProvider } from './src/screens/AuthScreens/Context';
import { requestUserPermission, notificationListener } from '../moneyfrog/src/utils/NotificationService';

const App = () => {

// We call this function in useEffect to render it everytime the app opens
  useEffect(() => {
    requestUserPermission();
    notificationListener();
    dynamicLinks().getInitialLink().then((link) => {
      handleDynamicLink(link)
    })
    const linkingListener = dynamicLinks().onLink(handleDynamicLink);
    return () => {
      linkingListener();
    }
  }, [])

// Handling the incoming request of dynamic link here for eg. Action to Navigate
  const handleDynamicLink = (link) => {
    console.log(link)
    if (!!link?.url) {
      let getId = 123
      let urlroute = link.url?.split('=').pop()
      console.log('Url route', urlroute)
      let path = GoalsScreen
      console.log("user id", getId)
      setTimeout(() => {
      NavigationService.navigate(urlroute)
      }, 1000);
    }
  }


  return (

     <SafeAreaProvider style={{ flex: 1, backgroundColor: 'white' }}>
      <Routes />   
     </SafeAreaProvider>
  );
};
 
export default App;























//UI Ref => https://www.youtube.com/watch?v=uBcpWOQqbAQ



//Auth Reference
//  https://www.youtube.com/watch?v=Ua3EfRlxQ-E&list=PLKMBdMB0RTgYHIAihV9jj5pQwkoAdxRSr&index=25
//https://www.youtube.com/watch?v=ZxP-0xbz5sg
//https://www.youtube.com/watch?v=CQYYcYhJMoQ


//App Header and Drawer
//https://www.youtube.com/watch?v=i1oqOrxE_1g
//https://www.youtube.com/watch?v=m7Tmsw1sfhk