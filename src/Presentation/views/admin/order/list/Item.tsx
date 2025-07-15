import React from "react";
import { Order } from "../../../../../Domain/entities/Order";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MyColors } from "../../../../theme/AppTheme";
import dateFormatter from "../../../../../utils/dateFormatter";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AdminOrderStackParamList } from "../../../../navigator/AdminOrderStackNavigator";
import { useNavigation } from "@react-navigation/native";

interface Props {
  order: Order;
}

export default function OrderListItem({ order }: Props) {
  const navigation = useNavigation<NativeStackNavigationProp<AdminOrderStackParamList>>();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("AdminOrderDetailScreen", { order })}
    >
      <View style={styles.container}>
        <Text style={styles.order}>Orden #{order.id}</Text>
        <Text style={styles.info}>Fecha del pedido {dateFormatter(order.timestamp!)}</Text>
        <Text style={styles.info}>Cliente {order.customer?.name} {order.customer?.lastname}</Text>
        <Text style={styles.info}>Direccion {order.address?.address}</Text>
        <Text style={styles.info}>Localidad {order.address?.neighborhood}</Text>

        <View style={styles.divider}></View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
  },
  order: {
    fontWeight: "bold",
    color: "black",
    fontSize: 18,
    marginVertical: 6,
  },
  info: {
    fontSize: 13,
  },

  divider: {
    height: 1,
    width: "100%",
    backgroundColor: MyColors.gris_claro,
    marginTop: 8,
  },
});
