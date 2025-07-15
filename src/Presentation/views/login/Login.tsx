import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ToastAndroid,
  StatusBar,
} from "react-native";
import React, { useEffect } from "react";
import LoginStyles from "./Styles";
import useLoginViewModel from "./ViewModel";
import CustomTextInput from "../../components/CustomTextInput";
import RoundedButton from "../../components/RoundedButton";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "../../navigator/MainStackNavigator";
import { useFocusEffect } from "@react-navigation/native";

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
    }, [])
  );

  useEffect(() => {
    if (!user?.id) return;
    if (user.roles?.length! > 1) {
      navigation.replace("RolesScreen");
    } else {
      navigation.replace("CustomerTabsNavigator");
    }
  }, [user]);

  useEffect(() => {
    if (errorMessage !== "") {
      ToastAndroid.show(errorMessage, ToastAndroid.LONG);
      setErrorMessage("");
    }
  }, [errorMessage]);

  return (
    <View style={LoginStyles.container}>
      <Image
        style={LoginStyles.imageBackground}
        source={require("../../../../assets/chef.jpg")}
      />

      <View style={LoginStyles.logoContainer}>
        <Image
          style={LoginStyles.logoImage}
          source={require("../../../../assets/logo.png")}
        />
        <Text style={LoginStyles.logoText}>FOOD</Text>
      </View>

      <View style={LoginStyles.form}>
        <Text style={LoginStyles.formTitle}>LOGIN</Text>

        <CustomTextInput
          image={require("../../../../assets/email.png")}
          placeholder="Email"
          value={email}
          keyboardtype="email-address"
          property="email"
          onChangeText={onChange}
        />

        <CustomTextInput
          image={require("../../../../assets/password.png")}
          placeholder="Password"
          value={password}
          keyboardtype="default"
          property="password"
          onChangeText={onChange}
        />

        <View style={{ marginTop: 40 }}>
          <RoundedButton text="LOGIN" onPress={() => login()} />
        </View>

        <View style={LoginStyles.formRegister}>
          <Text>Don't have an account?</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("RegisterScreen")}
          >
            <Text style={LoginStyles.formTextRegister}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
