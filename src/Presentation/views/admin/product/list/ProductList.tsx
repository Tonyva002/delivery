import { StackScreenProps } from '@react-navigation/stack'
import React from 'react'
import { Text, View } from 'react-native'
import { ProductStackParamList } from '../../../../navigator/AdminProductNavigator'

interface Props extends StackScreenProps<ProductStackParamList, 'AdminProductListScreen' >{};

export default function AdminProductListScreen({navigation, route}: Props) {
  
        const {category} = route.params;
        console.log('CATEGORIA: ' + JSON.stringify(category));

  return (
    <View>
        <Text>AdminProductListScreen</Text>
    </View>
  )
}
