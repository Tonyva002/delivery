import React from "react";
import { Category } from "../../Domain/entities/Category";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CategoryProvider } from "../context/CategoryContext";
import AdminUpdateCategoryScreen from "../views/admin/category/update/UpdateCategory";
import AdminCategoryCreateScreen from "../views/admin/category/create/CreateCategory";
import AdminCategoryListScreen from "../views/admin/category/list/CategoryList";
import { Image, TouchableOpacity } from "react-native";
import AdminProductNavigator from "./AdminProductNavigator";

export type CategoryStackParamList = {
  AdminCategoryListScreen: undefined;
  AdminCategoryCreateScreen: undefined;
  AdminUpdateCategoryScreen: { category: Category };
  AdminProductNavigator: { category: Category };
};

const Stack = createNativeStackNavigator<CategoryStackParamList>();

// Estado de la categoria
const CategoryState = ({ children }: any) => {
  return <CategoryProvider>{children}</CategoryProvider>;
};

export default function AdminCategoryNavigator() {
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
                  source={require("../../../assets/add.png")}
                  style={{ width: 35, height: 35 }}
                />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="AdminCategoryCreateScreen"
          component={AdminCategoryCreateScreen}
          options={{
            headerShown: true,
            title: "Nueva categoria",
          }}
        />

        <Stack.Screen
          name="AdminUpdateCategoryScreen"
          component={AdminUpdateCategoryScreen}
          options={{
            headerShown: true,
            title: "Actualizar categoria",
          }}
        />

         <Stack.Screen
          name="AdminProductNavigator"
          component={AdminProductNavigator}
          options={{
            headerShown: false
          }}
          
        />
      </Stack.Navigator>
    </CategoryState>
  );
}
