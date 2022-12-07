import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import navigationStrings from '../constants/navigationStrings';
import { Home, Dashboard, DashboardDetails, Transactions, Goals, SubGoals, Goal, GoalsScreen } from '../screens';


const Stack = createNativeStackNavigator();

export default function GoalsStack() {
    return (
    <Stack.Navigator screenOptions={{headerShown: false}} >
        <Stack.Screen name={navigationStrings.GOALSSCREEN} component={GoalsScreen} />
        <Stack.Screen name={navigationStrings.SUBGOALS} component={SubGoals} />
    </Stack.Navigator>
    );
}