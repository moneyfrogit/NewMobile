import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import navigationStrings from '../constants/navigationStrings';
import {Home, Dashboard, DashboardDetails, Transactions, Networth, NetworthScreen, Notifications} from '../screens';
import MutualFunds from '../screens/MutualFunds/MutualFunds';
import AllMutualFunds from '../screens/AllMutualFunds/AllMutualFunds';
import Equity from '../screens/TotalNetworthScreens/Equity/Equity';
import FixedIncome from '../screens/TotalNetworthScreens/FixedIncome/FixedIncome';
import Insurance from '../screens/TotalNetworthScreens/Insuarance/Insurance';
import Bullions from '../screens/TotalNetworthScreens/Bullions/Bullions';
import RealEstate from '../screens/TotalNetworthScreens/RealEstate/RealEstate';
import Loans from '../screens/TotalNetworthScreens/Loans/Loans';

const Stack = createNativeStackNavigator();

export default function NetworthStack() {
  return (
    <Stack.Navigator initialRouteName={navigationStrings.NOTIFICATIONS} screenOptions={{headerShown: false}}>
           <Stack.Screen name={navigationStrings.NOTIFICATIONS} component={Notifications} />
      <Stack.Screen name={navigationStrings.NETWORTHSCREEN} component={NetworthScreen} />
      <Stack.Screen name={navigationStrings.ALLMUTUALFUNDS} component={AllMutualFunds} />
      <Stack.Screen name={navigationStrings.EQUITY} component={Equity} />
      <Stack.Screen name={navigationStrings.FIXEDINCOME} component={FixedIncome} />
      <Stack.Screen name={navigationStrings.INSURANCE} component={Insurance} />
      <Stack.Screen name={navigationStrings.BULLIONS} component={Bullions} />
      <Stack.Screen name={navigationStrings.REALESTATE} component={RealEstate} />
      <Stack.Screen name={navigationStrings.LOANS} component={Loans} />
    </Stack.Navigator>
  );
}
