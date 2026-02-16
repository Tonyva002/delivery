import React, { useState } from "react";
import { TouchableOpacity, View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { Image } from "expo-image";
import { Rol } from "../../../Domain/entities/Rol";
import { MyColors, MyStyles } from "../../theme/AppTheme";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "../../navigator/main-navigator/MainStackNavigator";

interface Props {
  rol: Rol;
  height: number;
  width: number;
  navigation: NativeStackNavigationProp<StackParamList, "RolesScreen">;
}

export default function RolesItem({ rol, height, width, navigation }: Props) {

  const [loading, setLoading] = useState(true);

  return (
    <TouchableOpacity
      onPress={() => {
        if (rol.name == "ADMIN") {
          navigation.replace("AdminTabsNavigator");
        } else if (rol.name == "CUSTOMER") {
          navigation.replace("CustomerTabsNavigator");
        } else if (rol.name == "DELIVERY") {
          navigation.replace("DeliveryTabsNavigator");
        }
      }}
      style={{ ...styles.container, height: height, width: width }}
    >
      <View style={styles.imageContainer}>
        {/* Imagen + loader */}
        {loading &&
        <ActivityIndicator 
        size="large"
        color={MyColors.primary}
        style={MyStyles.loading}
        />
        }
        <Image 
        style={styles.image}
        recyclingKey={rol.id?.toString()} 
        source={{ uri: rol.image }}
        contentFit="cover"
        transition={500}
        cachePolicy={"memory-disk"}
        onLoadEnd={() => {setLoading(false)}} />

        <View style={styles.titleContainer}>
          <Text style={styles.title}>{rol.name}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: "contain",
  },

  container: {
    alignSelf: "center",
    paddingBottom: 20,
    paddingHorizontal: 7,
  },
  imageContainer: {
    flex: 1,
    backgroundColor: "white",
    marginTop: 20,
    borderRadius: 18,
  },
  title: {
    color: "white",
  },

  titleContainer: {
    height: 50,
    backgroundColor: MyColors.primary,
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
});
