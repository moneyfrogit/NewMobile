import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import navigationStrings from '../constants/navigationStrings';
import {BuySellScreen, Transactions } from '../screens';
import AllMutualFunds from '../screens/AllMutualFunds/AllMutualFunds';
import MutualFunds from '../screens/MutualFunds/MutualFunds';
import MutualFundComponent from '../components/BuySell/MutualFundComponent';
import BuyMutualFunds from '../screens/BuyMutualFund/BuyMutualFunds';
import RedeemMutualFund from '../screens/RedeemMutualFund/RedeemMutualFund';


const Stack = createNativeStackNavigator();

export default function BuySellStack() {
    return (
    <Stack.Navigator initialRouteName={navigationStrings.BUYSELLSCREEN} screenOptions={{headerShown: false}} >
        <Stack.Screen name={navigationStrings.BUYSELLSCREEN} component={BuySellScreen} />
        <Stack.Screen name={navigationStrings.TRANSACTIONS} component={Transactions} />
        <Stack.Screen name={navigationStrings.ALLMUTUALFUNDS} component={AllMutualFunds} />
        <Stack.Screen name={navigationStrings.MUTUALFUNDS} component={MutualFunds} />
        <Stack.Screen name={navigationStrings.BUYMUTUALFUNDS} component={BuyMutualFunds} />
        <Stack.Screen name={navigationStrings.REDEEMMUTUALFUNDS} component={RedeemMutualFund} />
    </Stack.Navigator>
    );
}