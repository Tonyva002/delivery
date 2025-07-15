import React, { useEffect } from "react";
import { View, FlatList, ToastAndroid, StatusBar } from "react-native";
import { ProductStackParamList } from "../../../../navigator/AdminProductStackNavigator";
import useAdminProductListViewModel from "./ViewModel";
import AdminProductListItem from "./Item";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useFocusEffect } from "@react-navigation/native";

interface Props extends NativeStackScreenProps<ProductStackParamList,"AdminProductListScreen"> {}

export default function AdminProductListScreen({ navigation, route }: Props) {
  const { category } = route.params;
  const {
    products,
    responseMessage,
    setResponseMessage,
    getProducts,
    deleteProduct,
  } = useAdminProductListViewModel();

  useEffect(() => {
    if (category.id !== undefined) {
      getProducts(category.id!);
    }
  }, []);

  useEffect(() => {
    ToastAndroid.show(responseMessage, ToastAndroid.LONG);
    setResponseMessage("");
  }, [responseMessage]);

  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBarStyle("dark-content");
      StatusBar.setBackgroundColor("transparent");
      StatusBar.setTranslucent(true);
    }, [])
  );

  return (
    <View style={{ backgroundColor: "white" }}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id!}
        renderItem={({ item }) => (
          <AdminProductListItem
            product={item}
            remove={deleteProduct}
            category={category}
          />
        )}
      />
    </View>
  );
}
