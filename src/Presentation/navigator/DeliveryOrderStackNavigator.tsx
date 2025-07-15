import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Order } from "../../Domain/entities/Order";
import { OrderProvider } from "../context/OrderContext";
import DeliveryOrderListScreen from "../views/delivery/order/list/OrderList";
import DeliveryOrderDetailScreen from "../views/delivery/order/detail/OrderDetail";
import DeliveryOrderMapScreen from "../views/delivery/order/map/OrderMap";

export type DeliveryOrderStackParamList = {
  DeliveryOrderListScreen: undefined;
  DeliveryOrderDetailScreen: { order: Order };
  DeliveryOrderMapScreen: { order: Order };
};

const Stack = createNativeStackNavigator<DeliveryOrderStackParamList>();

const OrderStatus = ({ children }: any) => {
  return <OrderProvider>{children}</OrderProvider>;
};

export default function DeliveryOrderStackNavigator() {
  return (
    <OrderStatus>
      <Stack.Navigator>
        <Stack.Screen
          name="DeliveryOrderListScreen"
          component={DeliveryOrderListScreen}
          options={{
            title: "Pedidos",
          }}
        />

        <Stack.Screen
          name="DeliveryOrderDetailScreen"
          component={DeliveryOrderDetailScreen}
          options={{
            title: "Detalle de la orden",
          }}
        />

         <Stack.Screen
          name="DeliveryOrderMapScreen"
          component={DeliveryOrderMapScreen}
          options={{
            headerShown: false,
      
          }}
        />

      </Stack.Navigator>
    </OrderStatus>
  );
}
