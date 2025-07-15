import React from "react";
import { createNativeStackNavigator} from "@react-navigation/native-stack";
import { Image, TouchableOpacity } from "react-native";
import { AddressProvider } from "../context/AddressContext";
import CustomerAddressListScreen from "../views/customer/address/list/AddressList";
import CustomerAddressCreateScreen from "../views/customer/address/create/AddressCreate";
import CustomerAddressMapScreen from "../views/customer/address/map/AddressMap";



export type CustomerAddressStackParamList = {
   CustomerAddressListScreen: undefined;
   CustomerAddressCreateScreen: undefined;
   CustomerAddressMapScreen: undefined;
};

const Stack = createNativeStackNavigator<CustomerAddressStackParamList>();

// Estado de las direcciones
const AddressState = ({ children }: any) => {
  return <AddressProvider>{children}</AddressProvider>;
};

export default function CustomerAddressStackNavigator() {
  return (
    <AddressState>
      <Stack.Navigator>
       <Stack.Screen
          name="CustomerAddressListScreen"
          component={CustomerAddressListScreen}
          options={({ navigation }) => ({
            headerShown: true,
            title: "Mis direcciones",
            headerRight: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate("CustomerAddressCreateScreen")}
              >
                <Image
                  source={require("../../../assets/add.png")}
                  style={{ width: 30, height: 30 }}
                />
              </TouchableOpacity>
            ),
          })}
        />

        <Stack.Screen
          name="CustomerAddressCreateScreen"
          component={CustomerAddressCreateScreen}
          options={{
            headerShown: true,
            title: "Nueva direccion",
          }}
        />

        <Stack.Screen
          name="CustomerAddressMapScreen"
          component={CustomerAddressMapScreen}
          options={{
            headerShown: true,
            title: "Ubica tu direccion en el Mapa",
          }}
        />
      </Stack.Navigator>
    </AddressState>
  );
}
