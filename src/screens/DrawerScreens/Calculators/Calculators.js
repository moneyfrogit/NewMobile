import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Styles from './Styles'
import HeaderComponent from '../../../components/HeaderComponent'

const Calculators = () => {
  return (
    <View>
      <SafeAreaView>
        <HeaderComponent text="Calculator"/>
      <Text>Calculators</Text>
      </SafeAreaView>
    </View>
  )
}

export default Calculators