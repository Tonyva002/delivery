import React, { useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  ToastAndroid,
  StatusBar,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import styles from "./Styles";
import CustomTextInput from "../../../../components/CustomTextInput";
import useAdminCategoryCreateViewModel from "./ViewModel";
import RoundedButton from "../../../../components/RoundedButton";
import { ModalPickImage } from "../../../../components/ModalPickImage";
import { MyColors, MyStyles } from "../../../../theme/AppTheme";
import { useFocusEffect } from "@react-navigation/native";

export default function AdminCategoryCreateScreen() {
  const {
    name,
    description,
    image,
    loading,
    responseMessage,
    setResponseMessage,
    pickImage,
    takePhoto,
    createCategory,
    onChange,
  } = useAdminCategoryCreateViewModel();

  const [modalVisible, setmodalVisible] = useState(false);
 
  // Estado de la status bar
  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBarStyle("dark-content");
      StatusBar.setBackgroundColor("transparent");
      StatusBar.setTranslucent(true);
    }, [])
  );
  
  //Manejo de mensajes
  useEffect(() => {
    if (responseMessage !== "") {
      ToastAndroid.show(responseMessage, ToastAndroid.LONG);
      setResponseMessage("");
    }
  }, [responseMessage]);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={{ paddingBottom: 120 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <TouchableOpacity
            onPress={() => setmodalVisible(true)}
            style={styles.imageContainer}
          >
            {image === "" ? (
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
              placeholder="Nombre de la categoría"
              image={require("../../../../../../assets/categories.png")}
              keyboardtype="default"
              property="name"
              value={name}
              onChangeText={onChange}
            />

            <CustomTextInput
              placeholder="Descripción"
              image={require("../../../../../../assets/description.png")}
              keyboardtype="default"
              property="description"
              value={description}
              onChangeText={onChange}
            />
          </View>
        </ScrollView>

        {/* Botón fijo al fondo */}
        <View style={styles.buttonContainer}>
          <RoundedButton
            text="CREAR CATEGORIA"
            onPress={createCategory}
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
    </KeyboardAvoidingView>
  );
}

