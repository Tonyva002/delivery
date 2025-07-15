import React from 'react'
import { TouchableOpacity, View, Image, Text, StyleSheet } from 'react-native'
import { Rol } from '../../../Domain/entities/Rol'
import { MyColors } from '../../theme/AppTheme'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { StackParamList } from '../../navigator/MainStackNavigator'


interface Props {
        rol: Rol,
        height: number,
        width: number,
        navigation: NativeStackNavigationProp<StackParamList, "RolesScreen">;

}

export default function RolesItem({rol, height, width, navigation}: Props) {
  return (
    <TouchableOpacity 
    onPress={()=> {
        if(rol.name == 'ADMIN'){
           navigation.replace('AdminTabsNavigator') 

        } else if(rol.name == 'CUSTOMER'){
           navigation.replace('CustomerTabsNavigator') 

        } else if(rol.name == 'DELIVERY'){
           navigation.replace('DeliveryTabsNavigator')     
        }

    }}
    style={{...styles.container, height: height, width: width}}>
        <View style={styles.imageContainer}>
                <Image 
                style={styles.image}
                source = {{uri: rol.image}} />
                <View style={styles.titleContainer}>
                        <Text style={styles.title}>{rol.name}</Text>
                </View>

        </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
        image: {
                flex: 1,
                resizeMode: 'contain'

        },

        container: {
                alignSelf: 'center',
                paddingBottom: 20,
                paddingHorizontal: 7,

        }, 
        imageContainer: {
                flex: 1,
                backgroundColor: 'white',
                marginTop: 20,
                borderRadius: 18
        },
        title: {

                color: 'white'
        },

        titleContainer: {
                height: 50,
                backgroundColor: MyColors.primary,
                borderBottomLeftRadius: 18,
                borderBottomRightRadius: 18,
                alignItems: 'center',
                justifyContent: 'center'

        }

        })