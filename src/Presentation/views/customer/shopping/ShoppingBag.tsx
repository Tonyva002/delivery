import React from "react";
import { Text, View, FlatList } from "react-native";
import useCustomerShoppingBagViewModel from "./ViewModel";
import ShoppingBagItem from "./Item";
import RoundedButton from "../../../components/RoundedButton";
import styles from "./Styles";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ClientStackParamList } from "../../../navigator/CustomerStackNavigator";

interface Props extends NativeStackScreenProps<ClientStackParamList, "CustomerShoppingBagScreen"> {}

export default function CustomerShoppingBagScreen({ navigation, route }: Props) {
  const { shoppingBag, total, addItem, subtractItem, deleteItem } = useCustomerShoppingBagViewModel();
  
  return (
    <View style={styles.container}>
      <FlatList
        data={shoppingBag}
        keyExtractor={(item) => item.id!}
        renderItem={({ item }) => (
          <ShoppingBagItem
            product={item}
            addItem={addItem}
            subtractItem={subtractItem}
            deleteItem={deleteItem}
          />
        )}
      />

      <View style={styles.totalToPayContainer}>
        <View style={styles.totalInfo}>
          <Text style={styles.totalText}>Total</Text>
          <Text>$ {total}</Text>
        </View>

        <View style={styles.buttonAdd}>
          <RoundedButton
            text="CONFIRMAR COMPRA"
            onPress={() => {
              navigation.navigate("CustomerAddressStackNavigator", {
                screen: "CustomerAddressListScreen",
              });
            }}
          />
        </View>
      </View>
    </View>
  );
}
