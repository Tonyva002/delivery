import { useFocusEffect } from "@react-navigation/native";
import React from "react";
import { View, Text, StatusBar } from "react-native";

export default function CustomerOrderListScreen() {
  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBarStyle("dark-content");
      StatusBar.setBackgroundColor("transparent");
      StatusBar.setTranslucent(true);
    }, [])
  );
  return (
    <View>
      <Text>CustomerOrderListScreen</Text>
    </View>
  );
}
