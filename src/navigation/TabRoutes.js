import React from 'react';
import navigationStrings from '../constants/navigationStrings';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import imagePath from '../constants/imagePath';
import { Image } from 'react-native';
import DashboardStack from './DashboardStack';
import BuySellStack from './BuySellStack';
import ReadingsStack from './ReadingsStack';
import GoalsStack from './GoalsStack';
import NetworthStack from './NetworthStack';
import linking from '../services/Linking';
import { COLORS } from '../constants/theme';

const Tab = createBottomTabNavigator();

function TabRoutes() {
  return (
    <Tab.Navigator
      screenOptions={{
          headerShown: false,
          tabBarActiveTintColor:'#a7ce51',
          tabBarStyle:{
              position:'absolute',
              backgroundColor:COLORS.lightGrey3,
              borderRadius: 5
          }
    }}
      initialRouteName="Dashboard">
      <Tab.Screen
     name="Alerts" component={NetworthStack}
     options = {{
         tabBarIcon: ({focused})=>{
             return(
                 <Image 
                 style={{resizeMode:"contain",width: 24,
                 height: 24}}
                 source = {focused ? imagePath.icAlerts: imagePath.icAlerts}/>
             )
         }
     }}
     />
      <Tab.Screen
           options = {{
            tabBarIcon: ({focused})=>{
                return(
                    <Image 
                    style={{ resizeMode:"contain",width: 24,
                    height: 24}}
                    source = {focused ? imagePath.icGoals_Active: imagePath.icGoals}/>
                )
            }
        }}
     name={navigationStrings.GOALSSCREEN} component={GoalsStack} 
     />
      <Tab.Screen 
                 options = {{
                    tabBarIcon: ({focused})=>{
                        return(
                            <Image 
                            style={{resizeMode:"contain",width: 24,
                            height: 24}}
                            source = {focused ? imagePath.icDashboard_Active: imagePath.icDashboard }/>
                        )
                    }
                }}
      name="Dashboard" component={DashboardStack}
       />
      <Tab.Screen
                 options = {{
                    tabBarIcon: ({focused})=>{
                        return(
                            <Image 
                            style={{resizeMode:"contain",width: 24,
                            height: 24}}
                            source = {focused ? imagePath.icBuySell_Active: imagePath.icBuySell}/>
                        )
                    }
                }}
      name="BuySell" component={BuySellStack}
       />
      <Tab.Screen 
                 options = {{
                    tabBarIcon: ({focused})=>{
                        return(
                            <Image
                            style={{resizeMode:"contain",width: 24,
                            height: 24}}
                            source = {focused ? imagePath.icReadings_Active: imagePath.icReadings}/>
                        )
                    }
                }}
      name="Readings" component={ReadingsStack} 
      />
    </Tab.Navigator>
  );
}

export default TabRoutes;
