import React from 'react'
import { Category } from '../../../../../Domain/entities/Category';
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
import { MyColors } from '../../../../theme/AppTheme';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { CategoryStackParamList } from '../../../../navigator/AdminCategoryStackNavigator';

interface Props {
        category: Category;
        remove: (id: string) => void;
        
}

export default function AdminCategoryListItem({category, remove}: Props) {
 
 const navigation = useNavigation<NativeStackNavigationProp<CategoryStackParamList>>();
  
  return (
    <TouchableOpacity
    onPress={() => navigation.navigate('AdminProductStackNavigator', {category: category})}
    >
   <View style={styles.container}>

    <Image 
     style={styles.image}
     source={{uri: category.image}}
    />

    <View style={styles.info}>
      <Text style={styles.title}>{category.name}</Text>
      <Text style={styles.description}>{category.description}</Text>
    </View>

    <View style={styles.actionContainer}>
       <TouchableOpacity
       onPress={() => navigation.navigate('AdminCategoryUpdateScreen', {category})}
       >
        <Image 
        style={styles.actionImage}
        source={require('../../../../../../assets/edit.png')}/>
       </TouchableOpacity>

       <TouchableOpacity
       onPress={()=> remove(category.id!)}
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
    height: 70,
    flexDirection: 'row',
    marginHorizontal: 20,
    marginTop: 10

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
  }

  


})
