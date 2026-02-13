import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AdminOrderListScreen from "../../views/admin/order/list/OrderListScreen";
import AdminOrderDetailsScreen from "../../views/admin/order/detail/OrderDetailsScreen";
import { Order } from "../../../Domain/entities/Order";
import { OrderProvider } from "../../context/OrderContext";

export type AdminOrderStackParamList = {
  AdminOrderListScreen: undefined;
  AdminOrderDetailScreen: { order: Order };
};

const Stack = createNativeStackNavigator<AdminOrderStackParamList>();

const OrderStatus = ({ children }: any) => {
  return <OrderProvider>{children}</OrderProvider>;
};

export default function AdminOrderStackNavigator() {
  return (
    <OrderStatus>
      <Stack.Navigator>
        <Stack.Screen
          name="AdminOrderListScreen"
          component={AdminOrderListScreen}
          options={{
            title: "Pedidos",
          }}
        />

        <Stack.Screen
          name="AdminOrderDetailScreen"
          component={AdminOrderDetailsScreen}
          options={{
            title: "Detalle de la orden",
          }}
        />
      </Stack.Navigator>
    </OrderStatus>
  );
}
