import React, { useEffect } from "react";
import {
  Image,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import styles from "./Styles";
import useDeliveryOrderMapViewModel from "./ViewModel";
import RoundedButton from "../../../../components/RoundedButton";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { DeliveryOrderStackParamList } from "../../../../navigator/DeliveryOrderStackNavigator";
import MapViewDirections from "react-native-maps-directions";
import { GOOGLE_MAPS_APIKEY } from "../../../../contants/GoogleMapApiKey";

interface Prpops
  extends NativeStackScreenProps<
    DeliveryOrderStackParamList,
    "DeliveryOrderMapScreen"
  > {}

export default function DeliveryOrderMapScreen({ navigation, route }: Prpops) {
  const { order } = route.params;
  const {
    mapRef,
    messagePermission,
    responseMessage,
    setResponseMessage,
    position,
    setMessagePermission,
    stopForegroundUpdate,
    origin,
    destination,
    updateToDeliveredOrder
  } = useDeliveryOrderMapViewModel(order);

 // Manejo de mensajes 
 useEffect(() => {
  if (messagePermission !== "") {
    ToastAndroid.show(messagePermission, ToastAndroid.LONG);
    setMessagePermission("");
  }

  if (responseMessage !== "") {
    ToastAndroid.show(responseMessage, ToastAndroid.LONG);
    setResponseMessage("");
  }
}, [messagePermission, responseMessage]);


  useEffect(() => {
    const unsubscribe = navigation.addListener("beforeRemove", () => {
      stopForegroundUpdate();
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      {/*Mapa*/}
      <MapView
        ref={mapRef}
        style={styles.map}
        zoomControlEnabled={true}
        provider={PROVIDER_GOOGLE}
      >
        {position !== undefined && (
          <Marker coordinate={position}>
            <Image
              source={require("../../../../../../assets/user.png")}
              style={styles.markerImage}
            />
          </Marker>
        )}

         {order.address !== undefined && (
          <Marker coordinate={{latitude: order.address.lat, longitude: order.address.lng}}>
            <Image
              source={require("../../../../../../assets/home.png")}
              style={styles.markerImage}
            />
          </Marker>
        )}

        {
          origin.latitude !== 0.0 &&
          <MapViewDirections
            origin={origin}
            destination={destination}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={3}
            strokeColor="orange"
          />
        }
      </MapView>

      <View style={styles.info}>
        {/*Informacion de la localidad */}
        <View style={styles.infoRow}>
          <View style={styles.infoText}>
            <Text style={styles.infoTitle}>Localidad</Text>
            <Text style={styles.infoDescription}>
              {order.address?.neighborhood}
            </Text>
          </View>
          <Image
            style={styles.infoImage}
            source={require("../../../../../../assets/location.png")}
          />
        </View>

        {/* Informacion de la direccion */}
        <View style={styles.infoRow}>
          <View style={styles.infoText}>
            <Text style={styles.infoTitle}>Direccion</Text>
            <Text style={styles.infoDescription}>{order.address?.address}</Text>
          </View>
          <Image
            style={styles.infoImage}
            source={require("../../../../../../assets/location_home.png")}
          />
        </View>

        <View style={styles.divider}></View>

        {/*Informacion del cliente */}
        <View style={styles.infoCustomer}>
          <Image
            style={styles.imageCustomer}
            source={{ uri: order.customer?.image }}
          />
          <Text style={styles.nameCustomer}>
            {order.customer?.name} {order.customer?.lastname}
          </Text>
          <Image
            style={styles.imagePhone}
            source={require("../../../../../../assets/phone.png")}
          />
        </View>

        {/*Boton */}
        <View style={styles.buttonRefPoint}>
          <RoundedButton
            text="ENTREGAR PEDIDO"
            onPress={() => updateToDeliveredOrder()}
          />
        </View>
      </View>

      <TouchableOpacity
        style={styles.backContainer}
        onPress={() => navigation.goBack()}
      >
        <Image
          style={styles.back}
          source={require("../../../../../../assets/back.png")}
        />
      </TouchableOpacity>
    </View>
  );
}
