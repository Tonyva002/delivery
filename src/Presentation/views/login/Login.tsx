import { View, Image, Text, TouchableOpacity, ToastAndroid } from "react-native";
import React, { useEffect } from "react";
import styles from "./Styles";
import useViewModel from "./ViewModel";
import CustomTextInput from "../../components/CustomTextInput";
import RoundedButton from "../../components/RoundedButton";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "../../navigator/MainStackNavigator";


type LoginScreenProps = {
  navigation: NativeStackNavigationProp<StackParamList, 'LoginScreen'>;
};

export default function LoginScreen({ navigation }: LoginScreenProps) {

  const { email, password, errorMessage, setErrorMessage, login, onChange, user } = useViewModel();

  useEffect(() => {

    if(user?.id !== null && user?.id != undefined && user?.id !== ''){
      if(user.roles?.length! > 1) {
        navigation.replace('RolesScreen');
      }else {
        navigation.replace('ClientTabsNavigator');

      } 

    }

  },[user])

  useEffect(() => {
    if(errorMessage !== '') {
      ToastAndroid.show(errorMessage, ToastAndroid.LONG);
      setErrorMessage('')
    }
  }, [errorMessage])

  return (
    <View style={styles.container}>
      <Image
        style={styles.imageBackground}
        source={require("../../../../assets/chef.jpg")}
      />

      <View style={styles.logoContainer}>
        <Image
          style={styles.logoImage}
          source={require("../../../../assets/logo.png")}
        />
        <Text style={styles.logoText}>FOOD</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.formTitle}>LOGIN</Text>

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
          <RoundedButton
            text="LOGIN"
            onPress={() => login()}
          />
        </View>

        <View style={styles.formRegister}>
          <Text>Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("RegisterScreen")}>
            <Text style={styles.formTextRegister}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
