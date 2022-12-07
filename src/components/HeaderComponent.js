import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import React, {Component} from 'react';
import {useNavigation} from '@react-navigation/native';
import imagePath from '../constants/imagePath';
import {COLORS} from '../constants/theme';

const HeaderComponent = ({goBack, text, bgcolor}) => {
  const navigation = useNavigation();

  return (
    <View
      style={{
        flexDirection: 'row',
        height: 50,
        backgroundColor: {bgcolor},
      }}>

        
      <View style={{flex: 1, justifyContent: 'center'}}>
        {!!goBack ? (
          <TouchableOpacity
            onPress={!!goBack ? goBack : () => navigation.goBack()}>
            <Image
              style={{resizeMode: 'contain', width: 24, height: 24}}
              source={imagePath.ic_anotherback}
            />
          </TouchableOpacity>
        ) : (
          <Text />
        )}
      </View>

      <View
        style={{
          flex: 2,
          justifyContent: 'space-between',
        }}>
        <Text
          style={{
            textAlign: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 18,
            marginTop:10,
            color: COLORS.black
          }}>
          {text}
        </Text>
      </View>

      <View style={{flex: 1, justifyContent: 'center'}}>
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <Image
            style={{width: 25, height: 30, marginLeft: 60}}
            source={imagePath.ic_menuham}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HeaderComponent;
