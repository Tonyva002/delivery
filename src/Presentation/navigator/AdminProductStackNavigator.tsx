import React from "react";
import { createNativeStackNavigator, NativeStackNavigationProp } from "@react-navigation/native-stack";
import AdminProductListScreen from "../views/admin/product/list/ProductList";
import { Category } from "../../Domain/entities/Category";
import { StackScreenProps } from "@react-navigation/stack";
import { CategoryStackParamList } from "./AdminCategoryStackNavigator";
import AdminProductCreateScreen from "../views/admin/product/create/ProductCreate";
import { Image, TouchableOpacity } from "react-native";
import { ProductProvider } from "../context/ProductContext";
import AdminProductUpdateScreen from "../views/admin/product/update/ProductUpdate";
import { Product } from "../../Domain/entities/Product";

export type ProductStackParamList = {
  AdminProductListScreen: { category: Category };
  AdminProductCreateScreen: { category: Category };
  AdminProductUpdateScreen: { category: Category, product: Product };
};

interface Props
  extends StackScreenProps<CategoryStackParamList, "AdminProductStackNavigator"> {};

  const Stack = createNativeStackNavigator<ProductStackParamList>();


  // Estado de producto
  const ProductState = ({children}: any) => {
    return (
      <ProductProvider>
        {children}
      </ProductProvider>
    )
  }

export default function AdminProductStackNavigator({ route }: Props) {

  const category = route.params.category;

  return (
    <ProductState>
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

       <Stack.Screen
        name="AdminProductUpdateScreen"
        component={AdminProductUpdateScreen}
        options={{
          title: 'Actualizar producto',
          headerShown: true
        }}
      />
    </Stack.Navigator>
    </ProductState>
  );
}
