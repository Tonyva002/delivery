import {
  View,
  Image,
  Text,
  ToastAndroid,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import useViewModel from "./ViewModel";
import styles from "./Styles";
import CustomTextInput from "../../components/CustomTextInput";
import RoundedButton from "../../components/RoundedButton";
import { ModalPickImage } from "../../components/ModalPickImage";
import { MyColors } from "../../theme/AppTheme";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "../../../../App";

type RegisterScreenProps = {
  navigation: NativeStackNavigationProp<StackParamList, 'Register'>;
};

export default function RegisterScreen({navigation}: RegisterScreenProps ) {
  const {
    name,
    lastname,
    email,
    phone,
    image,
    password,
    confirmPassword,
    errorMessage,
    loading,
    user,
    setErrorMessage,
    onChange,
    register,
    pickImage,
    takePhoto,
  } = useViewModel();

  const [modalVisible, setmodalVisible] = useState(false);

    useEffect(() => {
  
      if(user?.id !== null && user?.id != undefined){
  
        navigation.replace('Profile');
  
      }
  
    },[user])

  useEffect(() => {
    if (errorMessage != "") {
      ToastAndroid.show(errorMessage, ToastAndroid.LONG);
      setErrorMessage("");
    }
  }, [errorMessage]);

  

  return (
    <View style={styles.container}>
      <Image
        style={styles.imageBackground}
        source={require("../../../../assets/chef.jpg")}
      />

      <View style={styles.logoContainer}>
        <TouchableOpacity onPress={() => setmodalVisible(true)}>
          {image == "" ? (
            <Image
              style={styles.logoImage}
              source={require("../../../../assets/user_image.png")}
            />
          ) : (
            <Image style={styles.logoImage} source={{ uri: image }} />
          )}
        </TouchableOpacity>

        <Text style={styles.logoText}>SELECT AN IMAGE</Text>
      </View>

      <View style={styles.form}>
        <ScrollView>
          <Text style={styles.formTitle}>Register</Text>

          <CustomTextInput
            placeholder="Name"
            keyboardtype="default"
            image={require("../../../../assets/user.png")}
            property="name"
            onChangeText={onChange}
            value={name}
          />

          <CustomTextInput
            placeholder="Last Name"
            keyboardtype="default"
            image={require("../../../../assets/my_user.png")}
            property="lastname"
            onChangeText={onChange}
            value={lastname}
          />

          <CustomTextInput
            placeholder="Email"
            keyboardtype="email-address"
            image={require("../../../../assets/email.png")}
            property="email"
            onChangeText={onChange}
            value={email}
          />

          <CustomTextInput
            placeholder="Phone"
            keyboardtype="numeric"
            image={require("../../../../assets/phone.png")}
            property="phone"
            onChangeText={onChange}
            value={phone}
          />

          <CustomTextInput
            placeholder="Password"
            keyboardtype="default"
            image={require("../../../../assets/password.png")}
            property="password"
            onChangeText={onChange}
            value={password}
            secureTextEntry={true}
          />

          <CustomTextInput
            placeholder="Confirm Password"
            keyboardtype="default"
            image={require("../../../../assets/confirm_password.png")}
            property="confirmPassword"
            onChangeText={onChange}
            value={confirmPassword}
            secureTextEntry={true}
          />

          <View style={{ marginTop: 30 }}>
            <RoundedButton text="SAVE" onPress={() => register()} />
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
          style={styles.loading}
          size="large"
          color={MyColors.primary}
        />
      )}
    </View>
  );
}
