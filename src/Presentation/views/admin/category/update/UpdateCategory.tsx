import React, { useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  ToastAndroid,
  ScrollView,
} from "react-native";
import styles from "./Styles";
import CustomTextInput from "../../../../components/CustomTextInput";
import useViewModel from "./ViewModel";
import RoundedButton from "../../../../components/RoundedButton";
import { ModalPickImage } from "../../../../components/ModalPickImage";
import { MyColors, MyStyles } from "../../../../theme/AppTheme";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { CategoryStackParamList } from "../../../../navigator/AdminCategoryNavigator";

interface Props
  extends NativeStackScreenProps<CategoryStackParamList, "AdminUpdateCategoryScreen"> {}

export default function AdminUpdateCategoryScreen({
  navigation,
  route,
}: Props) {
  const { category } = route.params;
  const {
    name,
    description,
    image,
    loading,
    responseMessage,
    setResponseMessage,
    pickImage,
    takePhoto,
    updateCategory,
    onChange,
  } = useViewModel(category);

  const [modalVisible, setmodalVisible] = useState(false);

  useEffect(() => {
    if (responseMessage != "") {
      ToastAndroid.show(responseMessage, ToastAndroid.LONG);
      setResponseMessage("");
    }
  }, [responseMessage]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => setmodalVisible(true)}
        style={styles.imageContainer}
      >
        {image == "" ? (
          <Image
            style={styles.image}
            source={require("../../../../../../assets/image_new.png")}
          />
        ) : (
          <Image style={styles.image} source={{ uri: image }} />
        )}
      </TouchableOpacity>

      <View style={styles.form}>
        <CustomTextInput
          placeholder="Nombre de la categaria"
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
      </View>

      <View style={styles.buttonContainer}>
        <RoundedButton
          text="ACTUALIZAR CATEGORIA"
          onPress={() => updateCategory()}
        />
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
