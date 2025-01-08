import { View, Text, KeyboardType } from 'react-native'
import React from 'react'

interface Props {
    image: any,
    placeholder: string,
    value: string,
    keyboardtype: KeyboardType,
    secureTextEntry?: boolean,
    property: string,
    onChangeText: (property: string, value: any) => void

}

export default function CustomTextInput({

}:Props){
  return (
    <View>
      <Text>CustomTextInput</Text>
    </View>
  )
}