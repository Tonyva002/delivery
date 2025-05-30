import React, { useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  ToastAndroid,
  Text,
  ScrollView,
} from "react-native";
import styles from "./Styles";
import CustomTextInput from "../../../../components/CustomTextInput";
import useViewModel from "./ViewModel";
import RoundedButton from "../../../../components/RoundedButton";
import { ModalPickImage } from "../../../../components/ModalPickImage";
import { MyColors, MyStyles } from "../../../../theme/AppTheme";
import { StackScreenProps } from "@react-navigation/stack";
import { ProductStackParamList } from "../../../../navigator/AdminProductNavigator";

interface Props
  extends StackScreenProps<ProductStackParamList, "AdminProductCreateScreen"> {}

export default function AdminProductCreateScreen({ navigation, route }: Props) {
  const { category } = route.params;
  const {
    name,
    description,
    image1,
    image2,
    image3,
    id_category,
    price,
    loading,
    responseMessage,
    setResponseMessage,
    pickImage,
    takePhoto,
    onChange,
  } = useViewModel();
  const [modalVisible, setmodalVisible] = useState(false);

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
        <TouchableOpacity onPress={() => setmodalVisible(true)}>
          {image1 == "" ? (
            <Image
              style={styles.image}
              source={require("../../../../../../assets/image_new.png")}
            />
          ) : (
            <Image style={styles.image} source={{ uri: image1 }} />
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setmodalVisible(true)}>
          {image2 == "" ? (
            <Image
              style={styles.image}
              source={require("../../../../../../assets/image_new.png")}
            />
          ) : (
            <Image style={styles.image} source={{ uri: image2 }} />
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setmodalVisible(true)}>
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
            keyboardtype="default"
            property="price"
            value={price}
            onChangeText={onChange}
          />

          <View style={styles.buttonContainer}>
            <RoundedButton text="CREAR PRODUCTO" onPress={() => {}} />
          </View>
        </ScrollView>
      </View>

      <ModalPickImage
        openGallery={pickImage}
        openCamara={takePhoto}
        modalUseState={modalVisible}
        setModalUseState={setmodalVisible}
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
