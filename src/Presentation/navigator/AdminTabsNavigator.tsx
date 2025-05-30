import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AdminOrderListScreen from "../views/admin/order/list/OrderList";
import { ProfileInfoScreen } from "../views/profile/info/ProfileInfo";
import { Image, TouchableOpacity } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import AdminCategoryNavigator, {
  CategoryStackParamList,
} from "./AdminCategoryNavigator";

type AdminTabsNavigatorProps = {
  navigation: NativeStackNavigationProp<CategoryStackParamList>;
};

export type TabParamList = {
  AdminCategoryNavigator: undefined;
  AdminOrderListScreen: undefined;
  ProfileInfoScreen: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

export default function AdminTabsNavigator({
  navigation,
}: AdminTabsNavigatorProps) {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="AdminCategoryNavigator"
        component={AdminCategoryNavigator}
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
        name="AdminOrderListScreen"
        component={AdminOrderListScreen}
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
