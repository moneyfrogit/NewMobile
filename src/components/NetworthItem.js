import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Image,
} from 'react-native';
import {Badge, Card, Surface, Title} from 'react-native-paper';
import Feather from 'react-native-vector-icons/Feather';
import Colors from '../constants/Colors';
import navigationStrings from '../constants/navigationStrings';
import {useNavigation} from '@react-navigation/native';
import {Col, Grid} from 'react-native-easy-grid';
import { amountToText } from '../utils/Amounts';

const NetworthItem = ({name, total, percent, icon}) => {
  const navigation = useNavigation();

  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Card
        style={{
          height: 150,
          width: 180,
          backgroundColor: 'white',
          alignItems: 'center',
          justifyContent: 'center',
          marginVertical: 6,
          marginHorizontal: 1,
          borderRadius:10
        }}>
        <Image
          source={icon}
          style={{
            // marginLeft: 80,
            // marginRight: 1,
            height: 48,
            width: 48,
            marginTop: 15,
            marginBottom:10,
            alignSelf: 'center',
            justifyContent: 'center',
          }}
        />

        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>

          <Text
            style={{
              fontSize: 16,
              // fontFamily: 'Lato-Bold',
              margin: 2,
              color: '#333',
            }}>
            {'\u20B9'} {amountToText(total)}
          </Text>

          <Text
            style={{
              fontSize: 16,
              // fontFamily: 'Lato-Bold',
              margin: 2,
              color: '#666',
            }}>
            {name}
          </Text>

          <Text>Current: {percent}%</Text>
        </View>
      </Card>
    </View>
  );
};

export default NetworthItem;
