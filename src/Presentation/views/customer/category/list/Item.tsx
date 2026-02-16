import React, { useState } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { Image } from "expo-image";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ClientStackParamList } from "../../../../navigator/customer-navigator/CustomerStackNavigator";
import { MyColors, MyStyles } from "../../../../theme/AppTheme";
import { Category } from "../../../../../Domain/entities/Category";

interface Props {
  category: Category;
  height: number;
  width: number;
  navigation: NativeStackNavigationProp<
    ClientStackParamList,
    "CustomerCategoryListScreen"
  >;
}

export default function CustomerCategoryItem({
  category,
  height,
  width,
  navigation,
}: Props) {
  const [loading, setLoading] = useState(true);

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("CustomerProductListScreen", {
          id_category: category.id!,
        });
      }}
      style={{ ...styles.container, height: height, width: width }}
    >
      <View style={styles.imageContainer}>
        {/* Imagen + loader */}
        <View style={styles.imageWrapper}>
          {loading && (
            <ActivityIndicator
              style={MyStyles.loading}
              size="large"
              color={MyColors.primary}
            />
          )}
          <Image
            style={styles.image}
            recyclingKey={category.id?.toString()}
            source={{ uri: category.image }}
            contentFit="cover"
            transition={500}
            cachePolicy={"memory-disk"}
            onLoadEnd={() => setLoading(false)}
          />
        </View>

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
  imageWrapper: {
    flex: 1,
    position: "relative",
  },
});
