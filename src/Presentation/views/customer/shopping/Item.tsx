import React from "react";
import { Product } from "../../../../Domain/entities/Product";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MyColors } from "../../../theme/AppTheme";

interface Props {
  product: Product;
  addItem: (product: Product) => void;
  subtractItem: (product: Product) => void;
  deleteItem: (product: Product) => void;
}

export default function ShoppingBagItem({
  product,
  addItem,
  subtractItem,
  deleteItem,
}: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: product.image1 }} />
      </View>
      <View style={styles.productInfo}>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.title}>{product.name}</Text>
          <Text style={styles.price}>${product.quantity! * product.price}</Text>
        </View>
        <View style={styles.productActions}>
          <View style={styles.actions} >
            {/* Disminuir cantidad */}
            <TouchableOpacity
              onPress={() => subtractItem(product)}
              style={styles.actionLess}
            >
              <Text style={styles.actionText}>-</Text>
            </TouchableOpacity>

            {/* Mostrar cantidad */}
            <View style={styles.quantity}>
              <Text style={styles.actionText}>{product.quantity}</Text>
            </View>

            {/* Aumentar cantidad */}
            <TouchableOpacity
              onPress={() => addItem(product)}
              style={styles.actionAdd}
            >
              <Text style={styles.actionText}>+</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
          onPress={() => deleteItem(product)}
          >
                <Image
                style={styles.deleteItem}
                source={require('../../../../../assets/trash.png')} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 80,
    flexDirection: "row",
    marginHorizontal: 20,
    marginTop: 7,
    alignItems: "center",
  },

  imageContainer: {},

  image: {
    width: 62,
    height: 62,
    borderRadius: 20,
  },

  productInfo: {
    flex: 1,
  },

  title: {
    color: "black",
    fontSize: 14,
    marginLeft: 15,
    flex: 1,
  },

  price: {
    color: "black",
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 5,
  },

  productActions: {
    flexDirection: "row",
    height: 35,
    marginLeft: 15,
    marginTop: 5,
  },

  actionText: {
    color: "black",
    fontSize: 15,
  },

  actionLess: {
    backgroundColor: MyColors.gris_muy_claro,
    padding: 8,
    alignSelf: "center",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },

  quantity: {
    backgroundColor: MyColors.gris_muy_claro,
    paddingHorizontal: 14,
    paddingVertical: 8,
    alignSelf: "center",
  },
  actionAdd: {
    backgroundColor: MyColors.gris_muy_claro,
    padding: 8,
    alignSelf: "center",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },

  actions: {
        flexDirection: 'row',
        flex: 1

  },
 deleteItem: {
        width: 25,
        height: 22,
        marginTop: 5,
 }

});
