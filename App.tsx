import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "./src/Presentation/views/login/Login";
import RegisterScreen from "./src/Presentation/views/register/Register";
import { ProfileInfoScreen } from "./src/Presentation/views/profile/info/ProfileInfo";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export type StackParamList = {
  Login: undefined;
  Register: undefined;
  Profile: undefined;
};

const Stack = createNativeStackNavigator<StackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: "" }} />

        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ title: "" }}
        />

        <Stack.Screen name="Profile" component={ProfileInfoScreen} options={{ title: "" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
