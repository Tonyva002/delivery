import React, { useEffect } from "react";
import { View, Text, FlatList, StatusBar } from "react-native";
import useCustomerProductListViewModel from "./ViewModel";
import { ClientStackParamList } from "../../../../navigator/CustomerStackNavigator";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import CustomerProductItem from "./Item";
import { useFocusEffect } from "@react-navigation/native";


interface Props extends NativeStackScreenProps<ClientStackParamList, "CustomerProductListScreen"> {}

export default function CustomerProductListScreen({ navigation, route }: Props) {
  const { id_category } = route.params;

  const { products, getProducts } = useCustomerProductListViewModel();

  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBarStyle("dark-content");
      StatusBar.setBackgroundColor("transparent");
      StatusBar.setTranslucent(true);
    }, [])
  );

  useEffect(() => {
    getProducts(id_category);
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id!}
        renderItem={({ item }) => (
          <CustomerProductItem product={item} navigation={navigation} />
        )}
      />
    </View>
  );
}
