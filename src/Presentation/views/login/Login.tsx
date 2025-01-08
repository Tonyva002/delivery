

import { View, Image, Text } from 'react-native'
import React from 'react'
import styles from './Styles'

export default function Login({navigation}) {
  return (
    <View style={styles.container}>
        <Image
          style={styles.imageBackground}
          source={require('../../../../assets/chef.jpg')} />

          <View style={styles.logoContainer}>
            <Image style={styles.logoImage} source={require('../../../../assets/logo.png')}/>
            <Text style={styles.logoText}>FOOD</Text>
          </View>

          <View style={styles.form}>

            <Text style={styles.formTitle}>LOGIN</Text>

          </View>
      
    </View>
  )
}