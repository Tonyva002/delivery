import React, { useEffect } from "react";
import { FlatList, StatusBar, Text, ToastAndroid, View } from "react-native";
import useAdminCategoryListViewModel from "./ViewModel";
import AdminCategoryListItem from "./Item";
import { useFocusEffect } from "@react-navigation/native";

export default function AdminCategoryListScreen() {
  const {
    categories,
    responseMessage,
    setResponseMessage,
    deleteCategory,
    getCategories,
  } = useAdminCategoryListViewModel();

  // Estado de la status bar
  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBarStyle("dark-content");
      StatusBar.setBackgroundColor("transparent");
      StatusBar.setTranslucent(true);
    }, [])
  );
  
  //Manejo de mensajes
  useEffect(() => {
    if (responseMessage != "") {
      ToastAndroid.show(responseMessage, ToastAndroid.LONG);
      setResponseMessage("");
    }
  }, [responseMessage]);

  return (
    <View style={{ backgroundColor: "white" }}>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id!}
        renderItem={({ item }) => (
          <AdminCategoryListItem category={item} remove={deleteCategory} />
        )}
      />
    </View>
  );
}
