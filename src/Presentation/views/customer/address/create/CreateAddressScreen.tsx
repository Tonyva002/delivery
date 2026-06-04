import React, { useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  ToastAndroid,
  StatusBar,
  ScrollView,
} from "react-native";
import styles from "./Styles";
import CustomTextInput from "../../../../components/CustomTextInput";
import useCustomerCreateAddressViewModel from "./CreateAddressViewModel";
import RoundedButton from "../../../../components/RoundedButton";
import { MyColors, MyStyles } from "../../../../theme/AppTheme";
import { useFocusEffect } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { CustomerAddressStackParamList } from "../../../../navigator/customer-navigator/CustomerAddressStackNavigator";

interface Props extends NativeStackScreenProps<
  CustomerAddressStackParamList,
  "CustomerAddressCreateScreen"
> {}

export default function CustomerCreateAddressScreen({
  navigation,
  route,
}: Props) {
  const {
    address,
    neighborhood,
    zipcode,
    city,
    country,
    loading,
    responseMessage,
    errorMessage,
    refPoint,
    latitude,
    longitude,
    resetAddress,
    setResponseMessage,
    setErrorMessage,
    submit,
    onChange,
    onChangeRefPoint,
  } = useCustomerCreateAddressViewModel();

  // Estado de la estatus bar
  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBarStyle("dark-content");
      StatusBar.setBackgroundColor("transparent");
      StatusBar.setTranslucent(true);
    }, []),
  );

  // Manejo de mensajes
  useEffect(() => {
    if (responseMessage !== "") {
      ToastAndroid.show(responseMessage, ToastAndroid.LONG);
      setResponseMessage("");
      resetAddress(); // limpiar el contexto después de guardar la información
    }

    if (errorMessage !== "") {
      ToastAndroid.show(errorMessage, ToastAndroid.LONG);
      setErrorMessage("");
    }
  }, [responseMessage, errorMessage]);

  // Carga los valores seleccionados en el mapa: refPoint, latitude y longitude
  useFocusEffect(
    React.useCallback(() => {
      if (refPoint && latitude && longitude) {
        onChangeRefPoint(refPoint, latitude, longitude);
      }
    }, [refPoint, latitude, longitude]),
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={require("../../../../../../assets/map.png")}
        />
      </TouchableOpacity>

      <View style={styles.form}>
        <ScrollView>
          <CustomTextInput
            placeholder="Calle"
            image={require("../../../../../../assets/map.png")}
            keyboardType="default"
            property="address"
            value={address}
            onChangeText={onChange}
          />

          <CustomTextInput
            placeholder="Barrio / Urbanización"
            image={require("../../../../../../assets/neighborhood.png")}
            keyboardType="default"
            property="neighborhood"
            value={neighborhood}
            onChangeText={onChange}
          />

          <CustomTextInput
            placeholder="Código Postal"
            image={require("../../../../../../assets/code.png")}
            keyboardType="default"
            property="zipcode"
            value={zipcode}
            onChangeText={onChange}
          />

          <CustomTextInput
            placeholder="Ciudad"
            image={require("../../../../../../assets/location_city.png")}
            keyboardType="default"
            property="city"
            value={city}
            onChangeText={onChange}
          />

          <CustomTextInput
            placeholder="País"
            image={require("../../../../../../assets/flag.png")}
            keyboardType="default"
            property="country"
            value={country}
            onChangeText={onChange}
          />

          <TouchableOpacity
            onPress={() => navigation.navigate("CustomerAddressMapScreen")}
          >
            <CustomTextInput
              placeholder="Punto de referencia"
              image={require("../../../../../../assets/location.png")}
              keyboardType="default"
              property="refPoint"
              value={refPoint}
              onChangeText={onChange}
              editable={false}
            />
          </TouchableOpacity>

          <View style={styles.buttonContainer}>
            <RoundedButton text="CREAR DIRECCION" onPress={() => submit()} />
          </View>
        </ScrollView>
      </View>

      {loading && (
        <ActivityIndicator
          style={MyStyles.loading}
          size="large"
          color={MyColors.primary}
        />
      )}
    </View>
  );
}
