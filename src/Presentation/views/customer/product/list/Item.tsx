import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { Image } from "expo-image";
import { MyColors, MyStyles } from "../../../../theme/AppTheme";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Product } from "../../../../../Domain/entities/Product";
import { ClientStackParamList } from "../../../../navigator/customer-navigator/CustomerStackNavigator";

interface Props {
  product: Product;
  navigation: NativeStackNavigationProp<
    ClientStackParamList,
    "CustomerProductListScreen"
  >;
}

export default function CustomerProductItem({ product, navigation }: Props) {

  const [loading, setLoading] = useState(true);

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("CustomerProductDetailScreen", { product })
      }
    >
      <View style={styles.container}>
        <View style={styles.info}>
          <Text style={styles.title}>{product.name}</Text>
          <Text style={styles.description}>{product.description}</Text>
          <Text style={styles.price}>RD$ {product.price}</Text>
        </View>
         {/* Imagen + loader */}
         <View style={styles.imageWrapper}>
         {loading &&
         <ActivityIndicator
         size='large'
         color={MyColors.primary}
         style={MyStyles.loading}
          />
         }
        <Image 
        style={styles.image}
        recyclingKey={product.id?.toString()} 
        source={{ uri: product.image1 }}
        contentFit="cover"
        transition={500}
        cachePolicy={"memory-disk"}
        onLoadEnd={() => {setLoading(false)}} />
        </View>
      </View>

      <View style={styles.divide}></View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: 16,
    marginTop: 10,
    paddingTop: 10,
    justifyContent: "space-between",
  },

  image: {
    width: 60,
    height: 60,
    borderRadius: 15,
  },

  info: {
    marginLeft: 15,
    flex: 1,
  },
  title: {
    color: "black",
    fontSize: 15,
  },

  description: {
    color: "grey",
    fontSize: 12,
    marginTop: 3,
  },

  price: {
    color: "black",
    fontSize: 12,
    fontWeight: "bold",
  },

  actionContainer: {
    marginRight: 40,
  },

  actionImage: {
    width: 25,
    height: 25,
    marginVertical: 5,
  },

  divide: {
    height: 1,
    backgroundColor: MyColors.grayVeryLight,
    marginHorizontal: 20,
  },

  imageWrapper: {
    width: 60,
    height: 60,
    position: "relative"
  }
});
