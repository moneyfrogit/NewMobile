import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import HeaderComponent from '../../../components/HeaderComponent'
import styles from './Styles'

const RateUs = ({navigation}) => {
  return (
      <SafeAreaView style={{
        justifyContent: 'center',
        flex: 1,
      }}>
      <HeaderComponent goBack={() => navigation.goBack()} text="Rate Us" />
      <View style={styles.MainContainer}>
        <Text style={{ fontSize: 25, textAlign: 'center' }}>
            Would you like to share your review with us? This will help and motivate us a lot. 
        </Text>
        <TouchableOpacity
          onPress={() => console.log('start rating counter')}
          activeOpacity={0.6}
          style={styles.button}>
          <Text style={styles.TextStyle}>Rate App</Text>
        </TouchableOpacity>
      </View>
      </SafeAreaView>
  )
}

export default RateUs