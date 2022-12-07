import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import navigationStrings from '../constants/navigationStrings';
import {
  DashboardDetails,
  DashboardScreen,
  HomeScreen,
  Readers,
  Readings,
  ReadingsScreen,
  Transactions,
} from '../screens';
import MutualFunds from '../screens/MutualFunds/MutualFunds';

const Stack = createNativeStackNavigator();

export default function ReadingsStack() {
  return (
    <Stack.Navigator initialRouteName={navigationStrings.READERS} screenOptions={{headerShown: false}}>
      <Stack.Screen name={navigationStrings.READERS} component={Readers} />
      <Stack.Screen name={navigationStrings.HOMESCREEN} component={HomeScreen} />
      <Stack.Screen name={navigationStrings.DASHBOARDSCREEN} component={DashboardScreen} />
      <Stack.Screen name={navigationStrings.READINGSSCREEN} component={ReadingsScreen} />
      <Stack.Screen
        name={navigationStrings.TRANSACTIONS}
        component={Transactions}
      />
      <Stack.Screen
        name={navigationStrings.DASHBOARDDETAILS}
        component={DashboardDetails}
      />
       <Stack.Screen name={navigationStrings.MUTUALFUNDS} component={MutualFunds} />
    </Stack.Navigator>
  );
}
