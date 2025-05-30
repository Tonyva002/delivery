import React from "react";
import { User } from "../../Domain/entities/User";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../views/login/Login";
import ClientTabsNavigator from "./ClientTabsNavigator";
import RegisterScreen from "../views/register/Register";
import ProfileUpdateScreen from "../views/profile/update/ProfileUpdate";
import RolesScreen from "../views/roles/Roles";
import { UserProvider } from "../context/UserContext";
import AdminTabsNavigator from "./AdminTabsNavigator";




export type StackParamList = {
  LoginScreen: undefined;
  RegisterScreen: undefined;
  RolesScreen: undefined;
  ProfileUpdateScreen: {user: User};
  AdminTabsNavigator: undefined;
  ClientTabsNavigator: undefined;
 
};

const Stack = createNativeStackNavigator<StackParamList>();

// Estado del usuario
const UserState = ({ children }: any) => {
  return(
    <UserProvider>{children}</UserProvider>
  )
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
          name="ClientTabsNavigator"
          component={ClientTabsNavigator}
         
        />

        <Stack.Screen
          name="RegisterScreen"
          component={RegisterScreen}
          options={{ title: "" }}
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
          component={ProfileUpdateScreen}
          options={{ 
            headerShown: true,
            title: "Actualizar usuario" }}
        />

    
      </Stack.Navigator>
    </UserState>
  );
}
