import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS } from '../../constants/theme'
import {List} from 'react-native-paper';

const Login = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text style={{color:COLORS.black}}>Alerts will be shown here!</Text>

    <List.Accordion
        title="Demat Details"
        description="Item description"
        left={props => (
          <List.Icon {...props} icon="stack-exchange" color="#a7ce51" />
        )}>
        <List.Item
          title="Demat Ac No"
          titleStyle={{color: 'black'}}
          descriptionStyle={{color: 'grey'}}
          description="helo"
        />
        <List.Item
          title="DP Name"
          description="helo"
        />
        <List.Item title="NSDL/CDSL" description="helo" />
      </List.Accordion>
  </View>
  )
}

export default Login

const styles = StyleSheet.create({})