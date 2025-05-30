import React from "react";
import { createNativeStackNavigator, NativeStackNavigationProp } from "@react-navigation/native-stack";
import AdminProductListScreen from "../views/admin/product/list/ProductList";
import { Category } from "../../Domain/entities/Category";
import { StackScreenProps } from "@react-navigation/stack";
import { CategoryStackParamList } from "./AdminCategoryNavigator";
import AdminProductCreateScreen from "../views/admin/product/create/CreateProduct";
import { Image, TouchableOpacity } from "react-native";

export type ProductStackParamList = {
  AdminProductListScreen: { category: Category };
  AdminProductCreateScreen: { category: Category };
};

const Stack = createNativeStackNavigator<ProductStackParamList>();

interface Props
  extends StackScreenProps<CategoryStackParamList, "AdminProductNavigator"> {};

export default function AdminProductNavigator({ route }: Props) {

  const category = route.params.category;

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AdminProductListScreen"
        component={AdminProductListScreen}
        initialParams={{ category }}
        options={({ navigation }: { navigation: NativeStackNavigationProp<ProductStackParamList> }) => ({
          headerShown: true,
          title: "Productos",
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate("AdminProductCreateScreen", {category})} >
              <Image
                source={require("../../../assets/add.png")}
                style={{ width: 35, height: 35 }}
              />
            </TouchableOpacity>
          ),
        })}
      />

      <Stack.Screen
        name="AdminProductCreateScreen"
        component={AdminProductCreateScreen}
        initialParams={{ category }}
        options={{
          title: 'Nuevo producto',
          headerShown: true
        }}
      />
    </Stack.Navigator>
  );
}
