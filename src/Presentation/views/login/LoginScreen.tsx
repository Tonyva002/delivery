import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ToastAndroid,
  StatusBar,
  ScrollView,
  Alert
} from "react-native";
import React, { useEffect } from "react";
import LoginStyles from "./Styles";
import useLoginViewModel from "./LoginViewModel";
import CustomTextInput from "../../components/CustomTextInput";
import RoundedButton from "../../components/RoundedButton";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "../../navigator/main-navigator/MainStackNavigator";
import { useFocusEffect } from "@react-navigation/native";
import Toast from "react-native-toast-message";

type LoginScreenProps = {
  navigation: NativeStackNavigationProp<StackParamList, "LoginScreen">;
};

export default function LoginScreen({ navigation }: LoginScreenProps) {
  const {
    email,
    password,
    errorMessage,
    setErrorMessage,
    login,
    onChange,
    user,
  } = useLoginViewModel();


  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBarStyle("light-content");
      StatusBar.setBackgroundColor("transparent");
      StatusBar.setTranslucent(true);
    }, []),
  );

  useEffect(() => {
  if (!user?.id) return;

  if ((user.roles?.length ?? 0) > 1) {
    navigation.replace("RolesScreen");
  } else {
    navigation.replace("CustomerTabsNavigator");
  }
}, [user?.id, user?.roles]);

 // Mensaje de error
  useEffect(() => {
    if (errorMessage !== "") {
      Toast.show({
        type: "error",
        text1: "Error al loguearse",
        text2: errorMessage,
        position: "bottom"
      })
      setErrorMessage("");
    }
  }, [errorMessage]);

  return (
    <View style={LoginStyles.container}>
      {/*Imagen de fondo */}
      <Image
        style={LoginStyles.imageBackground}
        source={require("../../../../assets/chef.jpg")}
      />
      {/*Imagen de logo */}
      <View style={LoginStyles.logoContainer}>
        <Image
          style={LoginStyles.logoImage}
          source={require("../../../../assets/logo.png")}
        />
        <Text style={LoginStyles.logoText}>FOOD</Text>
      </View>

      {/*Formulario*/}
      <View style={LoginStyles.formContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={LoginStyles.formTitle}>INGRESAR</Text>

        <CustomTextInput
          image={require("../../../../assets/email.png")}
          placeholder="Email"
          value={email}
          keyboardType="email-address"
          property="email"
          onChangeText={onChange}
        />

        <CustomTextInput
          image={require("../../../../assets/password.png")}
          placeholder="Password"
          value={password}
          keyboardType="default"
          property="password"
          secureTextEntry={true}
          onChangeText={onChange}
        />
        {/*Boton para loguearse */}
        <View style={{ marginTop: 40 }}>
          <RoundedButton text="LOGIN" onPress={() => login()} />
        </View>

        {/*Navegar a registro */}
        <View style={LoginStyles.formRegister}>
          <Text>Don't have an account?</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("RegisterScreen")}
          >
            <Text style={LoginStyles.formTextRegister}>Register</Text>
          </TouchableOpacity>
        </View>
        </ScrollView>
      </View>
    </View>
  );
}
