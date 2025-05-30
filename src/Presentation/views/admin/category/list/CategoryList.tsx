import React, { useEffect } from "react";
import { FlatList, StatusBar, Text, ToastAndroid, View } from "react-native";
import useViewModel from "./ViewModel";
import AdminCategoryListItem from "./item";


export default function AdminCategoryListScreen() {

  const { categories, responseMessage, setResponseMessage, deleteCategory, getCategories } = useViewModel();

 

  useEffect(() => {
    if(responseMessage != ''){
      ToastAndroid.show(responseMessage, ToastAndroid.LONG);
      setResponseMessage("");
    }
  }, [responseMessage]);



  return (
    <View style={{backgroundColor: 'white'}}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id!}
        renderItem={({ item }) => <AdminCategoryListItem category={item} remove={deleteCategory}  />}
      />
    </View>
  );
}
