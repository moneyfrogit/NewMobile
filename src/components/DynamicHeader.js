import * as React from 'react';
import {Text, View, StyleSheet, Animated} from 'react-native';
import { COLORS } from '../constants/theme';
import {amountToText} from '../utils/Amounts';

const Header_Max_Height = 170;
const Header_Min_Height = 90;

export default function DynamicHeader({
  animHeaderValue,
  name,
  unit,
  buyvalue,
  xirr,
  nav,
  plan,
  currentvalue,
}) {
  const animateHeaderBackgroundColor = animHeaderValue.interpolate({
    inputRange: [0, Header_Max_Height - Header_Min_Height],
    outputRange: ['#6290c2', '#a7ce51'],
    extrapolate: 'clamp',
  });

  const animateHeaderHeight = animHeaderValue.interpolate({
    inputRange: [0, Header_Max_Height - Header_Min_Height],
    outputRange: [Header_Max_Height, Header_Min_Height],
    extrapolate: 'clamp',
  });

  return (
    <Animated.View
      style={[
        styles.header,
        {
          height: animateHeaderHeight,
          backgroundColor: animateHeaderBackgroundColor,
        },
      ]}>
      <View style={{margin: 5}}>
        <Text style={styles.headerText}>{JSON.parse(name)}</Text>
        <Text style={{
          fontSize:12, 
          justifyContent:'center',
          // alignItems:'center',
          textAlign: 'center',
          color:COLORS.white,
          fontWeight:'bold'
          }}>You own {unit} units</Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 5,
        }}>
        <View style={{alignItems: 'center',marginHorizontal:15, }}>
          <Text style={{color:COLORS.white, fontSize:12, fontWeight:'bold'}}>BUY VALUE</Text>
          <Text style={{marginTop:5, fontWeight:'bold'}}>{amountToText(buyvalue)}</Text>
        </View>
        <View style={{alignItems: 'center',marginHorizontal:15}}>
          <Text style={{color:COLORS.white, fontSize:12, fontWeight:'bold'}}>CURRENT VALUE</Text>
          <Text style={{marginTop:5,fontWeight:'bold'}}>{amountToText(currentvalue)}</Text>
        </View>
        <View style={{alignItems: 'center',marginHorizontal:15 }}>
          <Text style={{color:COLORS.white, fontSize:12, fontWeight:'bold'}}>XIRR</Text>
          <Text style={{marginTop:5,fontWeight:'bold'}}>{xirr}</Text>
        </View>
        <View style={{alignItems: 'center',marginHorizontal:15 }}>
          <Text style={{color:COLORS.white, fontSize:12, fontWeight:'bold'}}>NAV</Text>
          <Text style={{marginTop:5, fontWeight:'bold'}}>{nav}</Text>
        </View>
      </View>

      {/* <Text style={styles.headerText}>Plan :- {plan}</Text> */}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    left: 0,
    right: 0,
    borderRadius:5
  },
  headerText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
