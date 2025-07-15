import React from "react";
import { TouchableOpacity, View, Image, Text, StyleSheet } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ClientStackParamList } from "../../../../navigator/CustomerStackNavigator";
import { MyColors } from "../../../../theme/AppTheme";
import { Category } from "../../../../../Domain/entities/Category";

interface Props {
  category: Category;
  height: number;
  width: number;
  navigation: NativeStackNavigationProp<ClientStackParamList,"CustomerCategoryListScreen">;
}

export default function CustomerCategoryItem({
  category,
  height,
  width,
  navigation,
}: Props) {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("CustomerProductListScreen", {id_category: category.id!,});
      }}
      style={{ ...styles.container, height: height, width: width }}
    >
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: category.image }} />
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{category.name}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    paddingBottom: 20,
    paddingHorizontal: 7,
    borderRadius: 18,
  },
  imageContainer: {
    flex: 1,
    backgroundColor: "white",
    marginTop: 20,
    borderRadius: 18,
  },

  image: {
    flex: 1,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },

  titleContainer: {
    height: 70,
    backgroundColor: MyColors.white,
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    elevation: 20,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },

  title: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
  },
});
