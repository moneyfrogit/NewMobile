import { View, Text } from 'react-native'
import React from 'react'
import { COLORS, FONTS } from '../constants/theme'

const RenderTitle = ({title, bgcolor, textcolor}) => {
  return (
    <View
    style={{
      alignItems: 'flex-start',
      height: 40,
      backgroundColor: {bgcolor},
      padding: 10,
    }}>
    <Text style={{color:COLORS.black, ...FONTS.h3}}>
      {title}
    </Text>
  </View>
  )
}

export default RenderTitle