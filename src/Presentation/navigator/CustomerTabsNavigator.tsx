import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ProfileInfoScreen } from "../views/profile/info/ProfileInfo";
import { Image } from "react-native";
import { CustomerStackNavigator } from "./CustomerStackNavigator";
import CustomerOrderListScreen from "../views/customer/order/list/OrderList";

const Tab = createBottomTabNavigator();

export default function CustomerTabsNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="CustomerStackNavigator"
        component={CustomerStackNavigator}
        options={{
          tabBarLabel: "Categorias",
          tabBarIcon: ({ color }) => (
            <Image
              source={require("../../../assets/list.png")}
              style={{ width: 25, height: 25 }}
            />
          ),
          tabBarActiveTintColor: "blue",
        }}
      />

      <Tab.Screen
        name="CustomerOrderListScreen"
        component={CustomerOrderListScreen}
        options={{
          title: "Pedidos",
          tabBarLabel: "Pedidos",
          tabBarIcon: ({ color }) => (
            <Image
              source={require("../../../assets/orders.png")}
              style={{ width: 25, height: 25 }}
            />
          ),
          tabBarActiveTintColor: "blue",
        }}
      />

      <Tab.Screen
        name="ProfileInfoScreen"
        component={ProfileInfoScreen}
        options={{
          title: "Perfil",
          tabBarLabel: "Perfil",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Image
              source={require("../../../assets/user_menu.png")}
              style={{ width: 25, height: 25 }}
            />
          ),
          tabBarActiveTintColor: "blue",
        }}
      />
    </Tab.Navigator>
  );
}
