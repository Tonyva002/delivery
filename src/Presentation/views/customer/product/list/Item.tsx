import React from 'react'
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
import { MyColors } from '../../../../theme/AppTheme';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Product } from '../../../../../Domain/entities/Product';
import { ClientStackParamList } from '../../../../navigator/CustomerStackNavigator';

interface Props {
        product: Product;
        navigation: NativeStackNavigationProp<ClientStackParamList, "CustomerProductListScreen">;
        
             
}

export default function CustomerProductItem({product, navigation}: Props) {
  
  return (
    <TouchableOpacity 
    onPress={() => navigation.navigate('CustomerProductDetailScreen', {product})}
     >
   <View style={styles.container}>

    <View style={styles.info}>
      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.description}>{product.description}</Text>
      <Text style={styles.price}>RD$ {product.price}</Text>
    </View>

     <Image 
     style={styles.image}
     source={{uri: product.image1}}
    />

   </View>

   <View style={styles.divide}></View>
   </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginTop: 10,
    paddingTop: 10,
    justifyContent: 'space-between'


  },

  image: {
    width: 60,
    height: 60,
    borderRadius: 15,
   
  },

  info: {
    marginLeft: 15,
    flex: 1
  }, 
  title: {
    color: 'black',
    fontSize: 15
  },

  description: {
    color: 'grey',
    fontSize: 12,
    marginTop: 3
  },

    price: {
      color: 'black',
      fontSize: 12,
      fontWeight: 'bold'
    
  },

  actionContainer: {
    marginRight: 40,
   
  },

  actionImage: {
    width: 25,
    height: 25,
    marginVertical: 5

  },

  divide: {
    height: 1,
    backgroundColor: MyColors.gris_muy_claro,
    marginHorizontal: 20
  },


})
