import React, { useState } from "react";
import { Category } from "../../../../../Domain/entities/Category";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Image } from "expo-image";
import { MyColors, MyStyles } from "../../../../theme/AppTheme";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { CategoryStackParamList } from "../../../../navigator/admin-navigator/AdminCategoryStackNavigator";

interface Props {
  category: Category;
  remove: (id: string) => void;
}

export default function AdminCategoryListItem({ category, remove }: Props) {
  const navigation =
    useNavigation<NativeStackNavigationProp<CategoryStackParamList>>();

  const [loading, setLoading] = useState(true);

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("AdminProductStackNavigator", {
          category: category,
        })
      }
    >
      <View style={styles.container}>
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

        <View style={styles.info}>
          <Text style={styles.title}>{category.name}</Text>
          <Text style={styles.description}>{category.description}</Text>
        </View>

        <View style={styles.actionContainer}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("AdminCategoryUpdateScreen", { category })
            }
          >
            <Image
              style={styles.actionImage}
              source={require("../../../../../../assets/edit.png")}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => remove(category.id!)}>
            <Image
              style={styles.actionImage}
              source={require("../../../../../../assets/trash.png")}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.divide}></View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 70,
    flexDirection: "row",
    marginHorizontal: 20,
    marginTop: 10,
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
    position: "relative",
  },
});
