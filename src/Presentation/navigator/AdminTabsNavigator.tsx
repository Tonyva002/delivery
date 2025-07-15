import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AdminOrderListScreen from "../views/admin/order/list/OrderList";
import { ProfileInfoScreen } from "../views/profile/info/ProfileInfo";
import { Image} from "react-native";
import AdminCategoryStackNavigator from "./AdminCategoryStackNavigator";
import AdminOrderStackNavigator from "./AdminOrderStackNavigator";



const Tab = createBottomTabNavigator();

export default function AdminTabsNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="AdminCategoryStackNavigator"
        component={AdminCategoryStackNavigator}
        options={{
          tabBarLabel: "Categorias",
          tabBarActiveTintColor: "blue",
          tabBarIcon: () => (
            <Image
              source={require("../../../assets/list.png")}
              style={{ width: 25, height: 25 }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="AdminOrderStackNavigator"
        component={AdminOrderStackNavigator}
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
