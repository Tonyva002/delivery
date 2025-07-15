import React, { useEffect } from "react";
import { FlatList, Image, Text, ToastAndroid, View } from "react-native";
import styles from "./Styles";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AdminOrderStackParamList } from "../../../../navigator/AdminOrderStackNavigator";
import OrderDetailItem from "./Item";
import dateFormatter from "../../../../../utils/dateFormatter";
import useAdminOrderDetailViewModel from "./ViewModel";
import RoundedButton from "../../../../components/RoundedButton";
import DropDownPicker from "react-native-dropdown-picker";

interface Props
  extends NativeStackScreenProps<
    AdminOrderStackParamList,
    "AdminOrderDetailScreen"
  > {}

export default function AdminOrderDetailScreen({ navigation, route }: Props) {
  const { order } = route.params;
  const {
    total,
    delivery,
    open,
    value,
    items,
    responseMessage,
    setResponseMessage,
    setOpen,
    setValue,
    setItems,
    getDelivery,
    getTotal,
    updateDispatchOrder
  } = useAdminOrderDetailViewModel(order);
 

  // Llamada al metodo que calcula el total a pagar
  useEffect(() => {
    if (total === 0.0) {
      getTotal();
    }
    getDelivery();
  }, [order]);

  //Manejo de mensajes
  useEffect(() => {
    if(responseMessage !== ''){
      ToastAndroid.show(responseMessage, ToastAndroid.LONG);
      setResponseMessage("");
    }
  }, [responseMessage])

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

        {
          order.status === 'PAGADO'
          ? <View>
            <Text style={styles.delivery}>ASIGNAR REPARTIDOR</Text>
             <View style={styles.dropDownContainer}>
          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            theme="LIGHT"
            multiple={true}
            mode="BADGE"
            badgeDotColors={[
              "#e76f51",
              "#00b4d8",
              "#e9c46a",
              "#e76f51",
              "#8ac926",
              "#00b4d8",
              "#e9c46a",
            ]}
          />
        </View>
          </View>
          : <Text style={styles.delivery}>REPARTIDOR ASIGNADO: {order.delivery?.name} {order.delivery?.lastname}</Text>
        }

        <View style={styles.totalInfo}>
          <Text style={styles.total}>Total: ${total} </Text>
          <View style={styles.button}>
            {
              order.status === 'PAGADO' && 
              <RoundedButton text="DESPACHAR ORDEN" onPress={() => updateDispatchOrder()} />
            }
          </View>
        </View>
      </View>
    </View>
  );
}
