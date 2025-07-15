import React, { useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  ToastAndroid,
  Text,
  ScrollView,
  StatusBar,
} from "react-native";
import styles from "./Styles";
import CustomTextInput from "../../../../components/CustomTextInput";
import useAdminProductUpdateViewModel from "./ViewModel";
import RoundedButton from "../../../../components/RoundedButton";
import { MyColors, MyStyles } from "../../../../theme/AppTheme";
import { ProductStackParamList } from "../../../../navigator/AdminProductStackNavigator";
import { ModalPickMultiImage } from "../../../../components/ModalPickMultiImage";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useFocusEffect } from "@react-navigation/native";

interface Props
  extends NativeStackScreenProps<
    ProductStackParamList,
    "AdminProductUpdateScreen"
  > {}

export default function AdminProductUpdateScreen({ navigation, route }: Props) {
  const { category, product } = route.params;
  const {
    name,
    description,
    image1,
    image2,
    image3,
    price,
    loading,
    responseMessage,
    setResponseMessage,
    pickImage,
    takePhoto,
    updateProduct,
    onChange,
  } = useAdminProductUpdateViewModel(product, category);
  const [modalVisible, setmodalVisible] = useState(false);
  const [numberImage, setNumberImage] = useState(1);

  //Estado de la status bar
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
    <View style={styles.container}>
      <View style={styles.imageBackground}></View>
      <View style={styles.imageContainer}>
        <TouchableOpacity
          onPress={() => {
            setNumberImage(1);
            setmodalVisible(true);
          }}
        >
          {image1 == "" ? (
            <Image
              style={styles.image}
              source={require("../../../../../../assets/image_new.png")}
            />
          ) : (
            <Image style={styles.image} source={{ uri: image1 }} />
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            setNumberImage(2);
            setmodalVisible(true);
          }}
        >
          {image2 == "" ? (
            <Image
              style={styles.image}
              source={require("../../../../../../assets/image_new.png")}
            />
          ) : (
            <Image style={styles.image} source={{ uri: image2 }} />
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            setNumberImage(3);
            setmodalVisible(true);
          }}
        >
          {image3 == "" ? (
            <Image
              style={styles.image}
              source={require("../../../../../../assets/image_new.png")}
            />
          ) : (
            <Image style={styles.image} source={{ uri: image3 }} />
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.form}>
        <ScrollView>
          <View style={styles.categoryInfo}>
            <Image
              style={styles.imageCategory}
              source={require("../../../../../../assets/menu.png")}
            />
            <Text style={styles.textCategoryTilte}>Categoria Seleccionada</Text>
            <Text style={styles.textCategoryValue}>{category.name}</Text>
          </View>

          <CustomTextInput
            placeholder="Nombre del producto"
            image={require("../../../../../../assets/categories.png")}
            keyboardtype="default"
            property="name"
            value={name}
            onChangeText={onChange}
          />

          <CustomTextInput
            placeholder="Descripcion"
            image={require("../../../../../../assets/description.png")}
            keyboardtype="default"
            property="description"
            value={description}
            onChangeText={onChange}
          />

          <CustomTextInput
            placeholder="Precio"
            image={require("../../../../../../assets/price.png")}
            keyboardtype="numeric"
            property="price"
            value={price.toString()}
            onChangeText={onChange}
          />

          <View style={styles.buttonContainer}>
            <RoundedButton
              text="ACTUALIZAR PRODUCTO"
              onPress={() => updateProduct()}
            />
          </View>
        </ScrollView>
      </View>

      <ModalPickMultiImage
        openGallery={pickImage}
        openCamara={takePhoto}
        modalUseState={modalVisible}
        setModalUseState={setmodalVisible}
        numberImage={numberImage}
      />

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
