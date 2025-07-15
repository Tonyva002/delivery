import React, { useEffect } from "react";
import { FlatList, Image, Text, ToastAndroid, View } from "react-native";
import styles from "./Styles";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AdminOrderStackParamList } from "../../../../navigator/AdminOrderStackNavigator";
import OrderDetailItem from "./Item";
import dateFormatter from "../../../../../utils/dateFormatter";
import useDeliveryOrderDetailViewModel from "./ViewModel";
import RoundedButton from "../../../../components/RoundedButton";
import { DeliveryOrderStackParamList } from "../../../../navigator/DeliveryOrderStackNavigator";

interface Props
  extends NativeStackScreenProps<
    DeliveryOrderStackParamList,
    "DeliveryOrderDetailScreen"
  > {}

export default function DeliveryOrderDetailScreen({
  navigation,
  route,
}: Props) {
  const { order } = route.params;
  const {
    total,
    responseMessage,
    setResponseMessage,
    getTotal,
    updateToOnTheWayOrder,
  } = useDeliveryOrderDetailViewModel(order);

  // Llamada al metodo que calcula el total a pagar
  useEffect(() => {
    if (total === 0.0) {
      getTotal();
    }
  }, [order]);

  //Manejo de mensajes
  useEffect(() => {
    if (responseMessage !== "") {
      ToastAndroid.show(responseMessage, ToastAndroid.LONG);
      setResponseMessage("");
    }
  }, [responseMessage]);

  return (
    <View style={styles.container}>
      <View style={styles.productsContainer}>
        <FlatList
          data={order.products}
          keyExtractor={(item) => item.id!}
          renderItem={({ item }) => <OrderDetailItem product={item} />}
        />
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <View style={styles.infoText}>
            <Text style={styles.infoTitle}>Fecha del pedido</Text>
            <Text style={styles.infoDescription}>
              {dateFormatter(order.timestamp!)}
            </Text>
          </View>
          <Image
            style={styles.infoImage}
            source={require("../../../../../../assets/reloj.png")}
          />
        </View>

        <View style={styles.infoRow}>
          <View style={styles.infoText}>
            <Text style={styles.infoTitle}>Cliente y Telefono</Text>
            <Text style={styles.infoDescription}>
              {order.customer?.name} {order.customer?.lastname} -{" "}
              {order.customer?.phone}
            </Text>
          </View>
          <Image
            style={styles.infoImage}
            source={require("../../../../../../assets/user.png")}
          />
        </View>

        <View style={styles.infoRow}>
          <View style={styles.infoText}>
            <Text style={styles.infoTitle}>Direccion de entrega</Text>
            <Text style={styles.infoDescription}>
              {order.address?.address} - {order.address?.neighborhood}{" "}
            </Text>
          </View>
          <Image
            style={styles.infoImage}
            source={require("../../../../../../assets/location.png")}
          />
        </View>

        <View style={styles.infoRow}>
          <View style={styles.infoText}>
            <Text style={styles.infoTitle}>Repartidor asignado</Text>
            <Text style={styles.infoDescription}>
              {order.delivery?.name} {order.delivery?.lastname}{" "}
            </Text>
          </View>
          <Image
            style={styles.infoImage}
            source={require("../../../../../../assets/my_user.png")}
          />
        </View>

        <View style={styles.totalInfo}>
          <Text style={styles.total}>Total: ${total} </Text>
          <View style={styles.button}>
            {order.status === "DESPACHADO" && (
              <RoundedButton
                text="INICIAR ENTREGA"
                onPress={() => updateToOnTheWayOrder()}
              />
            )}

            {order.status === "EN CAMINO" && (
              <RoundedButton
                text="IR A LA RUTA"
                onPress={() => navigation.navigate('DeliveryOrderMapScreen', {order})}
              />
            )}
          </View>
        </View>
      </View>
    </View>
  );
}
