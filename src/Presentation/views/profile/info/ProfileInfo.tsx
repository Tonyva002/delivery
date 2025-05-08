import React from 'react'
import { View, Text, Button } from 'react-native'
import userViewModel from './ViewModel';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from '../../../../../App';

type LoginScreenProps = {
  navigation: NativeStackNavigationProp<StackParamList, 'Profile'>;
};

export const ProfileInfoScreen = ({navigation}: LoginScreenProps) => {

        const { removeSession} = userViewModel()

  return (
   <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Button
           onPress={() => {
               removeSession(); 
               navigation.navigate('Login')
           }}
           title='Cerrar sesion'
         />
   </View>
  )
}
