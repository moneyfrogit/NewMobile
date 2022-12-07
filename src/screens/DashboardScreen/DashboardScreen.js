import {StyleSheet, Text, View} from 'react-native';
import React, {Component} from 'react';
import styles from './Styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import HeaderComponent from '../../components/HeaderComponent';
import ButtonComponent from '../../components/ButtonComponent';
import navigationStrings from '../../constants/navigationStrings';
import HeaderSimple from '../../components/HeaderSimple';
import HeaderComp from '../../components/HeaderSimple';
import AppHeader from '../../components/HeaderSimple';
import Colors from '../../constants/Colors';

const DashboardScreen = ({navigation, route}) => {
  const {itemId, otherParam} = route.params;

const goToScreen = () =>{
    navigation.navigate(navigationStrings.TRANSACTIONS)
}

  return (
    <View styles={styles.container}>
      <SafeAreaView >
        {/* <AppHeader title="Home" headerBg={Colors.green} //https://www.youtube.com/watch?v=i1oqOrxE_1g
        menu
        right='more-vertical' rightFunction={() => console.log('right')}
        optionalIcon='bell' optionalFunction={() => console.log('optional')}
        /> */}
        {/* <HeaderComponent goBack = {()=>navigation.goBack()} text="Dashboard"/> */}
        <HeaderSimple back title="Dashboard Details"/>
        <ButtonComponent btnText="Go to Dash Details  " 
        onPress={goToScreen}/>
        <Text>Route Name : {route.name}</Text>
        <Text>Route Key : {route.key}</Text>
        <Text>Route Param : Only for Deep Linking {route.param}</Text>
        <View
          style={{
            borderBottomColor: 'grey',
            borderBottomWidth: 0.5,
          }}
        />
        <Text>Parameters :-</Text>
        <Text>itemId: {JSON.stringify(itemId)}</Text>
        <Text>otherParam: {JSON.stringify(otherParam)}</Text>
      </SafeAreaView>
    </View>
  );
};

export default DashboardScreen  