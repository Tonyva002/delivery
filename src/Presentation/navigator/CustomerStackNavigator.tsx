import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Product } from "../../Domain/entities/Product";
import { ShoppingBagProvider } from "../context/ShoppingBagContext";
import { Image, TouchableOpacity } from "react-native";
import CustomerAddressStackNavigator, { CustomerAddressStackParamList } from "./CustomerAddressStackNavigator";
import { NavigatorScreenParams } from "@react-navigation/native";
import CustomerCategoryListScreen from "../views/customer/category/list/CategoryList";
import CustomerProductListScreen from "../views/customer/product/list/ProductList";
import CustomerProductDetailScreen from "../views/customer/product/detail/ProductDetail";
import CustomerShoppingBagScreen from "../views/customer/shopping/ShoppingBag";

export type ClientStackParamList = {
  CustomerCategoryListScreen: undefined;
  CustomerProductListScreen: { id_category: string };
  CustomerProductDetailScreen: { product: Product };
  CustomerShoppingBagScreen: undefined;
  CustomerAddressStackNavigator: NavigatorScreenParams<CustomerAddressStackParamList>;
};

const Stack = createNativeStackNavigator<ClientStackParamList>();

const ShoppingBagState = ({ children }: any) => {
  return <ShoppingBagProvider>{children}</ShoppingBagProvider>;
};

export const CustomerStackNavigator = () => {
  return (
    <ShoppingBagState>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="CustomerCategoryListScreen"
          component={CustomerCategoryListScreen}
          options={({ navigation }) => ({
            headerShown: true,
            title: "Categorias",
            headerRight: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate("CustomerShoppingBagScreen")}
              >
                <Image
                  source={require("../../../assets/shopping_cart.png")}
                  style={{ width: 30, height: 30 }}
                />
              </TouchableOpacity>
            ),
          })}
        />

        <Stack.Screen
          name="CustomerProductListScreen"
          component={CustomerProductListScreen}
          options={({ navigation }) => ({
            headerShown: true,
            title: "Productos",
            headerRight: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate("CustomerShoppingBagScreen")}
              >
                <Image
                  source={require("../../../assets/shopping_cart.png")}
                  style={{ width: 30, height: 30 }}
                />
              </TouchableOpacity>
            ),
          })}
        />

        <Stack.Screen
          name="CustomerProductDetailScreen"
          component={CustomerProductDetailScreen}
        />

        <Stack.Screen
          name="CustomerShoppingBagScreen"
          component={CustomerShoppingBagScreen}
          options={{
            headerShown: true,
            title: "Compras",
          }}
        />

        <Stack.Screen
          name="CustomerAddressStackNavigator"
          component={CustomerAddressStackNavigator}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </ShoppingBagState>
  );
};
