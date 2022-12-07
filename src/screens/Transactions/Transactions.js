import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import styles from './Styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import HeaderComponent from '../../components/HeaderComponent';
import Routes from '../../navigation/Routes';

const Transactions = ({navigation, route}) => {
  const {itemId, otherParam} = route.params;

  return (
    <View>
      <SafeAreaView>
        <HeaderComponent
          goBack={() => navigation.goBack()}
          text="Transactions Details"
        />
        <Text>Route Name : {route.name}</Text>
        <Text>Route Key : {route.key}</Text>
        <Text>Route Param : Only for Deep Linlking {route.param}</Text>
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

export default Transactions;
