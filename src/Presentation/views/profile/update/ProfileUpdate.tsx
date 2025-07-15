import {
  View,
  Image,
  Text,
  ToastAndroid,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  StatusBar,
} from "react-native";
import React, { useEffect, useState } from "react";
import useProfileUpdateViewModel from "./ViewModel";
import styles from "./Styles";
import CustomTextInput from "../../../components/CustomTextInput";
import RoundedButton from "../../../components/RoundedButton";
import { ModalPickImage } from "../../../components/ModalPickImage";
import { MyColors, MyStyles } from "../../../theme/AppTheme";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackParamList } from "../../../navigator/MainStackNavigator";
import { useFocusEffect } from "@react-navigation/native";

interface Props
  extends NativeStackScreenProps<StackParamList, "ProfileUpdateScreen"> {}

export default function ProfileUpdateScreen({ navigation, route }: Props) {
  const { user } = route.params;
  const {
    name,
    lastname,
    phone,
    image,
    loading,
    errorMessage,
    successMessage,
    setSuccessMessage,
    setErrorMessage,
    onChange,
    update,
    pickImage,
    takePhoto,
  } = useProfileUpdateViewModel(user);

  const [modalVisible, setmodalVisible] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBarStyle("dark-content");
      StatusBar.setBackgroundColor("transparent");
      StatusBar.setTranslucent(true);
    }, [])
  );

  useEffect(() => {
    if (errorMessage) {
      ToastAndroid.show(errorMessage, ToastAndroid.LONG);
      setErrorMessage("");
      return;
    }
    if (successMessage) {
      ToastAndroid.show(successMessage, ToastAndroid.LONG);
      setSuccessMessage("");
    }
  }, [errorMessage, successMessage]);

  return (
    <View style={styles.container}>
      <Image
        style={styles.imageBackground}
        source={require("../../../../../assets/city.jpg")}
      />

      <View style={styles.imageContainer}>
        <TouchableOpacity onPress={() => setmodalVisible(true)}>
          {image == "" ? (
            <Image style={styles.image} source={{ uri: user?.image }} />
          ) : (
            <Image style={styles.image} source={{ uri: image }} />
          )}
        </TouchableOpacity>

        <Text style={styles.textImage}>SELECT AN IMAGE</Text>
      </View>

      <View style={styles.form}>
        <ScrollView>
          <Text style={styles.formTitle}>ACTUALIZAR</Text>

          <CustomTextInput
            placeholder="Name"
            keyboardtype="default"
            image={require("../../../../../assets/user.png")}
            property="name"
            onChangeText={onChange}
            value={name}
          />

          <CustomTextInput
            placeholder="Last Name"
            keyboardtype="default"
            image={require("../../../../../assets/my_user.png")}
            property="lastname"
            onChangeText={onChange}
            value={lastname}
          />

          <CustomTextInput
            placeholder="Phone"
            keyboardtype="numeric"
            image={require("../../../../../assets/phone.png")}
            property="phone"
            onChangeText={onChange}
            value={phone}
          />

          <View style={styles.buttonContainer}>
            <RoundedButton text="CONFIRMAR" onPress={() => update()} />
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
