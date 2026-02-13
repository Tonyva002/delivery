import React from "react";
import { User } from "../../../Domain/entities/User";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../../views/login/LoginScreen";
import RegisterScreen from "../../views/register/RegisterScreen";
import UpdateProfileScreen from "../../views/profile/update/UpdateProfileScreen";
import RolesScreen from "../../views/roles/RolesScreen";
import { UserProvider } from "../../context/UserContext";
import AdminTabsNavigator from "../admin-navigator/AdminTabsNavigator";
import DeliveryTabsNavigator from "../delivery-navigator/DeliveryTabsNavigator";
import CustomerTabsNavigator from "../customer-navigator/CustomerTabsNavigator";

export type StackParamList = {
  LoginScreen: undefined;
  RegisterScreen: undefined;
  RolesScreen: undefined;
  ProfileUpdateScreen: { user: User };
  AdminTabsNavigator: undefined;
  CustomerTabsNavigator: undefined;
  DeliveryTabsNavigator: undefined;
};

const Stack = createNativeStackNavigator<StackParamList>();

// Estado del usuario
const UserState = ({ children }: any) => {
  return <UserProvider>{children}</UserProvider>;
};

export default function MainStackNavigator() {
  return (
    <UserState>
      <Stack.Navigator
        initialRouteName="LoginScreen"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ title: "" }}
        />

        <Stack.Screen
          name="AdminTabsNavigator"
          component={AdminTabsNavigator}
        />

        <Stack.Screen
          name="CustomerTabsNavigator"
          component={CustomerTabsNavigator}
        />

        <Stack.Screen
          name="DeliveryTabsNavigator"
          component={DeliveryTabsNavigator}
        />

        <Stack.Screen
          name="RegisterScreen"
          component={RegisterScreen}
          options={{ headerTransparent: true }}
        />

        <Stack.Screen
          name="RolesScreen"
          component={RolesScreen}
          options={{
            headerShown: true,
            title: "Seleciona un rol",
          }}
        />

        <Stack.Screen
          name="ProfileUpdateScreen"
          component={UpdateProfileScreen}
          options={{
            headerShown: true,
            title: "Actualizar usuario",
          }}
        />
      </Stack.Navigator>
    </UserState>
  );
}
