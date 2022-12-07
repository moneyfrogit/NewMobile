import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import navigationStrings from '../constants/navigationStrings';
import {DashboardDetails, Transactions, HomeScreen, DashboardScreen, NetworthScreen, BuySellScreen } from '../screens';
import FixedIncome from '../screens/TotalNetworthScreens/FixedIncome/FixedIncome';
import AllMutualFunds from '../screens/AllMutualFunds/AllMutualFunds';
import Equity from '../screens/TotalNetworthScreens/Equity/Equity';
import Insurance from '../screens/TotalNetworthScreens/Insuarance/Insurance';
import Bullions from '../screens/TotalNetworthScreens/Bullions/Bullions';
import RealEstate from '../screens/TotalNetworthScreens/RealEstate/RealEstate';
import Loans from '../screens/TotalNetworthScreens/Loans/Loans';
import UserProfile from '../screens/Profile/UserProfile/UserProfile';
import FathersDetails from '../screens/Profile/FathersDetails/FatherDetails';
import KidsDetails from '../screens/Profile/KidsDetails/KidsDetails';
import MotherDetails from '../screens/Profile/MotherDetails/MothersDetails';
import PersonalDetails from '../screens/Profile/PersonalDetails/PersonalDetails';
import SiblingsDetails from '../screens/Profile/SiblingsDetails/SiblingsDetails';
import SpouseDetails from '../screens/Profile/SpouseDetails/SpouseDetails';

const Stack = createNativeStackNavigator();

export default function DashboardStack() {
    return (
    <Stack.Navigator initialRouteName="HomeScreen" screenOptions={{headerShown: false}} >
        <Stack.Screen name={navigationStrings.HOMESCREEN} component={HomeScreen} />
        <Stack.Screen name={navigationStrings.DASHBOARDSCREEN} component={DashboardScreen} />
        <Stack.Screen name={navigationStrings.TRANSACTIONS} component={Transactions} />
        <Stack.Screen name={navigationStrings.DASHBOARDDETAILS} component={DashboardDetails} />
        <Stack.Screen name={navigationStrings.FIXEDINCOME} component={FixedIncome} />
        <Stack.Screen name={navigationStrings.ALLMUTUALFUNDS} component={AllMutualFunds} />
        <Stack.Screen name={navigationStrings.EQUITY} component={Equity} />
        <Stack.Screen name={navigationStrings.NETWORTHSCREEN} component={NetworthScreen} />
        <Stack.Screen name={navigationStrings.INSURANCE} component={Insurance} />
        <Stack.Screen name={navigationStrings.BULLIONS} component={Bullions} />
        <Stack.Screen name={navigationStrings.REALESTATE} component={RealEstate} />
        <Stack.Screen name={navigationStrings.LOANS} component={Loans} />
        <Stack.Screen name={navigationStrings.BUYSELLSCREEN} component={BuySellScreen} />
        <Stack.Screen name={navigationStrings.USERPROFILE} component={UserProfile} />
        <Stack.Screen name={navigationStrings.PERSONALDETAILS} component={PersonalDetails} />
        <Stack.Screen name={navigationStrings.SPOUSEDETAILS} component={SpouseDetails} />
        <Stack.Screen name={navigationStrings.FATHERDETAILS} component={FathersDetails} />
        <Stack.Screen name={navigationStrings.MOTHERDETAILS} component={MotherDetails} />
        <Stack.Screen name={navigationStrings.KIDSDETAILS} component={KidsDetails} />
        <Stack.Screen name={navigationStrings.SIBLINGSDETAILS} component={SiblingsDetails} />
    </Stack.Navigator>
    );
}