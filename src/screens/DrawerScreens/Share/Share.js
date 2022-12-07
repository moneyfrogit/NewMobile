import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Styles from './Styles'
import { SafeAreaView } from 'react-native-safe-area-context'
import HeaderComponent from '../../../components/HeaderComponent'

const Share = ({navigation}) => {
  return (
      <SafeAreaView>
        <HeaderComponent goBack={() => navigation.goBack()} text="Share" />
      <Text>Share</Text>
      </SafeAreaView>
  )
}

export default Share