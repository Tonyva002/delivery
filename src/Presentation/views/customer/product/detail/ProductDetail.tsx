import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import {
  Dimensions,
  Image,
  StatusBar,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import { ClientStackParamList } from "../../../../navigator/CustomerStackNavigator";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel";
import { useSharedValue } from "react-native-reanimated";
import useCustomerProductDetailViewModel from "./ViewModel";
import styles from "./Styles";
import RoundedButton from "../../../../components/RoundedButton";
import { useFocusEffect } from "@react-navigation/native";

interface Props
  extends NativeStackScreenProps<ClientStackParamList, "CustomerProductDetailScreen"> {}

export default function CustomerProductDetailScreen({
  navigation,
  route,
}: Props) {
  const { product } = route.params;
  const { productImages, quantity, total, shoppingBag, responseMessage, setResponseMessage, addToBag, addItem, subtractItem } =
    useCustomerProductDetailViewModel(product);

  const width = Dimensions.get("window").width;
  const heigth = Dimensions.get("window").height;
  const ref = React.useRef<ICarouselInstance>(null);
  const progress = useSharedValue<number>(0);

 //Estado de la status bar
  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBarStyle("light-content");
      StatusBar.setBackgroundColor("transparent");
      StatusBar.setTranslucent(true);
    }, [])
  );
  
  //Manejo de mensajes
  useEffect(()=> {
    if(responseMessage){
      ToastAndroid.show(responseMessage, ToastAndroid.LONG);
      setResponseMessage('');
    }
  }, [responseMessage]);

  return (
    <View style={styles.container}>
      <GestureHandlerRootView>
        <Carousel
          ref={ref}
          width={width}
          height={heigth}
          autoPlay={true}
          autoPlayInterval={10000}
          scrollAnimationDuration={800}
          data={productImages}
          onProgressChange={progress}
          renderItem={({ item }) => (
            <Image source={{ uri: item }} style={styles.productImage} />
          )}
        />
      </GestureHandlerRootView>

      <View style={styles.productDetail}>
        <View style={styles.productInfo}>
          {/* NAME*/}
          <Text style={styles.name}>{product.name}</Text>
          <View style={styles.divider}></View>

          {/* DESCRIPTION */}
          <Text style={styles.descriptionTitle}>Descripcion</Text>
          <Text style={styles.descriptionValue}>{product.description}</Text>
          <View style={styles.divider}></View>

          {/* PRECIO */}
          <Text style={styles.descriptionTitle}>Precio</Text>
          <Text style={styles.descriptionValue}>$ {product.price}</Text>
          <View style={styles.divider}></View>

          {/* ORDEN */}
          <Text style={styles.descriptionTitle}>Tu orden</Text>
          <Text style={styles.descriptionValue}>Cantidad: {quantity}</Text>
          <Text style={styles.descriptionValue}>Precio total: {total} </Text>
          <View style={styles.divider}></View>
        </View>
        <View style={styles.actionsContainer}>
          {/* Disminuir cantidad */}
          <TouchableOpacity
            onPress={() => subtractItem()}
            style={styles.actionLess}
            >
            <Text style={styles.actionText}>-</Text>
          </TouchableOpacity>
          
          {/* Mostrar cantidad */}
          <View style={styles.quantity}>
            <Text style={styles.actionText}>{quantity}</Text>
          </View>
          
          {/* Aumentar cantidad */}
          <TouchableOpacity onPress={() => addItem()} style={styles.actionAdd}>
            <Text style={styles.actionText}>+</Text>
          </TouchableOpacity>

          <View style={styles.buttonAdd}>
            <RoundedButton text="AGREGAR AL CARRITO" onPress={() => addToBag()} />
          </View>
        </View>
      </View>

      <TouchableOpacity 
      onPress={() => navigation.pop()}
      style={styles.back}>
        <Image
          style={styles.backImage}
          source={require("../../../../../../assets/arrow_back.png")}
        />
      </TouchableOpacity>
    </View>
  );
}
