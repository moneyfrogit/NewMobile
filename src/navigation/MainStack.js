import React from 'react';
import navigationStrings from '../constants/navigationStrings';
import TabRoutes from './TabRoutes';
import {
  Share,
  PayoutAlerts,
  TermsNConditions,
  ChangePassword,
  Demo,
  Logout,
  Calculators,
  ChatWithAdvisors,
  ReferAndEarn,
  RateUs,
  WhatWeOffer,
  PrivacyPolicy,
} from '../screens';
import {
  createDrawerNavigator,
  DrawerItem,
  useDrawerStatus,
} from '@react-navigation/drawer';
import CustomDrawer from '../components/CustomDrawer';
import {color} from 'react-native-reanimated';
import imagePath from '../constants/imagePath';
import {Image, View, Text, StyleSheet, ImageBackground, TouchableOpacity} from 'react-native';
import linking from '../services/Linking';
import {AuthContext} from '../screens/AuthScreens/Context';
import { FONTS } from '../constants/theme';
import { Use } from 'react-native-svg';
// import {} from '../../';

const Drawer = createDrawerNavigator();

export default function (Stack) {
  const {signOut} = React.useContext(AuthContext);

  return (
    <>
      <Drawer.Navigator
        screenOptions={{
          headerShown: false,
          drawerActiveTintColor: 'white',
          drawerActiveBackgroundColor: '#a7ce51',
          drawerInactiveTintColor: '#333',
          drawerLabelStyle: {marginLeft: -25},
        }}
        drawerContent={props => <CustomDrawer {...props} />}>
        <Drawer.Screen
          component={TabRoutes}
          name={navigationStrings.HOMESCREEN}
          options={{
            groupName: 'Home',
            drawerIcon: ({color}) => (
              <Image
                style={{resizeMode: 'contain', width: 24, height: 24}}
                source={imagePath.icDashboard}
              />
            ),
          }}
        />
        <Drawer.Screen
          component={PayoutAlerts}
          name={navigationStrings.PAYOUTALERTS}
          options={{
            drawerIcon: ({color}) => (
              <Image
                style={{resizeMode: 'contain', width: 24, height: 24}}
                source={imagePath.ic_payoutalerts}
              />
            ),
          }}
        />
        <Drawer.Screen
          component={ChatWithAdvisors}
          name={navigationStrings.CHATWITHADVISORS}
          options={{
            drawerIcon: ({color}) => (
              <Image
                style={{resizeMode: 'contain', width: 24, height: 24}}
                source={imagePath.ic_chatwithadvisor}
              />
            ),
          }}
        />

        <Drawer.Screen
          component={Demo}
          name={navigationStrings.DEMO}
          options={{
            drawerIcon: ({color}) => (
              <Image
                style={{resizeMode: 'contain', width: 24, height: 24}}
                source={imagePath.ic_demo}
              />
            ),
          }}
        />

        <Drawer.Screen
          component={WhatWeOffer}
          name={navigationStrings.WHATWEOFFER}
          options={{
            drawerIcon: ({color}) => (
              <Image
                style={{resizeMode: 'contain', width: 24, height: 24}}
                source={imagePath.ic_subscription}
              />
            ),
          }}
        />
        {/* <Drawer.Screen
          component={Calculators}
          name={navigationStrings.CALCULATORS}
          options={{
            drawerIcon: ({color}) => (
              <Image
                style={{resizeMode: 'contain', width: 24, height: 24}}
                source={imagePath.ic_calculator}
              />
            ),
          }}
        /> */}
        {/* <Drawer.Screen
          component={ChangePassword}
          name={navigationStrings.CHANGEPASSWORD}
          options={{
            drawerIcon: ({color}) => (
              <Image
                style={{resizeMode: 'contain', width: 24, height: 24}}
                source={imagePath.ic_changepassword}
              />
            ),
          }}
        /> */}
        <Drawer.Screen
          component={TermsNConditions}
          name={navigationStrings.TERMSNCONDITIONS}
          options={{
            drawerIcon: ({color}) => (
              <Image
                style={{resizeMode: 'contain', width: 24, height: 24}}
                source={imagePath.ic_termsnconditions}
              />
            ),
          }}
        />

        <Drawer.Screen
          component={PrivacyPolicy}
          name="Privacy Policy"
          options={{
            drawerIcon: ({color}) => (
              <Image
                style={{resizeMode: 'contain', width: 24, height: 24}}
                source={imagePath.ic_privacypolicy}
              />
            ),
          }}
        />

        <Drawer.Screen
          component={ReferAndEarn}
          name="Refer & Earn"
          options={{
            drawerIcon: ({color}) => (
              <Image
                style={{resizeMode: 'contain', width: 24, height: 24}}
                source={imagePath.ic_referus}
              />
            ),
          }}
        />
        {/* <Drawer.Screen
          component={Share}
          name={navigationStrings.SHARE}
          options={{
            drawerIcon: ({color}) => (
              <Image
                style={{resizeMode: 'contain', width: 24, height: 24}}
                source={imagePath.ic_share}
              />
            ),
          }}
        /> */}

        <Drawer.Screen
          component={RateUs}
          name="Rate us"
          options={{
            drawerIcon: ({color}) => (
              <Image
                style={{resizeMode: 'contain', width: 24, height: 24}}
                source={imagePath.ic_rateus}
              />
            ),
          }}
        />

        {/* <Drawer.Screen
          component={Logout}
          name={navigationStrings.LOGOUT}
          options={{
            drawerIcon: ({color}) => (
              <Image
                style={{resizeMode: 'contain', width: 24, height: 24}}
                source={imagePath.ic_logout}
              />
            ),
          }}
        /> */}
      </Drawer.Navigator>

      {/* <Stack.Screen name={navigationStrings.USERPROFILE} component={User} /> */}
      {/* <Stack.Screen name={navigationStrings.TABS} component={TabRoutes} />
      <Stack.Screen name={navigationStrings.DASHBOARDDETAILS} component={DashboardDetails} />
      <Stack.Screen name={navigationStrings.TRANSACTIONS} component={Transactions} />
      <Stack.Screen name={navigationStrings.HOME} component={Home} />
      <Stack.Screen name={navigationStrings.DASHBOARD} component={Dashboard} /> */}
    </>
  );
}
