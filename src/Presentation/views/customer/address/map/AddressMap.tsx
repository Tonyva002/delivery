import React, { useEffect } from "react";
import { Image, Text, ToastAndroid, View } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import styles from "./Styles";
import stylesMap from "./StylesMap";
import useCustomerAddressMapViewModel from "./ViewModel";
import RoundedButton from "../../../../components/RoundedButton";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { CustomerAddressStackParamList } from "../../../../navigator/CustomerAddressStackNavigator";

interface Prpops
  extends NativeStackScreenProps<
    CustomerAddressStackParamList,
    "CustomerAddressMapScreen"
  > {}

export default function CustomerAddressMapScreen({
  navigation,
  route,
}: Prpops) {
  const {
    mapRef,
    messagePermission,
    name,
    latitude,
    longitude,
    setAddress,
    setMessagePermission,
    onRegionChangeComplete,
  } = useCustomerAddressMapViewModel();

  useEffect(() => {
    if (messagePermission != "") {
      ToastAndroid.show(messagePermission, ToastAndroid.LONG);
      setMessagePermission("");
    }
  }, [messagePermission]);

  return (
    <View style={styles.container}>
      {/*Mapa */}
      <MapView
        ref={mapRef}
        //customMapStyle={stylesMap}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        zoomControlEnabled={true}
        onRegionChangeComplete={(region) => {
          onRegionChangeComplete(region.latitude, region.longitude);
        }}
      />

      <Image
        style={styles.imageLocation}
        source={require("../../../../../../assets/location_map.png")}
      />

      <View style={styles.redPoint}>
        <Text style={styles.redPointText}>{name}</Text>
      </View>

      {/*Boton */}
      <View style={styles.buttonRefPoint}>
        <RoundedButton
          text="SELECCIONAR PUNTO"
          onPress={() => {
            setAddress(name, latitude, longitude); // guardas en contexto
            navigation.goBack(); // vuelves sin recreate
          }}
        />
      </View>
    </View>
  );
}
