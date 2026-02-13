import React from "react";
import { Image, TouchableOpacity } from "react-native";
import { Category } from "../../../Domain/entities/Category";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CategoryProvider } from "../../context/CategoryContext";
import AdminUpdateCategoryScreen from "../../views/admin/category/update/UpdateCategoryScreen";
import AdminCreateCategoryScreen from "../../views/admin/category/create/CreateCategoryScreen";
import AdminProductStackNavigator from "./AdminProductStackNavigator";
import AdminCategoryListScreen from "../../views/admin/category/list/CategoryListScreen";

export type CategoryStackParamList = {
  AdminCategoryListScreen: undefined;
  AdminCategoryCreateScreen: undefined;
  AdminCategoryUpdateScreen: { category: Category };
  AdminProductStackNavigator: { category: Category };
};

const Stack = createNativeStackNavigator<CategoryStackParamList>();

// Estado de la categoria
const CategoryState = ({ children }: any) => {
  return <CategoryProvider>{children}</CategoryProvider>;
};

export default function AdminCategoryStackNavigator() {
  return (
    <CategoryState>
      <Stack.Navigator>
        <Stack.Screen
          name="AdminCategoryListScreen"
          component={AdminCategoryListScreen}
          options={({ navigation }) => ({
            headerShown: true,
            title: "Lista de Categorias",
            headerRight: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate("AdminCategoryCreateScreen")}
              >
                <Image
                  source={require("../../../../assets/add.png")}
                  style={{ width: 35, height: 35 }}
                />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="AdminCategoryCreateScreen"
          component={AdminCreateCategoryScreen}
          options={{
            headerShown: true,
            title: "Nueva categoria",
          }}
        />

        <Stack.Screen
          name="AdminCategoryUpdateScreen"
          component={AdminUpdateCategoryScreen}
          options={{
            headerShown: true,
            title: "Actualizar categoria",
          }}
        />

        <Stack.Screen
          name="AdminProductStackNavigator"
          component={AdminProductStackNavigator}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </CategoryState>
  );
}
