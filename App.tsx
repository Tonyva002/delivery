import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import MainStackNavigator from "./src/Presentation/navigator/main-navigator/MainStackNavigator";
import Toast from "react-native-toast-message";


export default function App() {
  return (
    <>
    <NavigationContainer>
      <MainStackNavigator />
    </NavigationContainer>

     <Toast />
     </>
  );
}
