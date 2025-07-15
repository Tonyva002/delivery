import React from 'react'
import { Product } from '../../../../../Domain/entities/Product'
import { Image, StyleSheet, Text, View } from 'react-native'

interface Props {
        product: Product
}

export default function OrderDetailItem({product}: Props) {
  return (
    <View style={styles.container}>
        <Image
          source={{uri: product.image1}}
          style={styles.image}
         />

         <View style={styles.productInfo}>
                <Text style={styles.name}>{product.name}</Text>
                <Text style={styles.quantity}>Cantidad: {product.quantity}</Text>
         </View>

    </View>
  )
}

const styles = StyleSheet.create({
        container: {
                flexDirection: 'row',
                marginTop: 10,
                paddingHorizontal: 16,
                alignItems: 'center',
              

        },

        image: {
                width: 60,
                height: 60,
                borderRadius: 20
        },

        productInfo: {
                marginLeft: 15,
                

        },

        name: {
                fontWeight: 'bold'

        },
        quantity: {
                fontSize: 13,
                marginTop: 5

        }
})