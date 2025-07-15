import React from 'react'
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
import { MyColors } from '../../../../theme/AppTheme';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { Product } from '../../../../../Domain/entities/Product';
import { ProductStackParamList } from '../../../../navigator/AdminProductStackNavigator';
import { Category } from '../../../../../Domain/entities/Category';

interface Props {
        product: Product;
        category: Category;
        remove: (product: Product) => void;
        
}

export default function AdminProductListItem({product, category, remove}: Props) {
 
 const navigation = useNavigation<NativeStackNavigationProp<ProductStackParamList>>();
  
  return (
    <TouchableOpacity >
   <View style={styles.container}>

    <Image 
     style={styles.image}
     source={{uri: product.image1}}
    />

    <View style={styles.info}>
      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.description}>{product.description}</Text>
      <Text style={styles.price}>RD$ {product.price}</Text>
    </View>

    <View style={styles.actionContainer}>
       <TouchableOpacity
       onPress={() => navigation.navigate('AdminProductUpdateScreen', {product: product, category: category})}
       >
        <Image 
        style={styles.actionImage}
        source={require('../../../../../../assets/edit.png')}/>
       </TouchableOpacity>

       <TouchableOpacity
       onPress={()=> remove(product)}
       >
        <Image 
        style={styles.actionImage}
        source={require('../../../../../../assets/trash.png')}/>
       </TouchableOpacity>
    </View> 
   </View>

   <View style={styles.divide}></View>
   </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 90,
    flexDirection: 'row',
    marginHorizontal: 20,
    marginTop: 10,
    paddingTop: 10


  },

  image: {
    width: 60,
    height: 60,
    borderRadius: 15
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
      color: 'grey',
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
